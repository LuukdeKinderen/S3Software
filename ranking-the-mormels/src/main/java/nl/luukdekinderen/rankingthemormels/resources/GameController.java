package nl.luukdekinderen.rankingthemormels.resources;

import nl.luukdekinderen.rankingthemormels.models.GameRoom;
import nl.luukdekinderen.rankingthemormels.models.Question;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
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

    @MessageMapping("/game/{roomId}/nextQuestion")
    public void nextquestion(@DestinationVariable String roomId, @Payload String playerId) {
        GameRoom room = roomService.GetRoom(roomId);

        if (room != null && room.getPlayer(playerId).isHost()) {
            logger.info("test");
            ScheduledExecutorService executorService = Executors.newSingleThreadScheduledExecutor();
            Callable test = new Callable() {
                public Object call() throws Exception {
                    logger.info("test1");
                    return "Called!";
                }
            };
            executorService.schedule(test,10,TimeUnit.SECONDS);//(GameController::testing, 10, TimeUnit.SECONDS);
            Question question = room.nextQuestion();
            messagingTemplate.convertAndSend("/room/" + roomId, question);
        }
    }



/*    public Object testing() throws Exception{
        logger.info("test1");
        return ("called");
    }*/






}
