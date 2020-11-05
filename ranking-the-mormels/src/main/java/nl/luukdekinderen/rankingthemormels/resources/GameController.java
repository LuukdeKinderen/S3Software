package nl.luukdekinderen.rankingthemormels.resources;

import nl.luukdekinderen.rankingthemormels.models.GameRoom;

import nl.luukdekinderen.rankingthemormels.models.Player;
import nl.luukdekinderen.rankingthemormels.models.Question;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.util.concurrent.Callable;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

@Controller
public class GameController {

    private static final Logger logger = LoggerFactory.getLogger(WebSocketEventListener.class);

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Autowired
    private RoomService roomService;

    @MessageMapping("/game/{roomId}/start")
    public void joinRoom(@DestinationVariable String roomId, @Payload Player player) {

        GameRoom room = roomService.getRoom(roomId);

        if(room.isRealHost(player.getId())){

            JSONObject message = new JSONObject();
            message.put("question", "Wie is de aardigste speler!");

            messagingTemplate.convertAndSend("/room/" + roomId, message.toString());
        }
    }

    @MessageMapping("/game/{roomId}/newQuestion")
    public void newQuestion(@DestinationVariable String roomId, @Payload Player player) {

        GameRoom room = roomService.getRoom(roomId);

        if(room.isRealHost(player.getId())){

            JSONObject message = new JSONObject();
            message.put("question", "Wie is de aardigste speler!");

            messagingTemplate.convertAndSend("/room/" + roomId, message.toString());
        }
    }


}
