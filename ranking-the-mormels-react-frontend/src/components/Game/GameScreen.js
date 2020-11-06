import React from 'react';

import LobbyScreen from './LobbyScreen';
import Ranking from './Ranking';





export default function GameScreen(props) {

    var roomId = sessionStorage.getItem('roomId');



    if (props.question === null) {
        return (
            <LobbyScreen player={props.player} publish={props.publish} players={props.players} roomId={roomId} />
        );
    } else {
        return (
            <>
                <p>Question: {props.question}</p>
                <Ranking publish={props.publish} players={props.players} player={props.player} />
            </>
        );
    }
}