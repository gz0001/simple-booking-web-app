import React, { Component } from 'react'
import { Box, Container, Col, Row } from 'tt-react-ui-2'
import Button from 'atoms/Button'

class StyleGuide extends Component {
  render() {
    return (
      <div className="StyleGuide page">
        <Container fluid>
          <Row>
            <Col cols="3">
              <Button onClick={() => console.log('click')}>Style here</Button>
            </Col>
            <Col cols="3">
              <Button onClick={() => console.log('click')} bg="second">
                Style here
              </Button>
            </Col>
            <Col cols="3">
              <Button onClick={() => console.log('click')} bg="third">
                Style here
              </Button>
            </Col>
            <Col cols="6">
              <Button onClick={() => console.log('click')} bg="fourth">
                Style here
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default StyleGuide
