import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

// import { CustomNavbar as Navbar } from "./Navbar";
import { Showcase } from "./components/Showcase";
import { CustomCarousel as Carousel } from "./components/Carousel";
import StackedCards from "./components/StackedCards";
import About from "./components/About";

import "./styles/App.css";
import slowcut from "./images/slowcut.png";
import "./styles/Navbar.css";

// react-bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import {
	Navbar,
	Button,
	Form,
	FormControl,
	Nav,
	NavDropdown,
	Badge,
	Col,
	Container,
	Row,
} from "react-bootstrap";




function App() {
	return (
		<>
			{/* Background image */}
			{/* <div className="background_container">
				<div className="background-wrapper">
					<div className="background-image"></div>
					<div className="background-mask"></div>
				</div>
			</div> */}

			{/* Navbar */}
			<div className="container_navbar">
				{/* <Navbar /> */}
				<Router>
					<Navbar className="nav" variant="dark" expand="lg">
						<Navbar.Brand href="#home">
							<span className="nav_icon">
								<img src={slowcut} alt="slowcut icon" />
							</span>
							<span className="nav_brand">Slowcut</span>
						</Navbar.Brand>

						<Navbar.Toggle aria-controls="basic-navbar-nav" />
						<Navbar.Collapse id="basic-navbar-nav">
							<Nav className="mr-auto">
								<Link to="/">
									<Nav.Link className="nav_link" href="#home">
										Films
									</Nav.Link>
								</Link>
								<Link to="/">
									<Nav.Link className="nav_link" href="#link">
										Lists
									</Nav.Link>
								</Link>
								<NavDropdown
									title="Members"
									className="nav_link"
									id="basic-nav-dropdown">
									<NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
									<NavDropdown.Item href="#action/3.2">
										Another action
									</NavDropdown.Item>
									<NavDropdown.Item href="#action/3.3">
										Something
									</NavDropdown.Item>
									<NavDropdown.Divider />
									<NavDropdown.Item href="#action/3.4">
										Separated link
									</NavDropdown.Item>
								</NavDropdown>
							</Nav>
							<Form inline>
								<FormControl type="text" placeholder="Search" className="mr-sm-2" />
								<Button variant="outline-success">Search</Button>
							</Form>
						</Navbar.Collapse>
					</Navbar>

					<Switch>
						<Route path="/about">
							<About />
						</Route>
						<Route path="/users">{/* <Users /> */}</Route>
						<Route path="/">{/* <Home /> */}</Route>
					</Switch>
				</Router>
			</div>

			{/* </div> */}

			{/* Content */}
			<div className="App">
				{/* Showcase / Hero */}
				<Container>
					<Row className="justify-content-md-center">
						<Col>
							{" "}
							<div id="showcase">
								<Showcase />
							</div>
						</Col>
					</Row>
				</Container>

				{/* Carousel - Featured Movies */}
				<Container>
					<Row>
						<Col>
							<div id="carousel">
								{/* <h4 className="section_header">Popular This Week</h4> */}
								<Carousel />
							</div>
						</Col>
					</Row>
				</Container>

				{/* About - Features / Links */}
				<Container>
					<Row>
						<Col>
							<div id="about">
								<h4 className="section_header">About</h4>
								<About />
							</div>
						</Col>
					</Row>
				</Container>

				<Container>
					<Row>
						<Col sm={8}>
							{/* Popular Reviews This Week */}
							<div id="popular-reviews">
								<h4 className="section_header">Popular Reviews</h4>
								<h5>User Personface</h5>
								<p>
									Arcu purus augue euismod sociosqu justo nec vulputate, aliquet
									duis quisque felis luctus morbi ut cras, viverra leo blandit in
									rutrum aenean. Cum odio habitasse dictumst consequat vitae
									tristique varius nam ullamcorper rhoncus ultrices, integer
									conubia curae ipsum sociis sem cras vehicula erat tempus, tempor
									nibh hendrerit dignissim nunc primis neque commodo tortor
									facilisi.
								</p>
							</div>
						</Col>
						<Col sm={4}>
							{/* Find By Genre */}
							<div id="discover-genre">
								<h4 className="section_header">Discover by Genre</h4>
								<div>
									<Badge pill variant="primary">
										Action/Adventure
									</Badge>
									<Badge pill variant="secondary">
										Science Fiction
									</Badge>
									<Badge pill variant="success">
										Horror
									</Badge>
									<Badge pill variant="danger">
										Drama
									</Badge>
									<Badge pill variant="warning">
										Documentary
									</Badge>
								</div>
							</div>
						</Col>
					</Row>
				</Container>
				<Container>
					<Row>
						<Col sm={8}>
							{/* Popular Lists */}
							<div id="popular-lists">
								<h4 className="section_header">Popular Lists</h4>
								<StackedCards />
							</div>
						</Col>
						<Col sm={4}>
							{/* Popular Reviewers */}
							<div className="popular_reviewers">
								<h4 className="section_header">Popular Reviewers</h4>
								<ul>
									<li>User Personface</li>
									<li>User Personface</li>
									<li>User Personface</li>
									<li>User Personface</li>
								</ul>
							</div>
						</Col>
					</Row>
				</Container>
				<Container>
					<Row>
						<Col sm={8}></Col>
						<Col sm={4}></Col>
					</Row>
				</Container>
			</div>
			<div className="footer">{/* Footer */}</div>
		</>
	);
}

export default App;
