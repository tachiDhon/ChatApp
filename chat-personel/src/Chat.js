import React, { useEffect, useState } from 'react';
import { Avatar, IconButton } from '@material-ui/core';
import { AttachFile, MoreVert, SearchOutlined } from '@material-ui/icons';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import { useParams } from 'react-router-dom';
import './Chat.css';
import db from './firebase';
import { useStateValue } from './StateProvider';
import firebase from "firebase"; //for timestamp


function Chat() {
   const [seed, setSeed] = useState(""); 
   const [input, setInput] = useState("");
   const { roomId } = useParams();
   const [roomName, setRoomName] = useState("");
   const [messages, setMessages] = useState([]);
   const [{ user }, dispatch] = useStateValue(); 

   useEffect(() => {
      setSeed(Math.floor(Math.random() * 5000));
   }, [roomId]);

   useEffect(() => {
      if(roomId) {
        db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => (
           setRoomName(snapshot.data().name)
        )); 

        db.collection("rooms")
        .doc(roomId)
        .collection('messages')
        .orderBy('timestamp', 'asc')
        .onSnapshot((snapshot) => (
           setMessages(snapshot.docs.map((doc) => doc.data()))
        ));
      }
   }, [roomId]);
 
   const sendMessage= (e) => {
      e.preventDefault(); 
      console.log('You type...:', input);

      db.collection('rooms').doc(roomId).collection('messages').add({
         message: input, //from our local state
         name: user.displayName, //name from the db et displayName from the googleAuthenti..
         timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });

      setInput('');
   };

   return (
      <div className="chat">
         <div className="chat_header">
            <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />

            <div className="chat_headerInfo">
               <h3>{roomName}</h3>
               {/* last seen is the timestamp from the last message send in the code underneath */}
               <p>Last seen {" "}
               {new Date(
                  messages[messages.length - 1]?.timestamp?.toDate()
               ).toUTCString()}
               </p>
            </div>

            <div className="chat_headerRight">
               <IconButton>
                  <SearchOutlined />
               </IconButton>
               <IconButton>
                  <AttachFile />
               </IconButton>
               <IconButton>
                  <MoreVert />
               </IconButton>
            </div>
         </div>

         <div className="chat_body">
            {messages.map((message) => (
               <p className={`chat_message ${
                  message.name === user.displayName && 'chat_receiver'}`}> 
                  <span className="chat_name">{message.name}</span>
                  {message.message}
                  <span className="chat_timestamp">
                     {new Date(message.timestamp?.toDate()).toUTCString()}
                  </span> 
               </p>
            ))}    
         </div>

         <div className="chat_footer">
            <InsertEmoticonIcon />
            <form>
               <input value={input} onChange={(e) => setInput(e.target.value)}
               placeholder="Your message here.." type="text" />
               <button onClick={sendMessage} type="submit">Send</button>
            </form>
            <MicIcon />
         </div>
      </div>
   )
}

export default Chat