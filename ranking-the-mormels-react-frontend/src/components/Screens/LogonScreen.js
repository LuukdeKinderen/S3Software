import React, { useState, } from 'react';

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from '@material-ui/core/Grid';



export default function LogonScreen() {
    const [name, setName] = useState("");
    const [roomCode, setRoomCode] = useState("");
    const [host, setHost] = useState(false);

    function Join(e) {
        e.preventDefault();
        alert(host ? "Created a room with room code " + roomCode : "Joined room " + roomCode)
    }

    function ChangeHost() {
        setHost(!host);
        if (!host) {
            setRoomCode("AAAA"); //Get from JAVA
        } else {
            setRoomCode("");
        }
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
                                    required
                                    label="Nick name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Grid>
                            <Grid item>
                                <TextField
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