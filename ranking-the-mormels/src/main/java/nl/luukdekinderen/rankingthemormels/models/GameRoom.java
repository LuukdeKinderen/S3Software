package nl.luukdekinderen.rankingthemormels.models;


import org.json.JSONObject;

import java.util.List;
import java.util.stream.Collectors;

public class GameRoom {


    private String id;
    private List<Player> players;
    private int currentQuestionCount;
    private String[] questionIds;

    public boolean AddPlayer(Player newPlayer) {
        boolean flag = false;
        for (Player player : players) {
            if (newPlayer.getName() == player.getName()) {
                flag = true;
            }
        }
        if (!flag) {
            newPlayer.setImageIndex(players.size());
            players.add(newPlayer);
            return true;
        }
        return false;
    }

    public List<Player> getPlayers() {
        return players;
    }


    public void NextQuestion() {
        currentQuestionCount++;
        //check for end of game

        //send new question to frondEnd

        //clear all player rankings

        //start timer
        // after timer => SendAverageRanking()

    }


    // Do on every player Ranking update
    public void DidFinishRankings() {
        // check if all players finished sending ranking

        // if true
        // stopTimer
        // SendRanking()

    }

    private void SendAverageRanking() {
        // CalculateAverageRanking()
        // CreateTaskForRanking()
        // Send task to frontEnd
    }

    private Ranking CalculateAverageRanking() {
        return new Ranking("test", "test", "test", "test");
    }

    private String CreateTaskForRanking(Ranking ranking) {
        return "test";
    }


    public String getId() {
        return id;
    }

    public List<JSONObject> getPlayerObjects() {
        List<JSONObject> playerObjs = players.stream()
                .map(Player::toJSONObject)
                .collect(Collectors.toList());
        return playerObjs;
    }

    public boolean isRealHost(String playerId) {
        for (Player player : players){
            if(player.getId().equals(playerId) && player.isHost()){
                return true;
            }
        }
        return false;
    }
}
