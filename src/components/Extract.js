import React from "react";
import { Service } from "../service/api";
import { Jumbotron, Form, Button } from "react-bootstrap";

export class Extract extends React.Component {
  service = null;

  constructor() {
    super();
    this.state = { collections: [], models: [] };
    this.service = new Service();

    this.service.getCollections((colls) => {
      this.setState({ collections: colls })
    });

    this.service.getModels((modelList) => {
      this.setState({ models: modelList })
    });
  }

  renderCollectionSelect() {
    return (
      <Form.Control id="selectedCollection" as="select">
        {this.state.collections.map((c) => {
          return <option key={c.getName()}>{c.getName()}</option>;
        })}
      </Form.Control>
    );
  }

  renderModelList() {
    return (
      <Form.Control id="selectedModel" as="select">
        {this.state.models.map(modelName => {
          return <option key={modelName}>{modelName}</option>
        })}
      </Form.Control>
    )
  }

  // File content to be displayed after
  render() {
    return (
      <Jumbotron>
        <h4>Select PDFs to be extracted:</h4>

        <Form>
          <Form.Group>
            <Form.Label>Select Collection</Form.Label>
            {this.renderCollectionSelect()}
            <br></br>
            <Form.Label>Select Model</Form.Label>
            {this.renderModelList()}
            <br></br>
            <Button variant="primary">Extract</Button>
          </Form.Group>
        </Form>
      </Jumbotron>
    );
  }
}
