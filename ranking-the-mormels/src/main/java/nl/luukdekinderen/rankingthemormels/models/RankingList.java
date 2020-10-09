package nl.luukdekinderen.rankingthemormels.models;

import java.util.List;

public class RankingList {
    List<Ranking> rankings;


    public RankingList(List<Ranking> rankings) {
        this.rankings = rankings;
    }

    public List<Ranking> getRankings() {
        return rankings;
    }
}
