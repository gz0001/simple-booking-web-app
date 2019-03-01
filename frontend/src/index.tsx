import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import ApolloClient from 'apollo-boost'
import { ApolloProvider, Query } from 'react-apollo'

// Styles:
import '../node_modules/slick-carousel/slick/slick.css'
import '../node_modules/slick-carousel/slick/slick-theme.css'
import '../node_modules/tt-react-ui-2/build/index.css'
import './style.css'

// App:
import App from './App'

// State Resolvers:
import { defaults, resolvers } from 'resolvers'

// Client State gql:
import { authQuery, setAuthMutation } from 'resolvers/authResolver'

// Client:
const client = new ApolloClient({
  request: async operation => {
    const token = localStorage.getItem('token')
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    })
  },
  clientState: {
    defaults,
    resolvers
  },
  onError: ({ networkError, graphQLErrors, operation, forward, response }) => {
    networkError && console.log(networkError)
    if (graphQLErrors) {
      for (const error of graphQLErrors) {
        console.log(graphQLErrors)
        // @ts-ignore
        if (error.code && error.code === 401) {
          // reset auth status to false
          client.mutate({
            mutation: setAuthMutation,
            variables: { userId: null, token: null, isAuth: false }
          })
        }
      }
    }
  }
})
client.initQueryManager()

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Query query={authQuery}>{({ data, client }) => <App data={data} client={client} />}</Query>
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root')
)
