import React, { useEffect, useState } from 'react';
import { Avatar, IconButton } from '@material-ui/core';
import { AttachFile, MoreVert, SearchOutlined } from '@material-ui/icons';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import { useParams } from 'react-router-dom';
import './Chat.css';
import db from './firebase';

function Chat() {
   const [seed, setSeed] = useState(""); 
   const [input, setInput] = useState("");
   const { roomId } = useParams();
   const [roomName, setRoomName] = useState("");

   useEffect(() => {
      setSeed(Math.floor(Math.random() * 5000));
   }, [roomId]);

   useEffect(() => {
      if(roomId) {
        db.collection('rooms').doc(roomId).onSnapshot(snapshot => (
           setRoomName(snapshot.data().name)
        ))
      }
   }, [roomId]);
 
   const sendMessage= (e) => {
      e.preventDefault(); 
      console.log('You type...:', input);

      setInput('');
   };

   return (
      <div className="chat">
         <div className="chat_header">
            <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />

            <div className="chat_headerInfo">
               <h3>{roomName}</h3>
               <p>Last seen at..</p>
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
            <p className={`chat_message ${true && 'chat_receiver'}`}>
               <span className="chat_name">Tashi Dhundup</span>
               Hey guys

               <span className="chat_timestamp">3:52pm</span>
            </p>
            
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