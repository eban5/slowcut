import React from "react";
import { Navbar, Button, Form, FormControl, Nav, NavDropdown } from "react-bootstrap";
import "./Navbar.css";
import StackIcon from "./images/StackIcon";

export const CustomNavbar = () => {
	return (
		<Navbar className="nav" variant="dark" expand="lg">
			<Navbar.Brand href="#home">
				<span className="nav_icon background-white">
					<StackIcon />
				</span>
				<span className="nav_brand">Slowcut</span>
				</Navbar.Brand>

			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="mr-auto">
					<Nav.Link href="#home">Films</Nav.Link>
					<Nav.Link href="#link">Lists</Nav.Link>
					<NavDropdown title="Members" id="basic-nav-dropdown">
						<NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
						<NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
						<NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
						<NavDropdown.Divider />
						<NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
					</NavDropdown>
				</Nav>
				<Form inline>
					<FormControl type="text" placeholder="Search" className="mr-sm-2" />
					<Button variant="outline-success">Search</Button>
				</Form>
			</Navbar.Collapse>
		</Navbar>
	);
};
