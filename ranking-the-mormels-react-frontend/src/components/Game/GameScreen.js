import React, { useState } from 'react';

import { useParams } from 'react-router-dom'







export default function GameScreen(props) {

    let { roomId, nickname } = useParams();

    const [players, setPlayers] = useState(null);
    
    var subscription = null;
    var newUrl = `/room/${roomId}/players`;
    props.client.onConnect = function (frame) {
        subscription = props.client.subscribe(newUrl, message => messageHandler(message))
    };

    try {
        subscription = props.client.subscribe(newUrl, message => messageHandler(message))
    } catch (err) {

    }

    function messageHandler(message) {
        console.log(JSON.parse(message.body));
        setPlayers(JSON.parse(message.body));
    }





    if (players == null) {

        return (
            <>
                <h1>Waiting for host to start the game</h1>
            </>
        );

    } else {

        return (
            <>
                <h1>Players:</h1>
                {players.map((player, key) =>
                    <p key={key}>{player.name}</p>
                )}
            </>
        );
    }
}