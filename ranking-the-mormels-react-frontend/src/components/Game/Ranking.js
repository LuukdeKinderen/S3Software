
import React, {  useState } from 'react'


import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/icons/Done';
import Grid from '@material-ui/core/Grid';
import Button from "@material-ui/core/Button";

export default function Ranking(props) {

    var players = props.players.sort((a, b) => (a.ranking < b.ranking) ? 1 : ((b.ranking < a.ranking) ? -1 : 0));
    //players = players.sort((a, b) => (a.ranking < b.ranking) ? 1 : ((b.ranking < a.ranking) ? -1 : 0));


    const [newRanking, setNewRanking] = useState(5);


    function sendData() {
        console.log("ready to send!");
    }



    function setRanking(player) {
        setNewRanking(newRanking - 2);
        player.ranking = newRanking;
    }

    function deleteRanking(player) {
        setNewRanking(newRanking + 2);
        players.forEach(Oplayer => {
            if (Oplayer.ranking < player.ranking && Oplayer.ranking != null) {
                Oplayer.ranking += 2;
            }
        });
        player.ranking = null;
    }
    function rankingLabel(ranking) {

        switch (ranking) {
            case 5:
                return "1st"
                break;
            case 3:
                return "2nd"
                break;
            case 1:
                return "3th"
                break;
            case -1:
                return "Last best"
                break;
        }
    }

    function rankingObject(player) {
        if (player.ranking != null) {
            return <Chip label={rankingLabel(player.ranking)} onDelete={() => deleteRanking(player)} />;
        } else if (newRanking >= -1) {
            return <Chip label={rankingLabel(newRanking)} color="primary" deleteIcon={<DoneIcon />} onDelete={() => setRanking(player)} />;
        }
    }
    function sendRankingObject(){
        if (newRanking < -1) {return<p>test</p>}
    }


    return (
        <>
            <Grid
                container
                direction="column"
            >
                {
                    players.map((player, key) =>
                        <Grid item key={key}><p>{player.name} {rankingObject(player)} {player.ranking}</p></Grid>
                    )}
                    {sendRankingObject()}
            </Grid>
        </>
    );
}
