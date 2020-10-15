package nl.luukdekinderen.rankingthemormels.resources;

import nl.luukdekinderen.rankingthemormels.models.GameRoom;
import nl.luukdekinderen.rankingthemormels.models.Question;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class GameController {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Autowired
    private RoomService roomService;

    @MessageMapping("/game/{roomId}/nextQuestion")
    public void nextquestion(@DestinationVariable String roomId, @Payload String playerId) {
        GameRoom room = roomService.GetRoom(roomId);

        if (room != null && room.getPlayer(playerId).isHost()) {
            Question question = room.nextQuestion();
            messagingTemplate.convertAndSend("/room/" + roomId, question);
        }
    }

}
