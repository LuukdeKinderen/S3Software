package nl.luukdekinderen.rankingthemormels.models;

public class Player {

    private String id;
    private String name;
    private int drinkCount;
    private boolean host;
    private Ranking ranking;

    public void setDrinkCount(int drinkCount) {
        this.drinkCount = drinkCount;
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }
    public void setRanking(Ranking ranking) {
        this.ranking = ranking;
    }

    public int getDrinkCount() {
        return drinkCount;
    }

    public boolean isHost() {
        return host;
    }

    public Ranking getRanking() {
        return ranking;
    }
}
