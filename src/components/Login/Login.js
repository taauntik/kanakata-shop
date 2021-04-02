import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import firebase from "firebase/app";
import "firebase/auth";
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";

function Login({ checkUser }) {
  let [user, setUser] = useContext(UserContext);
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };
  const history = useHistory();
  const handleGoogleSignIn = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        var { displayName, email } = result.user;
        const signedInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
        };
        setUser(signedInUser);
        history.replace(from);
        console.log(user);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
  };

  return (
    <div className="d-flex justify-content-center m-5">
      <Button onClick={handleGoogleSignIn} variant="primary">
        <h1>Sign in with google</h1>
      </Button>
    </div>
  );
}

export default Login;
