import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";
import Amplify from "aws-amplify";
import awsconfig from "./aws-exports";
// import { AmplifySignOut, withAuthenticator } from "@aws-amplify/ui-react";
import { Auth } from "aws-amplify";
import "bootstrap/dist/css/bootstrap.css";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

Amplify.configure(awsconfig);

// CSS

const colDismensions = {
  height: "400px",
  width: "400px",
};

function App() {
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");

  const [showCodeForm, setShowCodeForm] = useState(false);
  const [confirmCode, setConfirmCode] = useState("");

  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  const [showLoggedInButton, setShowLoggedInButton] = useState(false);

  // const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);

  useEffect(() => {
    async function checkUserAuth() {
      let user = await Auth.currentAuthenticatedUser();
      if (user) {
        setShowLoggedInButton(true);
      }
    }
    checkUserAuth();
  }, []);

  const signUpHandler = async (e) => {
    e.preventDefault();
    try {
      const { user } = await Auth.signUp({
        username: signUpEmail,
        password: signUpPassword,
      });
      console.log("Sign Up Success");
      console.log(user);
    } catch (error) {
      console.log("error signing up:", error);
    }
    console.log("Hey from sign up page");
    setShowCodeForm(true);
  };

  const confirmCodeHandler = async (e) => {
    e.preventDefault();
    try {
      await Auth.confirmSignUp(signUpEmail, confirmCode);
      console.log("confirmation works");
    } catch (error) {
      console.log("error confirming sign up:", error);
    }
  };

  const signInHandler = async (e) => {
    e.preventDefault();
    setShowLoggedInButton(true);
    try {
      const user = await Auth.signIn(signInEmail, signInPassword);
      console.log("Sign In Successful:", user);
    } catch (error) {
      console.log("error signing in:", error);
    }
  };

  const authenticateUserHandler = async (e) => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      console.log("Authentication Successful:", user);
    } catch (error) {
      console.log("User is not signed in:", error);
    }
    console.log("Hi from authenticate user button");
  };

  const signOutHandler = (e) => {
    e.preventDefault();
    console.log("Sign Out Stuff");
  };

  // change password
  // change email
  // forgot password

  return (
    <div className="App">
      <header className="App-header">
        <h2>My App Content</h2>
        <Container className="">
          <Row>
            <Col
              style={colDismensions}
              className="border d-flex align-items-center justify-content-center"
              xs={4}
            >
              {" "}
              {!showCodeForm ? (
                <Form onSubmit={signUpHandler}>
                  <h2>Sign Up</h2>
                  <Form.Group>
                    <Form.Control
                      type="email"
                      placeholder="email"
                      onChange={(e) => setSignUpEmail(e.target.value)}
                    />
                    <Form.Control
                      type="password"
                      placeholder="password"
                      onChange={(e) => setSignUpPassword(e.target.value)}
                    />
                    <Button variant="primary" type="submit">
                      Sign Up
                    </Button>
                  </Form.Group>
                </Form>
              ) : (
                <Form onSubmit={confirmCodeHandler}>
                  <h2>Confirm Email</h2>
                  <Form.Group>
                    <Form.Control
                      type="text"
                      placeholder="Confirmation Code"
                      onChange={(e) => setConfirmCode(e.target.value)}
                    />
                    <Button variant="primary" type="submit">
                      Confirm
                    </Button>
                  </Form.Group>
                </Form>
              )}
            </Col>
            <Col
              style={colDismensions}
              className="border d-flex align-items-center justify-content-center"
              xs={4}
            >
              {!showLoggedInButton ? (
                <Form onSubmit={signInHandler}>
                  <h2>Sign In</h2>
                  <Form.Group>
                    <Form.Control
                      type="email"
                      placeholder="email"
                      onChange={(e) => setSignInEmail(e.target.value)}
                    />
                    <Form.Control
                      type="password"
                      placeholder="password"
                      onChange={(e) => setSignInPassword(e.target.value)}
                    />
                    <Button variant="primary" type="submit">
                      Sign In
                    </Button>
                  </Form.Group>
                </Form>
              ) : (
                <Button variant="primary" onClick={authenticateUserHandler}>
                  Is user logged in?
                </Button>
              )}
            </Col>
            <Col
              style={colDismensions}
              className="border d-flex align-items-center justify-content-center"
              xs={4}
            >
              <Button variant="primary" onClick={signOutHandler}>
                Sign Out
              </Button>
            </Col>
          </Row>
          <Row>
            <Col
              style={colDismensions}
              className="border d-flex align-items-center justify-content-center"
              xs={4}
            >
              <h2>Change Password</h2>
            </Col>
            <Col
              style={colDismensions}
              className="border d-flex align-items-center justify-content-center"
              xs={4}
            >
              <h2>Change Email</h2>
            </Col>
            <Col
              style={colDismensions}
              className="border d-flex align-items-center justify-content-center"
              xs={4}
            >
              <h2>Forgot Password</h2>
              <Button>Forgot Password</Button>
            </Col>
          </Row>
        </Container>
      </header>
    </div>
  );
}

export default App;
