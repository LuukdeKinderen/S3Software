import React from 'react';

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






function App() {
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
  
  
  
  
  client.onStompError = function (frame) {
    console.log('Broker reported error: ' + frame.headers['message']);
    console.log('Additional details: ' + frame.body);
  };

  client.activate();

  return (
    <ThemeProvider theme={outerTheme}>
       <Router>

        <div className="App">
          <Switch>

            <Route path="/room/:roomId/:nickname">
              <GameScreen client={client}/>
            </Route>
            <Route exact path="/">
              <LogonScreen client={client}/>
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
