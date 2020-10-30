package nl.luukdekinderen.rankingthemormels.models;

public class Ranking {

    private String firstName;
    private String secondName;
    private String thirdName;
    private String lastBestName;

    public Ranking(String firstName, String secondName, String thirdName, String lastBestName) {
        this.firstName = firstName;
        this.secondName = secondName;
        this.thirdName = thirdName;
        this.lastBestName = lastBestName;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getSecondName() {
        return secondName;
    }

    public String getThirdName() {
        return thirdName;
    }

    public String getLastBestName() {
        return lastBestName;
    }
}
