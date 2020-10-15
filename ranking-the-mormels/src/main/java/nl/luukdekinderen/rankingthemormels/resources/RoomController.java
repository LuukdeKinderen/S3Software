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

    @Autowired
    private RoomService roomService;

    @Autowired
    public void RoomController() {
    }

    @MessageMapping("/room/addRoom")
    public void addRoom(@Payload GameRoom gameRoom, SimpMessageHeaderAccessor headerAccessor) {

        String playerId = gameRoom.getPlayers().get(0).getId();
        String roomId = gameRoom.getRoomid();

        boolean flag = false;
        for (GameRoom room : roomService.rooms) {
            if (room.getRoomid().equals((roomId))) {
                flag = true;
                break;
            }
        }

        if (!flag) {
            roomService.rooms.add(gameRoom);
            logger.info("New room: " + roomId);
            messagingTemplate.convertAndSend("/room/" + roomId + "/" + playerId, "ok");
            messagingTemplate.convertAndSend("/room/" + roomId, gameRoom.getPlayers());
        } else {
            logger.info("Room already exists");
            messagingTemplate.convertAndSend("/room/" + roomId + "/" + playerId, "Room already exists");
        }
    }

    @MessageMapping("/room/{roomId}/addPlayer")
    public void joinRoom(@DestinationVariable String roomId, @Payload Player newPlayer) {
        GameRoom room = roomService.GetRoom(roomId);

        if (room != null) {
            if (room.getPlayers().size() > 10) {
                messagingTemplate.convertAndSend("/room/" + roomId + "/" + newPlayer.getId(), "Room is full");
                return;
            }
            if (room.getQuestionCount() > -1) {
                messagingTemplate.convertAndSend("/room/" + roomId + "/" + newPlayer.getId(), "Room already started");
                return;
            }
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
                messagingTemplate.convertAndSend("/room/" + roomId, room.getPlayers());
            } else {
                logger.info("Choose another name");
                messagingTemplate.convertAndSend("/room/" + roomId + "/" + newPlayer.getId(), "Choose another name");
            }
        } else {
            logger.info("Room " + roomId + " does not exist");
            messagingTemplate.convertAndSend("/room/" + roomId + "/" + newPlayer.getId(), "Room does not exist");
        }
    }

    @MessageMapping("/room/{roomId}/players")
    public void listOfPlayers(@DestinationVariable String roomId) {
        messagingTemplate.convertAndSend("/room/" + roomId, roomService.GetRoom(roomId).getPlayers());
    }


}
