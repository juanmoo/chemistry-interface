import React from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"
import { Navbar, Nav } from "react-bootstrap";
import { Home } from "./components/Home";
import { Extract } from "./components/Extract";
import { Annotate } from "./components/Annotate";
import { Upload } from "./components/Upload"
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="/extract">Takeda Portal</Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link href="/upload">Upload</Nav.Link>
              <Nav.Link href="/extract">Extract</Nav.Link>
              <Nav.Link href="/annotate">Annotate</Nav.Link>
            </Nav>
          </Navbar>

          <Switch>

            <Route path="/annotate">
              <Annotate />
            </Route>

            <Route path="/extract">
              <Extract />
            </Route>

            <Route path="/upload">
              <Upload />
            </Route>

            <Route path="/">
              <Home />
            </Route>

          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
