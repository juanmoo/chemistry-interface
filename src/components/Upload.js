import React, { useState } from "react";
import { Table, Modal, Alert } from "react-bootstrap";
import axios from "axios";

import { Jumbotron, Button, Form, FormControl } from "react-bootstrap";

const base_url = "http://rosetta6.csail.mit.edu:5000";

export class Upload extends React.Component {
  // General Form State
  state = {
    collectionName: "",
    selectedFiles: null,
    showModal: false,
    showUploadSuccess: false,
    showUploadError: false,
    shouldReloadTable: true,
    collectionList: [],
  };

  handleClose = () => {
    this.setState({ showModal: false });
  };

  handleShow = () => {
    this.setState({ showModal: true });
  };

  /////////////////// Load Available Collections ///////////////////

  getCollectionList = () => {
    const list_url = base_url + "/list";
    axios.get(list_url).then((res) => {
      let collectionList = [];
      res.data.collections.forEach((e) => {
        collectionList.push({
          collectionName: e.collection_name,
          documentCount: e.collection_size,
        });
      });

      this.setState({
        collectionList: collectionList,
      });

      console.log(this.state.collectionList);
    });
  };

  /////////////////////////// File Upload //////////////////////////////////

  // On file select (from the pop up)
  onFileChange = (event) => {
    // Update the state
    this.setState({ selectedFiles: event.target.files });
  };

  // On file upload (click the upload button)
  onFileUpload = () => {
    // Create an object of formData
    const formData = new FormData();

    // Update the formData object

    for (var i = 0; i < this.state.selectedFiles.length; i++) {
      let file = this.state.selectedFiles[i];
      let fileName = "file_" + String(i);
      formData.append(fileName, file, file.name);
    }

    formData.append("collectionName", this.state.collectionName);

    // Request made to the backend api
    // Send formData object
    const api_endpoint = base_url + "/upload";

    axios.post(api_endpoint, formData).then((res) => {
      if (res.status == 200) {
        // banner to say it was succesfully uploaded
        this.setState({ showUploadSuccess: true }, () => {
          window.setTimeout(() => {
            this.setState({ showUploadSuccess: false });
          }, 2000);
        });
      } else {
        // banner to announce failure
        this.setState({ showUploadError: true }, () => {
          window.setTimeout(() => {
            this.setState({ showUploadError: false });
          }, 2000);
        });
      }
      this.handleClose();
    });
  };

  handleSubmit = () => {
    return false;
  };

  // File content to be displayed after
  // file upload is complete
  fileData = () => {
    if (this.state.selectedFile) {
      return (
        <div>
          <h2>File Details:</h2>

          <p>File Name: {this.state.selectedFile.name}</p>

          <p>File Type: {this.state.selectedFile.type}</p>

          <p>
            Last Modified:{" "}
            {this.state.selectedFile.lastModifiedDate.toDateString()}
          </p>
        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h4>Choose before Pressing the Upload button</h4>
        </div>
      );
    }
  };
  ////////////////////////////////////////////////////////////////////////////////////////

  renderTable() {
    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Collection Name</th>
            <th>Number of documents</th>
          </tr>
        </thead>
        <tbody>
          {this.state.collectionList.map((e) => {
            return (
              <tr>
                <td>{e.collectionName}</td>
                <td>{e.documentCount}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    );
  }

  render() {
      
    if (this.state.shouldReloadTable) {
      this.getCollectionList();
      this.setState({ shouldReloadTable: false });
    }

    return (
      <>
        <Alert variant="success" show={this.state.showUploadSuccess}>
          Collection was succesfully uploaded!
        </Alert>
        <Alert variant="danger" show={this.state.showUploadError}>
          Collection was succesfully uploaded!
        </Alert>

        <Jumbotron>
          <Modal
            show={this.state.showModal}
            onHide={this.handleClose}
            animation={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>New Collection</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={this.handleSubmit}>
                <Form.Group>
                  <Form.Label>Collection Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="e.g. Pilot Documents"
                    value={this.state.collectionName}
                    onChange={(e) =>
                      this.setState({ collectionName: e.target.value })
                    }
                  ></Form.Control>
                  <br />
                  <Form.Label>Select Collection Files</Form.Label>

                  <Form.File
                    id="uploadedFiles"
                    onChange={this.onFileChange}
                    multiple
                  />

                  <br />
                  <Button variant="primary" onClick={this.onFileUpload}>
                    Submit
                  </Button>
                </Form.Group>
              </Form>
            </Modal.Body>
          </Modal>

          <h4>Available Collections</h4>
          {this.renderTable()}

          <Button variant="primary" onClick={this.handleShow}>
            Upload new collection
          </Button>
        </Jumbotron>
      </>
    );
  }
}
