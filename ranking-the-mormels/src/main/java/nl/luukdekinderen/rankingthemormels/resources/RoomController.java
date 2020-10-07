package nl.luukdekinderen.rankingthemormels.resources;

import nl.luukdekinderen.rankingthemormels.models.GameRoom;
import nl.luukdekinderen.rankingthemormels.models.Player;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.stereotype.Controller;
import org.springframework.web.socket.messaging.SessionConnectedEvent;

import java.util.ArrayList;
import java.util.List;

import static java.lang.String.format;

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


    @MessageMapping("/game/rooms")
    public void addRooms(@Payload GameRoom gameRoom) {

        String playerName = gameRoom.getPlayers().get(0).getName();
        String roomId = gameRoom.getRoomid();

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
            messagingTemplate.convertAndSend("/room/" + roomId + "/" + playerName, "ok");
            messagingTemplate.convertAndSend("/room/" + roomId + "/players", gameRoom.getPlayers());
        } else {
            logger.info("Room already exists");
            messagingTemplate.convertAndSend("/room/" + roomId + "/" + playerName, "Room already exists");
        }
    }


    @MessageMapping("/game/{roomId}/addPlayer")
    public void joinRom(@DestinationVariable String roomId, @Payload Player newPlayer) {
        GameRoom room = GetRoom(roomId);
        if (room != null) {
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
                messagingTemplate.convertAndSend("/room/" + roomId + "/" + newPlayer.getName(), "ok");
                messagingTemplate.convertAndSend("/room/" + roomId + "/players", room.getPlayers());
            } else {
                logger.info("Choose another name");
                messagingTemplate.convertAndSend("/room/" + roomId + "/" + newPlayer.getName(), "Choose another name");
            }
        } else {
            logger.info("Room " + roomId + " does not exist");
            messagingTemplate.convertAndSend("/room/" + roomId + "/" + newPlayer.getName(), "Room does not exist");
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
