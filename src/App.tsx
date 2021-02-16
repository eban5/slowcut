import React, { useState } from 'react';
import { Switch, Route, Link } from 'react-router-dom';

import './styles/App.css';
import './styles/Navbar.css';
import slowcut from './images/slowcut.png';
import searchIcon from './images/search.png';

// react-bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Form, FormControl, Nav } from 'react-bootstrap';
import MovieDetail from './components/MovieDetail';
import CastDetail from './components/CastDetail';
import LandingPage from './components/LandingPage';
import { SearchLanding } from './components/SearchLanding';
import { Grid } from './components/Grid';

const NoMatchRoute = () => (
  <div className="not_found">
    <div className="not_found_404">404</div>
    <div className="not_found_subtitle">Page could not be found</div>
  </div>
);

function App() {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleChangeTerm = (event: any): void => {
    event.target.value !== null && setSearchTerm(event.target.value);
  };
  const handleSubmit = (event: any): void => {
    event.preventDefault();
  };

  return (
    <>
      {/* Navbar */}
      <div className="container_navbar">
        {/* <Navbar /> */}

        <Navbar className="nav" variant="dark" expand="sm">
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
              <Link to="/grid">
                <Nav.Link className="nav_link" href="#home">
                  Films
                </Nav.Link>
              </Link>
            </Nav>
            <Form inline onSubmit={handleSubmit}>
              <FormControl
                type="text"
                className="mr-sm-2 nav_search"
                value={searchTerm}
                onChange={handleChangeTerm}
              />
              <Link to={`/search/${searchTerm}`}>
                <img src={searchIcon} alt="Search" width={35} height={35} />
              </Link>
            </Form>
          </Navbar.Collapse>
        </Navbar>

        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route
            exact
            path="/search/"
            component={() => <SearchLanding keyword={''} />}
          />
          <Route
            exact
            path="/search/:searchTerm"
            component={() => <SearchLanding keyword={searchTerm} />}
          />
          <Route exact path="/movie/:imdbID" component={MovieDetail} />
          <Route exact path="/actor/:personID" component={CastDetail} />
          <Route path="/grid" component={Grid} />
          <Route exact path="/genre/:genreID" component={Grid} />
          <Route render={() => <NoMatchRoute />} />
        </Switch>
      </div>
    </>
  );
}

export default App;
