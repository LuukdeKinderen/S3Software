import React, { useEffect, useState } from 'react';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import './App.css';

import { setMessageHandler, publish, subscribe } from './components/Websocket'

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import { makeid } from './HelperFunctions'

import LogonScreen from './components/Logon/LogonScreen';
import GameScreen from './components/Game/GameScreen';



const outerTheme = createMuiTheme(
  {
    palette: {
      background: {
        paper: '#e6faeb'
      },
      primary: {
        main: '#4caf50',
      },
      secondary: {
        main: '#c62828',
      },
    },
    typography: {
      button: {
        //fontSize: 'calc(10px + 2vmin)'
      },
      //fontSize: 'calc(10px + 2vmin)',
    },
  }
);



export default function App() {

  //before leaving warning
  if (process.env.NODE_ENV === 'production') {
    window.addEventListener("beforeunload", (ev) => {
      ev.preventDefault();
      return ev.returnValue = 'Are you sure you want to close?';
    });
  };

  const [roomId, setRoomId] = useState(sessionStorage.getItem('roomId') || null);
  const [player, setPlayer] = useState(JSON.parse(sessionStorage.getItem('player')) || { id: makeid(100), name: '', drinkCount: 0, host: false })
  const [players, setPlayers] = useState(JSON.parse(sessionStorage.getItem('players')) || null);
  const [question, setQuestion] = useState(sessionStorage.getItem('question') || null);


  const [message, setMessage] = useState(null);

  //roomId And default subscribe
  useEffect(() => {
    if (roomId != null) {
      sessionStorage.setItem('roomId', roomId)

    }
  }, [roomId])

  //player
  useEffect(() => {
    if (player != null) {
      sessionStorage.setItem('player', JSON.stringify(player))
    }
  }, [player]);

  //players
  useEffect(() => {
    if (players != null) {
      sessionStorage.setItem('players', JSON.stringify(players))
    }
  }, [players])

  //question
  useEffect(() => {
    if (question != null) {
      sessionStorage.setItem('question', question)
    }
  }, [question]);






  setMessageHandler((message) => {
    message = JSON.parse(message);
    setMessage(message);
    if (message.players != null) {
      setPlayers(message.players)
    } else if (message.question != null) {
      setQuestion(message.question)
    } else if (message.error != null && message.player.id === player.id) {
      alert(message.error);
    }
    console.log(message)
  })


  return (
    <ThemeProvider theme={outerTheme}>
      <Router>
        <div className="App">
          <header className="App-header">
            <Switch>
              <Route exact path="/">
                <LogonScreen message={message} publish={publish} subscribe={subscribe} setRoomId={setRoomId} setPlayer={setPlayer} />
              </Route>
              <Route path="/Game">
                <GameScreen publish={publish} player={player} players={players} question={question} />
              </Route>
              <Route path="*">
                <h1>Er is iets misgegaan...</h1>
              </Route>
            </Switch>
          </header>
        </div>
      </Router>
    </ThemeProvider>
  );
}