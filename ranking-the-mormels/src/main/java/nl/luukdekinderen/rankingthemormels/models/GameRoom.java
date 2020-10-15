package nl.luukdekinderen.rankingthemormels.models;

import java.util.List;

public class GameRoom {
    private String roomid;
    private int questionCount;

    public int getQuestionCount() {
        return questionCount;
    }

    List<Player> players;

    public GameRoom() {
        questionCount = -1;
    }

    public Question nextQuestion(){
        questionCount++;
        return new Question("test","test","test","test","test","test","test");
    }

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

    public void AddPlayer(Player player) {
        players.add(player);
    }
    public Player getPlayer(String playerId){
        for (Player player : players) {
            if (player.getId().equals(playerId)) {
                return player;
            }
        }
        return null;
    }
}
