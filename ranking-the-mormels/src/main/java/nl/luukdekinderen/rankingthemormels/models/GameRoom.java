package nl.luukdekinderen.rankingthemormels.models;

import java.util.List;

public class GameRoom {
    private String roomid;
    List<Player> players;

    public String getRoomid() {
        return roomid;
    }

    public void setRoomid(String roomid) {
        this.roomid = roomid;
    }

    public List<Player> getPlayers() {
        return players;
    }

    public void setPlayers(List<Player> players) {
        this.players = players;
    }

    public void AddPlayer(Player player){
        players.add(player);
    }
}
