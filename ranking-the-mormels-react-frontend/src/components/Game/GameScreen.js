import React, { useState } from 'react';

import LobbyScreen from './LobbyScreen';
import Ranking from './Ranking';





export default function GameScreen() {
    const [players, setPlayers] = useState(null);
    const [question, setQuestion] = useState(null);


    if (question === null) {
        return (
            <LobbyScreen setPlayers={setPlayers} setQuestion={setQuestion} />
        );
    } else {
        return (
            <>
                <p>Question: {question}</p>
                <Ranking players={players} setQuestion={setQuestion} />
            </>
        );
    }
}