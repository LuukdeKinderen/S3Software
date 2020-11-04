import React, { useState, useEffect } from 'react';

import LobbyScreen from './LobbyScreen';





export default function GameScreen(props) {

    var roomId = sessionStorage.getItem('roomId');
    const [question, setQuestion] = useState(JSON.parse(sessionStorage.getItem('question')) || null);
    const [players] = useState(JSON.parse(sessionStorage.getItem('players')))

    useEffect(() => {
        sessionStorage.setItem('question', JSON.stringify(question))
    }, [question]);


    if (question === '') {
        return (
            <LobbyScreen setQuestion={setQuestion} roomId={roomId} />
        );
    } else {
        return (<p>Game component</p>);
    }
}