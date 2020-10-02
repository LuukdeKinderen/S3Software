import React, { useState, } from 'react';
import SockJsClient from 'react-stomp';

import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";
import SendIcon from "@material-ui/icons/Send";




export default function WebSocketComponent(props) {

    
    return (
        <SockJsClient
            url={process.env.REACT_APP_WEBSOCKET}
            topics={props.topics}
            onMessage={(msg, topic) => { props.messagHandler(msg, topic); }}
            ref={(client) => { props.thisRef = client }}
        />

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