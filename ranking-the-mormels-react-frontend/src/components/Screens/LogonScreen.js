import React, { useState, } from 'react';

import WebSocketComponent from '../websocket/websocket';
//import SockJsClient from 'react-stomp';


import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from '@material-ui/core/Grid';



export default function LogonScreen() {
    const [name, setName] = useState("");
    const [roomCode, setRoomCode] = useState("");
    const [host, setHost] = useState(false);

    let thisRef = React.createRef();

    function ChangeHost() {
        setHost(!host);
        if (!host) {
            setRoomCode(makeid(4));
        } else {
            setRoomCode("");
        }
    }

    function MessagHandler(msg, topic) {
        console.log(msg);
        console.log(topic);
        if (msg === "ready to join") {
            var player = {
                name: name,
                drinkCount: 0,
                host: true
            }
            thisRef.sendMessage('/app/game/' + roomCode + '/addPlayer', JSON.stringify(player));

        } else if (topic.includes("error")) {
            alert(msg);
        }
    }

    function Join(e) {
        e.preventDefault();
        if (host) {
            var gameRoom = {
                roomid: roomCode
            };
            thisRef.sendMessage('/app/game/rooms', JSON.stringify(gameRoom));
        } else {
            var player = {
                name: name,
                drinkCount: 0,
                host: true
            }
            thisRef.sendMessage('/app/game/' + roomCode + '/addPlayer', JSON.stringify(player));
        }
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



    return (
        <>

{/* 
            <SockJsClient
                url={process.env.REACT_APP_WEBSOCKET}
                topics={[
                    '/room/' + roomCode,
                    '/app/game/rooms',
                    '/room/' + roomCode + "/error",
                ]}
                onMessage={(msg, topic) => MessagHandler(msg, topic)}
                ref={(client) => { thisRef = client }}
            /> */}
            {/* <WebSocketComponent
                topics={[
                    '/app/game/rooms',
                    '/room/' + roomCode,
                    '/room/' + roomCode + "/error",
                ]}
                messagHandler={MessagHandler}
                thisRef={thisRef}
            />  */}

            <Grid
                container
                direction="column"
                justify="space-between"
                alignItems="center"
                style={{ height: "100vh" }}
            >
                <Grid item>
                    <h1>Ranking the Mormels</h1>
                    <form onSubmit={(e) => Join(e)}>
                        <Grid

                            container
                            direction="column"
                            justify="space-evenly"
                            alignItems="center"
                            spacing={3}
                        >
                            <Grid item>
                                <TextField
                                    InputProps={{ inputProps: { minLength: 3, maxLength: 20 } }}
                                    required
                                    label="Nick name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    InputProps={{ inputProps: { maxLength: 4 } }}
                                    required
                                    disabled={host}
                                    label="Room code"
                                    value={roomCode}
                                    onChange={(e) => setRoomCode(e.target.value)}
                                />
                            </Grid>
                            <Grid item>
                                <Button variant="contained" color="primary" type="submit" size="large">
                                    {host ? 'HOST' : 'JOIN'}
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
                <Grid item>
                    <Button style={{}} onClick={() => ChangeHost()}>
                        {host ? 'Or Join a room...' : 'Or host a room...'}
                    </Button>
                </Grid>
            </Grid>
        </>
    );

}