import React from "react";
import { Service } from "../service/api";
import { Jumbotron, Form, Button, Alert, Card } from "react-bootstrap";

export class Extract extends React.Component {
  service = null;

  constructor() {
    super();
    this.state = { showStartSuccess: false, inputText: '', showExtraction: false, tokens: [], reactions: [] };
    this.service = new Service();
    this.createExtraction = this.createExtraction.bind(this)
  }

  createExtraction() {
    let text = this.state.inputText;

    // Show start banner
    this.setState({ showStartSuccess: true, showExtraction: false })
    setTimeout(() => {
      this.setState({ showStartSuccess: false })
    }, 2000);

    this.service.extractParagraph(text, (res) => {
      console.log(res)
      const tokens = res.data.extractions[0].tokens
      const reactions = res.data.extractions[0].reactions
      this.setState({ showExtraction: true, tokens: tokens, reactions: reactions })
      this.render()
    })
  }

  renderReaction(tokens, reaction) {
    let toks = []
    let ent = []

    for (let j = 0; j < tokens.length; j++) {
      ent.push('none')
    }

    for (let key of Object.keys(reaction)) {
      console.log(key)
      if (key === "Product") {
        const locs = reaction[key]
        const start = locs[0]
        const stop = locs[1]

        for (let j = start; j <= stop; j++) {
          ent[j] = key
        }
      } else {
        for (let j = 0; j < reaction[key].length; j++) {
          const locs = reaction[key][j]
          const start = locs[0]
          const stop = locs[1]

          for (let i = start; i <= stop; i++) {
            ent[i] = key
          }
        }
      }
    }

    console.log(reaction)

    const colorMap = {
      "none": "white",
      "Temperature": "green",
      "Solvent": "blue",
      "Yield": "orange",
      "Product": "red"
    }

    for (const [j, tok] of tokens.entries()) {
      if (ent[j] !== "none") {

        const style = {
          cursor: 'help',
          backgroundColor: 'white',
          borderColor: colorMap[ent[j]],
          borderWidth: '2px',
        }
        toks.push(<button className="btn btn-sm" data-toggle="tooltip" data-placement="top" title={ent[j]} style={style} data-original-title={ent[j]} key={j}><span>{tok}</span></button>)
      } else {
        toks.push(` ${tok} `)
      }
    }
    return <div>{toks}</div>
  }

  renterExtractions() {
    if (this.state.showExtraction) {
      return (<Card>
        <Card.Header as="h5">Extraction</Card.Header>
        <Form.Group>
          <Form.Control as="select">
            <option>Reaction 1</option>
          </Form.Control>
        </Form.Group>
        <Card.Body>
          {this.renderReaction(this.state.tokens, this.state.reactions[0])}
        </Card.Body>
      </Card>)
    } else {
      return <></>
    }
  }

  // File content to be displayed after
  render() {
    return (
      <>
        <Alert variant="success" show={this.state.showStartSuccess}>
          Extraction succesfully started! This should take up to a minute.
        </Alert>
        <Jumbotron>
          <h4>Automated Reaction Extractor</h4>

          <Form>
            <Form.Group>
              <Form.Control as="textarea" rows={5} value={this.state.inputText} onChange={(e) => this.setState({ inputText: e.target.value })} placeholder="Type or paste the reaction paragraph here"></Form.Control>
              <br />
              <Button variant="primary" onClick={this.createExtraction}>Extract</Button>
            </Form.Group>
          </Form>

          {this.renterExtractions()}
        </Jumbotron>
      </>
    );
  }
}
