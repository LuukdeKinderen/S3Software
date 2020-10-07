package nl.luukdekinderen.rankingthemormels.models;

public class Player {

    private String name;
    private int drinkCount;
    private boolean host;

//    public Player(){
//
//    }
//
//    public Player(String name, int drinkCount, boolean host) {
//        this.name = name;
//        this.drinkCount = drinkCount;
//        this.host = host;
//    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getDrinkCount() {
        return drinkCount;
    }

    public void setDrinkCount(int drinkCount) {
        this.drinkCount = drinkCount;
    }

    public boolean isHost() {
        return host;
    }

    public void setHost(boolean host) {
        this.host = host;
    }
}
