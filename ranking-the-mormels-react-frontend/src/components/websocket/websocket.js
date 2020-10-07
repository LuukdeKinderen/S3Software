import React, { useState, useEffect} from 'react';

import { Client } from '@stomp/stompjs'
//StompJs = require('@stomp/stompjs');
//import SockJsClient from 'react-stomp';

import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";
import SendIcon from "@material-ui/icons/Send";




export default function WebSocketComponent(props) {

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

        var subscription = client.subscribe(props.subscription, message => {
            props.action(message);
        })
    };

    client.onStompError = function (frame) {
        console.log('Broker reported error: ' + frame.headers['message']);
        console.log('Additional details: ' + frame.body);
    };

    


    client.activate();
    return client;

}


// export default function WebSocketComponent(props) {

//     const [newMessage, setNewMessage] = useState("");

//     let myRef = React.createRef();

//    function Test(e){
//         e.preventDefault();
//         // /'+ props.room + '
//         myRef.sendMessage('/room/Test', newMessage);
//         setNewMessage("");
//     }





//         return (
//             <>
//                  <form  onSubmit={(e) => Test(e)}>
//                     <TextField

//                         label="Chat..."
//                         variant="outlined"
//                         value={newMessage}
//                         onChange={(e) => setNewMessage(e.target.value)}
//                     />
//                     <Fab color="primary" type="submit">
//                         <SendIcon />
//                     </Fab>
//                 </form> 





//                 <SockJsClient url='http://localhost:8080/ws' topics={['/room/Test']}
//                         onMessage={(msg) => { console.log(msg); }}
//                         ref={(client) => { myRef = client }}
//                     />

//             </>
//         );

// }