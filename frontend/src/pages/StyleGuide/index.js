import React, { Component } from 'react'
import { Box, Container, Col, Row } from 'tt-react-ui-2'
import Button from 'atoms/Button'

class StyleGuide extends Component {
  render() {
    return (
      <div className="StyleGuide page">
        <Container fluid>
          <Row>
            <Col>
              <Button onClick={() => console.log('click')}>Style here</Button>
            </Col>
            <Col>
              <Button onClick={() => console.log('click')} bg="second">
                Style here
              </Button>
            </Col>
            <Col>
              <Button onClick={() => console.log('click')} bg="third">
                Style here
              </Button>
            </Col>
            <Col>
              <Button onClick={() => console.log('click')} bg="success">
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
