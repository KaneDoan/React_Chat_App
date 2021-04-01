import React, {useEffect,useState} from 'react';
import './App.css';
import Sidebar from './Sidebar';
import Chat from './Chat';
import Login from './Login'
import { useSelector, useDispatch } from 'react-redux';
import {selectUser} from "./features/userSlice";
import { auth } from './firebase';
import{login, logout} from './features/userSlice';

function App() {
  //pass the user state
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect (()=>{
    auth.onAuthStateChanged((authUser)=>{
      if (authUser) {
        //if the user logged in
        //dispatch login action
        dispatch(
          login({
          uid:  authUser.uid,
          photo: authUser.photoURL,
          email: authUser.email,
          displayName: authUser.displayName,
        }))
      } else {
        //if the user logged out
        //dispath logout action
        dispatch(logout());
      }
    });
  },[dispatch]);

  return (    
    <div className="App">
    {/* Only render app if user logged in*/}
    {user?(
      <>
        <Sidebar />
        <Chat/>
      </>  
    ):(
      <Login/>
    )}

    </div>
  );
}

export default App;
