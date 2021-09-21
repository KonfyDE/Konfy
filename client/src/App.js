import "./App.css";
import "react-s-alert/dist/s-alert-default.css";
import "react-s-alert/dist/s-alert-css-effects/slide.css";

import React, { Component } from "react";

import Alert from "react-s-alert";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import ProfileCard from "./components/ProfileCard";
import _ from 'lodash';
import { MemoryRouter, Switch, Route } from 'react-router-dom';

import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import {Nav, Navbar, NavDropdown, MenuItem,  Tabs, ButtonToolbar, Button, Table, ButtonGroup, Row, Col, Grid, Panel, Form, FormGroup, FormControl} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import './App.css';

const Home = () => <span>Home</span>;

const About = () => <span>About</span>;

const Users = () => <span>Users</span>;


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthorized: false,
      firstName: null,
      lastName: null,
      emailAddress: null,
      profileURL: null,
      pictureURL: null,
    };
  }

  componentDidMount() {
    window.addEventListener('message', this.handlePostMessage);
  }

  handlePostMessage = (event) => {
    if (event.data.type === "profile") {
      this.updateProfile(event.data.profile);
      Alert.success(`Login successful: Welcome ${event.data.profile.localizedFirstName}`,{position:'top'});
    }
  };

  updateProfile = (profile) => {
    console.log(profile)
      this.setState({
        isAuthorized: true,
        firstName: _.get(profile,'localizedFirstName',''),
        lastName: _.get(profile,'localizedLastName',''),
        emailAddress: _.get(profile,'localizedEmailAddress',''),
        profileURL: `https://www.linkedin.com/in/${_.get(profile,'vanityName','')}`,
        pictureURL: _.get(_.last(_.get(profile,'profilePicture.displayImage~.elements','')),'identifiers[0].identifier','')
      })
  }

  requestProfile = () => {
    var oauthUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${process.env.REACT_APP_CLIENT_ID}&scope=r_liteprofile&state=123456&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}`
    var width = 450,
      height = 730,
      left = window.screen.width / 2 - width / 2,
      top = window.screen.height / 2 - height / 2;

    window.open(
      oauthUrl,
      "Linkedin",
      "menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=" +
        width +
        ", height=" +
        height +
        ", top=" +
        top +
        ", left=" +
        left
    );
  };

  render() {
    return (
      <div className="App">

  <Navbar bg="DARK" expand="lg">
  <Navbar.Brand href="#">Konfy</Navbar.Brand>
  <Navbar.Toggle aria-controls="navbarScroll" />
  <Navbar.Collapse id="navbarScroll">
    <Nav
      className="mr-auto my-2 my-lg-0"
      style={{ maxHeight: '100px' }}
      navbarScroll
    >
      <Nav.Link href="#action1">Home</Nav.Link>
      <Nav.Link href="#action2">About</Nav.Link>
      <NavDropdown title="Link" id="navbarScrollingDropdown">
        <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action5">Something else here</NavDropdown.Item>
      </NavDropdown>
      <Nav.Link href="#" disabled>
        Link
      </Nav.Link>
    </Nav>
    <Form className="d-flex">
      <FormControl
        type="search"
        placeholder="Search"
        className="mr-2"
        aria-label="Search"
      />
      <Button variant="outline-success">Search</Button>
    </Form>
  </Navbar.Collapse>
</Navbar>
        <header className="App-header">
          <h1 className="App-title">Konfy MVP</h1>
          <p className="App-intro"></p>
          <FontAwesomeIcon icon={["fab", "github"]} />{" "}
          <Alert />
        </header>
        <div className="App-body">
          <button onClick={this.requestProfile}>Linkedin Login</button>
          {this.state.isAuthorized &&
            (
              <ProfileCard
                firstName={this.state.firstName}
                lastName={this.state.lastName}
                emailAddress={this.state.emailAddress}
                profileURL={this.state.profileURL}
                pictureURL={this.state.pictureURL}
              />
            )}
        </div>
      </div>
    );
  }
}

export default App;
