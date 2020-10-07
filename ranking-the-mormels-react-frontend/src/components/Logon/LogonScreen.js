import React, { useState } from 'react';

import { useHistory } from "react-router-dom";

//import { client } from '@stomp/stompjs'

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from '@material-ui/core/Grid';









export default function LogonScreen(props) {

    const history = useHistory();

    const [name, setName] = useState("");
    const [roomId, setRoomId] = useState("");
    const [host, setHost] = useState(false);


    function ChangeHost() {
        setHost(!host);
        if (!host) {
            setRoomId(makeid(4));
        } else {
            setRoomId("");
        }
    }

    function Join(e) {
        e.preventDefault();
        var newUrl = `/room/${roomId}/${name}`;
        var subscription = props.client.subscribe(newUrl, message => { ///app/game/rooms
            if (message.body === "ok") {
                history.push(newUrl);
            }
            else {
                alert(message.body);
            }
            subscription.unsubscribe();

        })
        var player = {
            name: name,
            drinkCount: 0,
            host: true
        }
        if (host) {
            var gameRoom = {
                roomid: roomId,
                players: [player]
            };
            props.client.publish({ destination: '/app/game/rooms', body: JSON.stringify(gameRoom) });
        } else {
            player.host = false;
            props.client.publish({ destination: `/app/game/${roomId}/addPlayer`, body: JSON.stringify(player) });
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
                                    value={roomId}
                                    onChange={(e) => setRoomId(e.target.value)}
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