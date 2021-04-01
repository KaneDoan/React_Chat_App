import { AddCircle, CardGiftcard, EmojiEmotions, Gif } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import "./Chat.css";
import Message from "./Message"
import ChatHeader from "./ChatHeader";
import { useSelector } from 'react-redux';
import { selectChannelId, selectChannelName } from './features/appSlice';
import { selectUser } from './features/userSlice';
import db from "./firebase"
import firebase from "firebase";

function Chat() {
    const channelId = useSelector(selectChannelId);
    const user = useSelector(selectUser);
    const channelName = useSelector(selectChannelName);
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if(channelId) {
            db.collection('channels')
            .doc(channelId)
            .collection("messages")
            .orderBy("timestap","desc")
            .onSnapshot((snapshot)=>
                setMessages(snapshot.docs.map((doc) => doc.data()))    
            );
        }
    },[channelId]);

    const sendMessage = (e) =>{
        e.preventDefault();
        db.collection('channels').doc(channelId).collection('messages').
        add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            user: user,
        });
        setInput("");
    };

    return (
        <div className="chat">
            <ChatHeader channelName={channelName}/>

            <div className="chat_messages">
                {messages.map(message => (
                    <Message
                    timestamp = {message.timestamp}
                    message = {message.message}
                    user = {message.user}
                    />
                ))}
            </div>

            <div className="chat_input">
                <AddCircle fontSize="large"/>
                <form>
                    <input 
                    value = {input} 
                    //disabled = {!channelId}
                    onChange={e=>setInput(e.target.value)} 
                    placeholder={`Message #${channelName}`}
                    />

                    <button 
                    disabled = {!channelId}
                    className="chat_inputButton" 
                    type="submit"
                    onClick = {sendMessage}
                    >Send Message
                    </button>
                </form>

                <div className="chat_inputIcons">
                    <CardGiftcard fontSize="large"/>
                    <Gif fontSize="large"/>
                    <EmojiEmotions fontSize="large"/>
                </div>
            </div>
        </div>
    );
}
    


export default Chat
