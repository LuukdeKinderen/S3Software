import React from 'react';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import './App.css';

import WebSocketComponent from './components/websocket/websocket';
import LogonScreen from './components/Screens/LogonScreen';

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
  return (
    <ThemeProvider theme={outerTheme}>
      <div className="App">
        <WebSocketComponent name="test" />
        <LogonScreen />
        {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      </div>
    </ThemeProvider>
  );
}

export default App;
