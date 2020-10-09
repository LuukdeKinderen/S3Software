import React, { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom'

import LobbyScreen from './LobbyScreen';





export default function GameScreen(props) {

    let { roomId } = useParams();
    const [question, setQuestion] = useState(JSON.parse(sessionStorage.getItem('question')) || '');

    useEffect(() => {
        sessionStorage.setItem('question', JSON.stringify(question))
    }, [question]);


    if (question == '') {
        return (
            <LobbyScreen setQuestion={setQuestion} client={props.client} roomId={roomId} subscribe={props.subscribe} />
        );
    } else {
        console.log(question);
        return (<p>game jongeh</p>);
    }
}