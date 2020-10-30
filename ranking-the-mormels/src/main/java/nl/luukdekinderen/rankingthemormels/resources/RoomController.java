package nl.luukdekinderen.rankingthemormels.resources;

import nl.luukdekinderen.rankingthemormels.models.GameRoom;
import nl.luukdekinderen.rankingthemormels.models.Player;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;


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

    @MessageMapping("/room/create")
    public void addRooms(@Payload GameRoom gameRoom) {

        String roomId = gameRoom.getId();
        boolean added = roomService.addRoom(gameRoom);

        if(added){
            logger.info("Room created: " + roomId);
            messagingTemplate.convertAndSend("/room/" + roomId , gameRoom.getPlayerNames());
        }else {
            logger.info("Room already exists");
            messagingTemplate.convertAndSend("/room/" + roomId , "Room already exists");

        }
    }


    @MessageMapping("/room/{roomId}/addPlayer")
    public void joinRom(@DestinationVariable String roomId, @Payload Player newPlayer) {
        GameRoom gameRoom = roomService.getRoom(roomId);

        if(gameRoom == null){

            logger.info("Room " + roomId + " does not exist");
            messagingTemplate.convertAndSend("/room/" + roomId, "Room does not exist");
            return;
        }

        boolean added = gameRoom.AddPlayer(newPlayer);

        if(added){
            logger.info("Player\"" + newPlayer.getName()+"\" joined room: " + roomId);
            messagingTemplate.convertAndSend("/room/" + roomId , gameRoom.getPlayerNames());
        }else{
            logger.info("Player name\"" + newPlayer.getName()+"\" already exists in room: " + roomId);
            messagingTemplate.convertAndSend("/room/" + roomId, "Player name\"" + newPlayer.getName()+"\" already exists in room: " + roomId);
        }
    }

}
