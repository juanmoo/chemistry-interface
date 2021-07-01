import React from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"
import { Navbar, Nav } from "react-bootstrap";
import { Extract } from "./components/Extract";
import { Home } from "./components/Home"
// import { Upload } from "./components/Upload"
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="/extract">ChemRxnExtractor</Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link href="/home">Home</Nav.Link>
              <Nav.Link href="/extract">Extract Paragraph</Nav.Link>
              <Nav.Link href="/upload">Upload</Nav.Link>
            </Nav>
          </Navbar>

          <Switch>

            <Route path="/extract">
              <Extract />
            </Route>

            {/* Comment back in when document upload is implemented
            <Route path="/upload">
              <Upload />
            </Route> */}

            <Route path="/">
              <Home />
            </Route>

          </Switch>
        </div>
      </Router>

      <footer class="footer">
        <div class="container">
          <span class="footer-head">ChemRxnExtractor v0.1 @ 2021</span> &nbsp; <a href="https://accessibility.mit.edu/">Accessibility</a> <br />

          <p class="footer-info">
            Computer Science and Artificial Intelligence Laboratory <br />
            Department of Chemical Engineering <br />
            Massachusetts Institute of Technology
          </p>
        </div>
      </footer>
    </div >
  );
}

export default App;
