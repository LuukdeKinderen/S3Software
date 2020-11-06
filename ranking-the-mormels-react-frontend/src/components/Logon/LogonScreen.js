import React, { useState, useEffect } from 'react';

import { useHistory } from "react-router-dom";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from '@material-ui/core/Grid';

import logo from '../../Images/mormel.svg'
import { makeid } from '../../HelperFunctions'


export default function LogonScreen(props) {

    const history = useHistory();

    const [name, setName] = useState("");
    const [roomId, setRoomId] = useState("");
    const [host, setHost] = useState(false);

    var player = JSON.parse(sessionStorage.getItem('player'))


    useEffect(() => {
        fetch("https://randomuser.me/api/")
            .then(res => res.json())
            .then(res => {
                setName(res.results[0].login.username);
            });
    }, [])

    useEffect(() => {
        if (props.message != null && props.message.joinRoom != null) {
            if (props.message.joinRoom.id === player.id) {
                history.push(`/Game`);
            }
        }
    }, [props.message, history, player])


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
        var publish = null;
        var newPlayer = {
            id: player.id,
            name: name,
            drinkCount: 0,
            host: true
        }
        if (host) {
            var gameRoom = {
                id: roomId,
                players: [newPlayer],
            };
            publish = { destination: '/app/room/create', body: JSON.stringify(gameRoom) };
        } else {
            newPlayer.host = false;
            publish = { destination: `/app/room/${roomId}/addPlayer`, body: JSON.stringify(newPlayer) };
        }
        props.setPlayer(newPlayer);
        props.setRoomId(roomId);
        props.subscribe(roomId);
        props.publish(publish);
    }



    return (
        <>

            <img alt="Mormel logo" src={logo} width='70%' style={{ maxWidth: '400px', display: 'block', marginLeft: 'auto', marginRight: 'auto' }} />
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



            <Button style={{
                position: 'absolute',
                bottom: '0px'
            }} onClick={() => ChangeHost()}>
                {host ? 'Or Join a room...' : 'Or host a room...'}
            </Button>


        </>
    );
}