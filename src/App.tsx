import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import "./styles/App.css";
import "./styles/Navbar.css";
import slowcut from "./images/slowcut.png";

// react-bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Button, Form, FormControl, Nav, NavDropdown } from "react-bootstrap";
import MovieDetail from "./components/MovieDetail";
import LandingPage from "./components/LandingPage";
import { SearchLanding } from "./components/SearchLanding";
import { getRandomItem } from "./utils/array";
import { randomSearchTerms } from "./data/lists";

const NoMatchRoute = () => <div>404 Page</div>;

function App() {
	return (
		<>
			{/* Navbar */}
			<div className="container_navbar">
				{/* <Navbar /> */}

				<Navbar className="nav" variant="dark" expand="lg">
					<Link to="/">
						<Navbar.Brand href="#home">
							<span className="nav_icon">
								<img src={slowcut} alt="slowcut icon" />
							</span>
							<span className="nav_brand">Slowcut</span>
						</Navbar.Brand>
					</Link>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="mr-auto">
							{/* <Link to="/"> */}
							<Nav.Link className="nav_link" href="#home">
								Films
							</Nav.Link>
							{/* </Link> */}
							{/* <Link to="/"> */}
							<Nav.Link className="nav_link" href="#link">
								Lists
							</Nav.Link>
							{/* </Link> */}
							<NavDropdown
								title="Members"
								className="nav_link"
								id="basic-nav-dropdown">
								<NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
								<NavDropdown.Item href="#action/3.2">
									Another action
								</NavDropdown.Item>
								<NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
								<NavDropdown.Divider />
								<NavDropdown.Item href="#action/3.4">
									Separated link
								</NavDropdown.Item>
							</NavDropdown>
						</Nav>
						<Form inline>
							<FormControl type="text" className="mr-sm-2 nav_search" />
							<Link to="/search">
								<Button variant="outline-success">Search</Button>
							</Link>
						</Form>
					</Navbar.Collapse>
				</Navbar>

				<Switch>
					<Route exact path="/" component={LandingPage} />
					<Route
						exact
						path="/search"
						component={() => (
							<SearchLanding keyword={getRandomItem(randomSearchTerms)} />
						)}
					/>
					<Route path="/movie/:imdbID" component={MovieDetail} />
				</Switch>
			</div>
		</>
	);
}

export default App;
