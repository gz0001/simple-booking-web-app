import commitMutation from "./commitMutation";
import graphql from "babel-plugin-relay/macro";

const mutation = graphql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      userId
      token
      tokenExpiration
    }
  }
`;

function commit(environment, email, password) {
  return commitMutation(environment, {
    mutation,
    variables: { email, password }
  });
}

export default { commit };
