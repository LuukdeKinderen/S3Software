package nl.luukdekinderen.rankingthemormels.resources;



import nl.luukdekinderen.rankingthemormels.models.Greeting;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class MessageController {
    @MessageMapping("/hello")
    @SendTo("/topic/greetings")
    public Greeting greeting(String name) throws Exception{
        return new Greeting("Hello, " + name);
    }
}
