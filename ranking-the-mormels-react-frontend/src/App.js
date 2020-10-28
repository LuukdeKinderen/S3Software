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
import Henkie from './components/Game/Ranking2'



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

client.onConnect = function (frame) {
  // subscription=client.subscribe("", message => { ///app/game/rooms

  // });
}


client.onStompError = function (frame) {
  console.log('Broker reported error: ' + frame.headers['message']);
  console.log('Additional details: ' + frame.body);
};

client.activate();


function App() {
  const [url, setUrl] = useState('');
  const [publish, setPublish] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const [messageHandler, setMessageHandler] = useState(() => function () { });

  useEffect(() => {
    try {
      subscription.unsubscribe();
    } catch (err) {

    }
    try {
      setSubscription(client.subscribe(url, message => { ///app/game/rooms
        messageHandler(message);
      }));
    } catch (err) {

    }
    client.onConnect = function (frame) {
      setSubscription(client.subscribe(url, message => { ///app/game/rooms
        messageHandler(message);
      }))
    }
    try {
      if (publish != null) {
        client.publish(publish);
      }
    } catch (err) {

    }
  }, [messageHandler]);

  function subscribe(url, messageHandler, publish) {
    setUrl(url);
    setPublish(publish);
    setMessageHandler(messageHandler);
  }

  var players = [
    { image: 0, id: '0', name: 'pieter' },
    { image: 1, id: '1', name: 'klaas' },
    { image: 2, id: '2', name: 'jan' },
    { image: 3, id: '3', name: 'henk' },
    { image: 4, id: '4', name: 'max' },
    { image: 5, id: '5', name: 'trien' },

  ]




  return (
    <ThemeProvider theme={outerTheme}>
      <Router>

        <div className="App">
          <Switch>
            <Route exact path="/">
              <LogonScreen client={client} subscribe={subscribe} />
            </Route>
            <Route path="/room/:roomId">
              <GameScreen client={client} subscribe={subscribe} />
            </Route>
            <Route path="/ranking">
              <Ranking players={players} />
            </Route>
            <Route path="/ranking2">
              <Henkie players={players} />
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
