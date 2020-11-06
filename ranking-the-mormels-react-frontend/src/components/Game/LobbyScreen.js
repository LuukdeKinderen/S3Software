import React, { useState } from 'react';

import Button from "@material-ui/core/Button";
import {
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    ListItemSecondaryAction,
    ListSubheader
} from "@material-ui/core";

import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import images from '../../Images/playerImages/playerImage'

import { setMessageHandler, publish } from '../Websocket'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function LobbyScreen(props) {
    const classes = useStyles();
    const history = useHistory();

    const roomId = sessionStorage.getItem("roomId");
    const player = JSON.parse(sessionStorage.getItem("player"));

    const [players, setPlayers] = useState(null);

    setMessageHandler((message) => {
        message = JSON.parse(message);
        
        if (message.players != null) {
            setPlayers(message.players)

        } else if (message.question != null) {
            props.setPlayers(players);
            props.setQuestion(message.question)

        } else if (message.error != null && message.player.id === JSON.parse(sessionStorage.getItem('player')).id) {
            alert(message.error);
            sessionStorage.clear();
            history.push('/');
        }
    })


    if (player.host && players != null) {

        function start() {
            publish(
                { destination: `/app/game/${roomId}/new-question`, body: JSON.stringify(player) }
            );
        }

        var StartButton = '';
        var PlayerList = (
            <>
                <List
                    className={classes.root}
                    subheader={
                        <ListSubheader component="div" id="nested-list-subheader">
                            Players:
                    </ListSubheader>
                    }
                >
                    {players.map((player, key) =>
                        <ListItem key={key} >
                            <ListItemIcon>
                                <img alt="Mormel logo" src={images[player.imageIndex]} style={{ width: '100%', marginRight: '5px' }} />
                            </ListItemIcon>
                            <ListItemText
                                primary={player.name}
                            />
                            <ListItemSecondaryAction />
                        </ListItem>

                    )}
                </List>
            </>
        );
        if (players.length > 4) {
            StartButton =
                <Button variant="contained" color="primary" onClick={() => start()} size="large">
                    START
                </Button>
        } else {
            StartButton =
                <p>
                    <b>{5 - players.length}</b> players need to join
                </p>

        }
        return (
            <>
                <h1>Room code: <i>{roomId}</i></h1>
                {PlayerList}
                {StartButton}
            </>
        );
    } else {
        return (
            <>
                <h4>Waiting for host to start the game...</h4>
            </>
        );
    }
}