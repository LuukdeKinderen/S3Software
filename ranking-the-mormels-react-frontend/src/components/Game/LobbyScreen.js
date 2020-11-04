import React, { useState, useEffect } from 'react';

import Button from "@material-ui/core/Button";


export default function LobbyScreen(props) {

    const [players] = useState(JSON.parse(sessionStorage.getItem('players')) || null);
    const [player, setPlayer] = useState(JSON.parse(sessionStorage.getItem('player')) || '')


    useEffect(() => {
        sessionStorage.setItem('players', JSON.stringify(players))
    }, [players]);


    if (player.host) {
        function start() {
            var url = `/room/${props.roomId}`;
            // props.subscribe(
            //     url,
            //     () => function (message) {
            //         if (JSON.parse(message.body).question != null) {
            //             props.setQuestion(JSON.parse(message.body));
            //         }
            //     },
            //     { destination: `/app/game/${props.roomId}/nextQuestion`, body: sessionStorage.getItem('playerHash') }
            // );
        }


        var Content = '';
        var StartButton = '';
        if (players == null) {

            Content = (
                <>
                    <h4>Waiting for players to join...</h4>
                </>
            );

        } else {

            Content = (
                <>
                    <h4>Players:</h4>
                    <p>
                        {players.map((player, key) =>
                            <span key={key}>{player.name} <br /></span>
                        )}
                    </p>
                </>
            );
            if (players.length > 4) {
               // console.log('test');
                StartButton =
                    (<Button variant="contained" color="primary" onClick={() => start()} size="large">
                        START
                    </Button>);
            } else {
                StartButton = (
                    <><p>{5 - players.length} players need to join</p></>
                );
            }
        }
        return (
            <div>
                <h1>Join via {props.roomId}</h1>
                {Content}
                {StartButton}
            </div>
        );
    } else {
        return (
            <div>
                <h4>Waiting for host to start the game...</h4>
            </div>
        );
    }
}