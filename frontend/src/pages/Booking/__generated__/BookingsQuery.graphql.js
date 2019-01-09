/**
 * @flow
 * @relayHash 0d7d4ecef38b92c80f41432cf33dcedd
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type BookingsQueryVariables = {||};
export type BookingsQueryResponse = {|
  +users: ?$ReadOnlyArray<{|
    +email: string,
    +password: ?string,
  |}>
|};
export type BookingsQuery = {|
  variables: BookingsQueryVariables,
  response: BookingsQueryResponse,
|};
*/


/*
query BookingsQuery {
  users {
    email
    password
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "users",
    "storageKey": null,
    "args": null,
    "concreteType": "User",
    "plural": true,
    "selections": [
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "email",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "password",
        "args": null,
        "storageKey": null
      }
    ]
  }
];
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "BookingsQuery",
  "id": null,
  "text": "query BookingsQuery {\n  users {\n    email\n    password\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "BookingsQuery",
    "type": "RootQuery",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": v0
  },
  "operation": {
    "kind": "Operation",
    "name": "BookingsQuery",
    "argumentDefinitions": [],
    "selections": v0
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '7cccce71122fa5ec4bc76b9e5aa3e85f';
module.exports = node;
