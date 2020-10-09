package nl.luukdekinderen.rankingthemormels.resources;

import nl.luukdekinderen.rankingthemormels.models.GameRoom;
import nl.luukdekinderen.rankingthemormels.models.Player;
import nl.luukdekinderen.rankingthemormels.models.Question;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.stereotype.Controller;

import java.util.ArrayList;
import java.util.List;


@Controller
public class RoomController {

    private static final Logger logger = LoggerFactory.getLogger(WebSocketEventListener.class);

    @Autowired
    private SimpMessagingTemplate messagingTemplate;


    private List<GameRoom> rooms;

    @Autowired
    public void RoomController() {
        rooms = new ArrayList<GameRoom>();
    }

    @SubscribeMapping("/game/rooms")
    public List<GameRoom> listOfRooms() {
        return rooms;
    }

/*    @SubscribeMapping("/room/{roomId}/players")
    public List<Player> listOfPlayers(@DestinationVariable String roomId) {
        logger.info("test");
        return GetRoom(roomId).getPlayers();
    }*/

    @MessageMapping("/room/{roomId}/players")
    public void listOfPlayers(@DestinationVariable String roomId){
        logger.info("tst");
        messagingTemplate.convertAndSend("/room/" + roomId, GetRoom(roomId).getPlayers());
    }


    @MessageMapping("/game/rooms")
    public void addRooms(@Payload GameRoom gameRoom, SimpMessageHeaderAccessor headerAccessor) {

        String playerId = gameRoom.getPlayers().get(0).getId();
        String roomId = gameRoom.getRoomid();

        headerAccessor.getSessionAttributes().put("player_id", playerId);

        boolean flag = false;
        for (GameRoom room : rooms) {
            if (room.getRoomid().equals((roomId))) {
                flag = true;
                break;
            }
        }

        if (!flag) {
            rooms.add(gameRoom);
            logger.info("New room: " + roomId);
            messagingTemplate.convertAndSend("/room/" + roomId + "/" + playerId, "ok");
            messagingTemplate.convertAndSend("/room/" + roomId , gameRoom.getPlayers());
        } else {
            logger.info("Room already exists");
            messagingTemplate.convertAndSend("/room/" + roomId + "/" + playerId, "Room already exists");
        }
    }

    @MessageMapping("/game/{roomId}/nextQuestion")
    public void nextquestion(@DestinationVariable String roomId, @Payload String playerId) {
        GameRoom room = GetRoom(roomId);
        if (room != null && room.getPlayer(playerId).isHost()) {
            Question question = room.nextQuestion();
            messagingTemplate.convertAndSend("/room/" + roomId, question);
        }
    }

    @MessageMapping("/game/{roomId}/addPlayer")
    public void joinRoom(@DestinationVariable String roomId, @Payload Player newPlayer) {
        GameRoom room = GetRoom(roomId);

        if (room != null) {
            if (room.getPlayers().size() < 10) {
                boolean flag = false;
                for (Player player : room.getPlayers()) {
                    if (player.getName().equals(newPlayer.getName())) {
                        flag = true;
                        break;
                    }
                }
                if (!flag) {
                    room.AddPlayer(newPlayer);
                    logger.info(newPlayer.getName() + " joined " + room.getRoomid());
                    messagingTemplate.convertAndSend("/room/" + roomId + "/" + newPlayer.getId(), "ok");
                    messagingTemplate.convertAndSend("/room/" + roomId , room.getPlayers());
                } else {
                    logger.info("Choose another name");
                    messagingTemplate.convertAndSend("/room/" + roomId + "/" + newPlayer.getId(), "Choose another name");
                }
            } else {
                messagingTemplate.convertAndSend("/room/" + roomId + "/" + newPlayer.getId(), "Room is full");
            }
        } else {
            logger.info("Room " + roomId + " does not exist");
            messagingTemplate.convertAndSend("/room/" + roomId + "/" + newPlayer.getId(), "Room does not exist");
        }
    }


    private GameRoom GetRoom(String roomId) {
        for (GameRoom room : rooms) {
            if (room.getRoomid().equals(roomId)) {
                return room;
            }
        }
        return null;
    }


}
