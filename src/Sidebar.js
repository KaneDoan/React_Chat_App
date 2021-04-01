import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddIcon from "@material-ui/icons/Add";
import SidebarChannel from './SidebarChannel';
import SignalCellularAltIcon from '@material-ui/icons/SignalCellularAlt';
import InfoIcon from '@material-ui/icons/Info';
import CallIcon from '@material-ui/icons/Call';
import { Avatar } from '@material-ui/core';
import { Headset, Mic, Settings } from '@material-ui/icons';
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
import db,{ auth } from './firebase';

function Sidebar() {
    const user = useSelector(selectUser);
    const [channels, setChannels] = useState([]);

    // useEffect(() => {
    //     db.collection("channels").onSnapshot((snapshot) =>
    //         setChannels(
    //             snapshot.docs.map((doc)=>({
    //                 id: doc.id,
    //                 channel: doc.data(),
    //             }))
    //         )
    //     );
    // },[]);

    const handleAddChannel = ()=>{
        const channelName = prompt("Enter a channel name");
        if(channelName){
            db.collection("channels").add({
                channelName: channelName,

            });
        }
    };

    return (
        <div className="sidebar">
            <div className="sidebar_top">
                <h3>Kane App</h3>
                <ExpandMoreIcon />
            </div>

            <div className="sidebar_channels">
                <div className="sidebar_channelsHeader">
                    <div className="sidebar_header">
                        <ExpandMoreIcon/>
                        <h4>Text Channels</h4>
                    </div>

                    <AddIcon  onClick = {handleAddChannel} className= "sidebar_addChannel"/>
                </div>

                <div className="sidebar_channelsList">
                    {/*map through every channels and only show channels that available in db*/}
                    {channels.map(({id, channel})=>{
                        <SidebarChannel key = {id} id ={id} channelName={channel.channelName}/>
                    })}
                </div>
            </div>
            
            <div className="sidebar_voice">
                        <SignalCellularAltIcon
                            className="sidebar_voiceIcon"
                            fontSize="large"
                        />

                        <div className="sidebar_voiceInfo">
                            <h3>Voice Connected</h3>
                            <p>Stream</p>
                        </div>

                        <div className="sidebar_voiceIcons">
                            <InfoIcon/>
                            <CallIcon/>
                        </div>
            </div>

            <div className="sidebar_profile">
                    {/*Display user Information when they logged in with Google*/}
                        <Avatar onClick = {() =>{auth.signOut();}} src={user.photo}/>
                        <div className="sidebar_profileInfo">
                                <h3>{user.displayName}</h3>
                                <p>#{user.uid.substring(0,5)}</p>
                                <p>Click the Avatar to sign out</p>
                        </div>

                        <div className="sidebar_profileIcons">
                            <Mic/>
                            <Headset/>
                            <Settings/>
                        </div>
            </div>

        </div>
        
    );
}

export default Sidebar
