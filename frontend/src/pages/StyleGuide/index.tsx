import React, { Component } from 'react'
import { Box, Container, Col, Row } from 'tt-react-ui-2'
import Button from 'atoms/Button'
import gql from 'graphql-tag'

const query = gql`
  query Test($option: Option) {
    events(option: $option) {
      title
      date
    }
  }
`
class StyleGuide extends Component<any,any> {
  handleClick = async () => {
    const { client } = this.props
    const option = { sort: { date: 1 }, filter: { title: { $regex: 'new event' } } }
    try {
      const result = await client.query({ query, variables: { option } })
      console.log(result.data)
    } catch (error) {
      console.log('got err: ', error)
    }
  }
  render() {
    return (
      <div className="StyleGuide page">
        <Container fluid>
          <Row>
            <Col cols="3">
              <Button onClick={this.handleClick}>Style here</Button>
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
            <Col cols="3">
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
