import React, { useState, } from 'react';

import { Client } from '@stomp/stompjs'
//StompJs = require('@stomp/stompjs');
//import SockJsClient from 'react-stomp';

import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";
import SendIcon from "@material-ui/icons/Send";




export default function WebSocketComponent() {



    const client = new Client({
        brokerURL: process.env.REACT_APP_WEBSOCKET,
        // connectHeaders: {
        //   login: "user",
        //   passcode: "password"
        // },
        debug: function (str) {
            console.log(str);
        },
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000
    });

    client.onConnect = function (frame) {

        console.log('onConnect');


        var gameRoom = {
            roomid: 'lol1'
        };
        //client.send('/game/rooms', {},  JSON.stringify(gameRoom))
        
        client.subscribe('/app/game/rooms', message => {
            console.log(message);
        })
        client.publish({destination: '/app/game/rooms', body: JSON.stringify(gameRoom)});

        // Do something, all subscribes must be done is this callback
        // This is needed because this will be executed after a (re)connect
    };

    client.onStompError = function (frame) {
        // Will be invoked in case of error encountered at Broker
        // Bad login/passcode typically will cause an error
        // Complaint brokers will set `message` header with a brief message. Body may contain details.
        // Compliant brokers will terminate the connection after any error
        console.log('Broker reported error: ' + frame.headers['message']);
        console.log('Additional details: ' + frame.body);
    };

    client.activate();

    


    console.log(client.brokerURL);


    return (
        <>
            test
        </>
        // <SockJsClient
        //     url={process.env.REACT_APP_WEBSOCKET}
        //     topics={props.topics}
        //     onMessage={(msg, topic) => { props.messagHandler(msg, topic); }}
        //     ref={(client) => { props.thisRef = client }}
        // />

    );

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