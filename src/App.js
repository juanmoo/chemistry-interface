import React from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"
import { Navbar, Nav } from "react-bootstrap";
import { Extract } from "./components/Extract";
// import { Upload } from "./components/Upload"
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="/extract">Small Molecule Extractor Demo</Navbar.Brand>
            <Nav className="mr-auto">
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
              <Extract />
            </Route>

          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
