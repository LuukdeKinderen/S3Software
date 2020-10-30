package nl.luukdekinderen.rankingthemormels.resources;

import nl.luukdekinderen.rankingthemormels.models.GameRoom;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class RoomService {
    public List<GameRoom> rooms;

    @Autowired
    public void RoomService() {
        rooms = new ArrayList<GameRoom>();
    }

    public GameRoom GetRoom(String roomId) {
        for (GameRoom room : rooms) {
            if (room.getRoomid().equals(roomId)) {
                return room;
            }
        }
        return null;
    }
}
