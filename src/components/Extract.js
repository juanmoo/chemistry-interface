import React from "react";
import { Service } from "../service/api";
import { Jumbotron, Form, Button, Table, Alert } from "react-bootstrap";

export class Extract extends React.Component {
  service = null;

  constructor() {
    super();
    this.state = { collections: [], models: [], extractions: [], collectionName: "", modelName: "", showStartSuccess: false };
    this.service = new Service();

    this.service.getCollections((colls) => {
      this.setState({ collections: colls })
      if (colls.length > 0) {
        this.setState({ collectionName: colls[0].name })
      }
    });

    this.service.getModels((modelList) => {
      this.setState({ models: modelList })
      if (modelList.length > 0) {
        this.setState({ modelName: modelList[0] })
      }
    });

    this.service.getExtractionList((extractionList) => {
      this.setState({ extractions: extractionList })
      console.log(extractionList)
    })

    this.createExtraction = this.createExtraction.bind(this)
  }

  renderCollectionSelect() {
    return (
      <Form.Control id="selectedCollection" as="select" value={this.state.collectionName} onChange={(e) => {
        this.setState({ collectionName: e.target.value })
      }}>
        {this.state.collections.map((c) => {
          return <option key={c.getName()}>{c.getName()}</option>;
        })}
      </Form.Control>
    );
  }

  renderModelList() {
    return (
      <Form.Control id="selectedModel" as="select" value={this.state.modelName} onChange={(e) => {
        this.setState({ modelName: e.target.value })
      }}>
        {this.state.models.map(modelName => {
          return <option key={modelName}>{modelName}</option>
        })}
      </Form.Control>
    )
  }

  createExtraction() {
    console.log(`Selected collection: ${this.state.collectionName}`)
    console.log(`Selected model name: ${this.state.modelName}`)
    this.service.createExtraction(this.state.collectionName, this.state.modelName, () => {
      console.log('Extraction started ... ')
      this.setState({ showStartSuccess: true }, () => {
        window.setTimeout(() => {
          this.setState({ showStartSuccess: false });
        }, 2000);
      });
    })
  }

  renderTable() {
    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Creation Time</th>
            <th>Collection</th>
            <th>Model</th>
            <th>Download</th>
          </tr>
        </thead>
        <tbody>
          {this.state.extractions.map(e => {
            return (
              <tr key={`${e.getCollection()}__${e.getModel()}`}>
                <td>{e.getCreateTime()}</td>
                <td>{e.getCollection()}</td>
                <td>{e.getModel()}</td>
                <td><Button variant="secondary" onClick={() => {
                  this.service.download(e.getCollection(), e.getModel())
                }}>Download</Button></td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    );
  }

  // File content to be displayed after
  render() {
    return (
      <>
        <Alert variant="success" show={this.state.showStartSuccess}>
          Extraction succesfully started! Check back in a few minutes.
        </Alert>
        <Jumbotron>
          <h4>Initiate new extraction</h4>

          <Form>
            <Form.Group>
              <Form.Label>Select Collection</Form.Label>
              {this.renderCollectionSelect()}
              <br></br>
              <Form.Label>Select Model</Form.Label>
              {this.renderModelList()}
              <br></br>
              <Button variant="primary" onClick={this.createExtraction}>Extract</Button>
            </Form.Group>
          </Form>

          <br />
          <h4>Available Extractions</h4>
          {this.renderTable()}

        </Jumbotron>
      </>
    );
  }
}
