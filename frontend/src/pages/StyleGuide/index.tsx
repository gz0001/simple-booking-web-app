import React, { Component } from 'react'
import { Box, Container, Col, Row, Dialog } from 'tt-react-ui-2'
import { Link } from 'react-router-dom'
import {Button} from 'atoms/Button'
import gql from 'graphql-tag'

const query = gql`
  query Test($option: Option) {
    events(option: $option) {
      title
      date
    }
  }
`
class StyleGuide extends Component<any, any> {
  state = {
    open: false
  }

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
    const { open } = this.state
    return (
      <div className="StyleGuide page">
        <Dialog open={open} onClose={() => this.setState({ open: false })} color="white">
          <Button onClick={() => this.setState({ open: false })}>close</Button>
        </Dialog>
        <Container fluid>
          <Row>
            <Col width="3">
              <Button onClick={this.handleClick}>Style here</Button>
            </Col>
            <Col width="3">
              <Button onClick={() => this.setState({ open: true })} bg="second">
                Style here dia
              </Button>
            </Col>
            <Col width="3">
              <Button onClick={() => console.log('click')} bg="third">
                Style here
              </Button>
            </Col>
            <Col width="3">
              <Button onClick={() => console.log(this.props)} bg="fourth">
                Style here
              </Button>
            </Col>
          </Row>
          <Link to="/start">Back to start</Link>
        </Container>
      </div>
    )
  }
}

export default StyleGuide
