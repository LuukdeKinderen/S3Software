import React, {useState,} from 'react';
import SockJsClient from 'react-stomp';

import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";
import SendIcon from "@material-ui/icons/Send";




export default function WebSocketComponent() {

    const [newMessage, setNewMessage] = useState("");
    let myRef = React.createRef();

   function sendMessage (e){
        e.preventDefault();
        myRef.sendMessage('/topic/greetings', newMessage);
        setNewMessage("");
    }



    

        return (
            <>
                <form  onSubmit={(e) => sendMessage(e)}>
                    <TextField
                        
                        label="Chat..."
                        variant="outlined"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <Fab color="primary" type="submit">
                        <SendIcon />
                    </Fab>
                </form>


                
                
                <SockJsClient url='http://localhost:8080/ws' topics={['/topic/greetings']}
                        onMessage={(msg) => { console.log(msg); }}
                        ref={(client) => { myRef = client }}
                    />
                
            </>
        );
    
}