import React from "react"
import axios from 'axios';
import { Jumbotron, Button, Form, FormControl } from "react-bootstrap"

export class Extract extends React.Component {

    // File content to be displayed after
    render() {
        return (
            <>
                <Jumbotron>
                    <h4>
                        Select PDFs to be extracted:
                    </h4>

                    <Form>
                        <Form.Group>
                            <Form.Control id="selectedCollection" as="select">
                                <option>Example Collection 1</option>
                                <option>Example Collection 2</option>
                            </Form.Control>
                        </Form.Group>
                    </Form>

                </Jumbotron>
            </>
        )
    }
}