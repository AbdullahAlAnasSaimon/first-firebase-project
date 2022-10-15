import React, { useState } from 'react';
import { getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import app from '../firebase/firebase.init';

const auth = getAuth(app);

const Login = () => {
  const [user, setUser] = useState({});
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then(result => {
        const user = result.user;
        console.log(user);
        setUser(user);
      })
      .catch(error => {
        console.error('Error', error);
      })
  }

  const handleGithubSignIn = () =>{
    signInWithPopup(auth, githubProvider)
    .then(result =>{
      const user = result.user;
      console.log(user);
      setUser(user);
    })
    .catch(error =>{
      console.error(error);
    })
  }

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser({})
      })
      .catch(error => {
        console.error(error);
      })
  }

  return (
    <div>
      {user.uid ?
        <div>
          <h2>Want to sign out</h2>
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
        :
        <div>
          <h2>Please Log In</h2>
          <button onClick={handleGoogleSignIn}>Sign In With Google</button>
          <button onClick={handleGithubSignIn}>Sign In With Github</button>
        </div>
      }

      {user.uid &&
        <div>
          <h2>Name: {user.displayName}</h2>
          <p>Email: {user.email}</p>
          <img src={user.photoURL} alt="" />
        </div>
      }
    </div>
  );
};

export default Login;