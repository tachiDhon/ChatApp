import React from 'react';
import { Button } from '@material-ui/core';
import './Login.css'; 
import { auth, provider } from './firebase';

function Login() {

   const signIn = () => {
      auth
      .signInWithPopup(provider)
      .then(result => console.log(result))
      .catch(error => alert(error.message));
   };

   return (
      <div className="login">
         <div className="login_container">
            <img src="https://cdn.dribbble.com/users/6469950/screenshots/14678612/media/a98d5d17a1d319928a52f78cbee54cd7.png?compress=1&resize=200x200" alt="logo"/>

            <div className="login_text">
               <h1>Sign in to MyChat</h1>
            </div>
            
            <Button onClick={signIn}>
               Google Connect
            </Button>
         </div>
      </div>
   )
}

export default Login