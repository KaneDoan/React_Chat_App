import React from 'react'
import "./Login.css";
import LoginLogo from './images/GameChats.png'
import { Button } from '@material-ui/core';
import {auth, provider} from "./firebase";

function Login() {

const signIn = () =>{
    //Handle sign In with Google
    //Catch error and show message
    auth.signInWithPopup(provider).catch((error) => alert(error.message));
};
    return (
        <div className='login'>
            <div className="login_logo">
                <img src={LoginLogo} alt=""/>
            </div>

            <Button onClick={signIn}>Sign In</Button>
        </div>
    )
}

export default Login
