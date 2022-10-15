import React, { useState } from 'react';
import { getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import app from '../firebase/firebase.init';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

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

  const handleGithubSignIn = () => {
    signInWithPopup(auth, githubProvider)
      .then(result => {
        const user = result.user;
        console.log(user);
        setUser(user);
      })
      .catch(error => {
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
        <div className='w-25 mx-auto mt-5 border p-4 rounded'>
          <h2 className='text-primary'>Want to sign out</h2>
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
        :
        <div className='w-25 mx-auto mt-5 border p-4 rounded'>
          <h2 className='text-primary'>Please Log In</h2>
          <div>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
              <Button className='w-100' variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </div>
          <div className='w-100 mt-3'>
            <button className='w-100 my-1 btn btn-danger' onClick={handleGoogleSignIn}>Sign In With Google</button>
            <button className='w-100 my-1 btn btn-dark' onClick={handleGithubSignIn}>Sign In With Github</button>
          </div>
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