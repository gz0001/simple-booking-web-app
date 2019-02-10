import gql from 'graphql-tag'


export const authQuery = gql`
  query GetAuth {
    auth @client{
      userId
      token
      isAuth
    }
  }
`

export const setAuthMutation = gql`
  mutation SetAuth($userId: String, $token: String, $isAuth: Boolean!) {
    setAuth(userId: $userId, token: $token, isAuth: $isAuth ) @client {
      userId
      token
      isAuth
    }
  }

`


export const authDefaults = {
  auth: {
    __typename: 'AuthStatus',
    userId: null,
    token: null,
    isAuth: false
  }
}

export const authResolvers = {
  setAuth: (_, { userId = null, token = null, isAuth = false }, { cache }) => {
    const auth = { userId, token, isAuth, __typename: 'AuthStatus' }
    console.log('set Auth', auth);
    cache.writeData({data: {auth}})
    return auth
  }
}
