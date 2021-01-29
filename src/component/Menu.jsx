import React from 'react';
import './Menu.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";


export default class Menu extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
		}
	}

	render() {
		return (
		  <Navbar expand="lg">
		    <Navbar.Brand>
		    	<Link to="/">
		    		<img 
	                	src="img/ecosystem-logo.jpg"
	                	alt="SECURITYMADEIN.LU Logo"
	                	style={{height: 60}}
	                />
                </Link>
		    </Navbar.Brand>
		    <Navbar.Toggle aria-controls="basic-navbar-nav" />
		    <Navbar.Collapse id="basic-navbar-nav">
			    <Nav className="mr-sm-2 ml-auto">
			      <Nav.Link>
			          <Link to="/">
			                <div className="Menu-title">Home</div>
			                <div className="Menu-description">Our main lines</div>
			          </Link>
			      </Nav.Link>
			      <Nav.Link>
			          <Link to="/ecosystem">
			                <div className="Menu-title">Ecosystem</div>
			                <div className="Menu-description">View on the community</div>
			          </Link>
			      </Nav.Link>
			      <Nav.Link>
			          <Link to="/news">
			                <div className="Menu-title">News</div>
			                <div className="Menu-description">Keep an eye out</div>
			          </Link>
			      </Nav.Link>
			      <Nav.Link>
			          <Link to="/calendar">
			                <div className="Menu-title">Calendar</div>
			                <div className="Menu-description">Cybersecurity events</div>
			          </Link>
			      </Nav.Link>
			      <NavDropdown title="Other" id="nav-dropdown">
			        <NavDropdown.Item eventKey="4.1">
			            <Link to="/job">
			                <div className="Menu-title">Job market</div>
			            </Link>
			        </NavDropdown.Item>
			        <NavDropdown.Item eventKey="4.1">
			            <Link to="/job">
			                <div className="Menu-title">Bug bounty</div>
			            </Link>
			        </NavDropdown.Item>
			        <NavDropdown.Item eventKey="4.1">
			            <Link to="/about">
			                <div className="Menu-title">About CYBERLUX</div>
			            </Link>
			        </NavDropdown.Item>
			      </NavDropdown>
			      <Nav.Link>
			          <Link to="/login">
			              <div className="Menu-title">Login</div>
			              <div className="Menu-description">Or subscribe</div>
			          </Link>
			      </Nav.Link>
			    </Nav>
		    </Navbar.Collapse>
		  </Navbar>
		)
	}
}