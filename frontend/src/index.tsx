import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import ApolloClient from 'apollo-boost'
import { ApolloProvider, Query } from 'react-apollo'
import gql from 'graphql-tag'

import '../node_modules/tt-react-ui-2/build/index.css'
import './style.css'
import App from './App'

// Client:
const client = new ApolloClient({
  request: async operation => {
    const token = localStorage.getItem('token')
    console.log('token: ', token)
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    })
  },
  clientState: {
    defaults: {
      auth: {
        userId: null,
        token: null,
        isAuth: false,
        __typename: 'AuthStatus'
      }
    },
    resolvers: {}
  }
})
//client.initQueryManager()

// Query AuthStatus:
const authStatus = gql`
  query getAuth {
    auth @client {
      userId
      token
      isAuth
    }
  }
`

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Query query={authStatus}>{({ data, client }) => <App data={data} client={client} />}</Query>
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root')
)
