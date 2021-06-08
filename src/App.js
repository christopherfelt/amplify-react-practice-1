import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";
import Amplify from "aws-amplify";
import awsconfig from "./aws-exports";
// import { AmplifySignOut, withAuthenticator } from "@aws-amplify/ui-react";
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

  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  const signUpHandler = (e) => {
    e.preventDefault();
    console.log("Sign Up Stuff", signUpEmail, signUpPassword);
  };

  const signInHandler = (e) => {
    e.preventDefault();
    console.log("Sign In Stuff", signInEmail, signInPassword);
  };

  const signOutHandler = (e) => {
    e.preventDefault();
    console.log("Sign Out Stuff");
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2>My App Content</h2>
        <Container className="d-flex justify-content-center">
          <Row>
            <Col
              style={colDismensions}
              className="border d-flex align-items-center justify-content-center"
              xs={4}
            >
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
            </Col>
            <Col
              style={colDismensions}
              className="border d-flex align-items-center justify-content-center"
              xs={4}
            >
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
        </Container>
      </header>
    </div>
  );
}

export default App;
