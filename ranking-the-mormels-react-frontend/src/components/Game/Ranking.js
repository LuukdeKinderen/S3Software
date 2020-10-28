
import React, { useState } from 'react'


import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/icons/Done';
import Grid from '@material-ui/core/Grid';
import Button from "@material-ui/core/Button";

export default function Ranking(props) {

    var players = props.players;//.sort((a, b) => (a.ranking < b.ranking || a.ranking === null) ? 1 : ((b.ranking < a.ranking || b.ranking === null) ? -1 : 0));
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
            return <>
                <div style={{minWidth:'50%'}}>
                    <Button variant="contained" color="primary" disabled>{player.name}</Button>
                </div>
                <div style={{minWidth:'50%'}}>
                    <Chip label={rankingLabel(player.ranking)} onDelete={() => deleteRanking(player)} />
                </div>
            </>;
        } else if (newRanking >= -1) {
            return <>
                <div style={{minWidth:'50%'}}>
                    <Button variant="contained" color="primary" onClick={() => setRanking(player)}>{player.name}</Button>
                </div>
            </>;
        } else {
            return <>
                <div style={{minWidth:'50%'}}>
                    <Button variant="contained" color="primary" disabled>{player.name}</Button>
                </div>
                
            </>;
        }
    }
    function sendRankingObject() {
        if (newRanking < -1) { return <p>test</p> }
    }


    return (
        <>
            <Grid
                container
            //spacing={2}
            >
                {
                    players.map((player, key) =>
                        <Grid style={{ padding: '20px' }} item key={key} xs={12} sm={6}>
                            <Grid
                                container
                                direction="row"
                                justify="center"
                                spacing={2}
                            >

                                {rankingObject(player)}

                            </Grid>
                        </Grid>
                    )}
                {sendRankingObject()}
            </Grid>
        </>
    );
}
