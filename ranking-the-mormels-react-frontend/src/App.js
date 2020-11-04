import React, { useEffect, useState } from 'react';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import './App.css';

import { Client } from '@stomp/stompjs'

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import LogonScreen from './components/Logon/LogonScreen';
import GameScreen from './components/Game/GameScreen';
import Ranking from './components/Game/Ranking';



const outerTheme = createMuiTheme(
  {
    palette: {
      primary: {
        main: '#4caf50',
      },
      secondary: {
        main: '#c62828',
      },
    },
  }
);

const client = new Client({
  brokerURL: process.env.REACT_APP_WEBSOCKET,
  // connectHeaders: {
  //   login: "user",
  //   passcode: "password"
  // },
  debug: function (str) {
    if (process.env.NODE_ENV !== 'production') { console.log(str) };
  },
  reconnectDelay: 5000,
  heartbeatIncoming: 4000,
  heartbeatOutgoing: 4000
});

client.onStompError = (frame) => {
  console.log('Broker reported error: ' + frame.headers['message']);
  console.log('Additional details: ' + frame.body);
};


client.activate();

function App() {
  //before leaving error
  window.addEventListener("beforeunload", (ev) => {
    ev.preventDefault();
    return ev.returnValue = 'Are you sure you want to close?';
  });

  const [roomId, setRoomId] = useState(sessionStorage.getItem('roomId') || null);
  const [player, setPlayer] = useState(JSON.parse(sessionStorage.getItem('player')) || { id: makeid(100), name: '', drinkCount: 0, host: false })
  const [players, setPlayers] = useState(JSON.parse(sessionStorage.getItem('players')) || null);

  //roomId And default subscribe
  useEffect(() => {
    if (roomId != null) {
      sessionStorage.setItem('roomId', roomId)
      client.onConnect = () => {
        subscribe(roomId);
      }
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

  function subscribe(newRoomId) {
    client.subscribe(`/room/${newRoomId}`, message => {
      messageHandler(message.body);
    })
  }

  function publish(publish) {
    client.publish(publish);
  }

  function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }


  function messageHandler(message) {
    message = JSON.parse(message);
    if (message.players != null) {
      setPlayers(message.players)
    }
    console.log(message);
  }

  return (
    <ThemeProvider theme={outerTheme}>
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/">
              <LogonScreen publish={publish} subscribe={subscribe} setRoomId={setRoomId} setPlayer={setPlayer} />
            </Route>
            <Route path="/Game">
              <GameScreen client={client} />
            </Route>
            <Route path="/ranking">
              <Ranking players={players} />
            </Route>
            <Route path="*">
              <h1>Er is iets misgegaan...</h1>
            </Route>
          </Switch>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
