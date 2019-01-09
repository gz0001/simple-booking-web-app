import { Environment, Network, RecordSource, Store } from "relay-runtime";

const token = "Bearer " + localStorage.getItem("USER_TOKEN");

function fetchQuery(operation, variables) {
  return fetch("http://localhost:1234/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    },
    withCredentials: true,
    body: JSON.stringify({
      query: operation.text,
      variables
    })
  })
    .then(response => {
      return response.json();
    })
    .catch(error => {
      console.log(error);
      throw error;
    });
}

const environment = new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource())
});

export default environment;
