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
import org.springframework.messaging.simp.SimpMessageSendingOperations;
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
    private SimpMessageSendingOperations messagingTemplate;

    //TODO Make this in db?
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

        String roomId = gameRoom.getRoomid();
        boolean flag = false;
        for (GameRoom room : rooms) {
            if (room.getRoomid().equals((roomId))) {
                flag = true;
                break;
            }
        }
        if (!flag) {
            List<Player> players = new ArrayList<Player>();
            gameRoom.setPlayers(players);
            rooms.add(gameRoom);
            logger.info("ready to join");
            messagingTemplate.convertAndSend("/room/" + roomId, "ready to join");
        } else {
            logger.info("Room already exists");
            messagingTemplate.convertAndSend("/room/" + roomId + "/error", "Room already exists");
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
                logger.info(newPlayer.getName() + " joined " + room.getRoomid());
                room.AddPlayer(newPlayer);
            } else {
                logger.info("Choose another name");
                messagingTemplate.convertAndSend("/room/" + roomId + "/error", "Choose another name");
            }
        } else {
            logger.info("Room " + roomId + " does not exist");
            messagingTemplate.convertAndSend("/room/" + roomId + "/error", "Room does not exist");
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
