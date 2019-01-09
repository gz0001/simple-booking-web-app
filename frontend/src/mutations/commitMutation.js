import { commitMutation as commitMutationDefault } from "react-relay";

const commitMutationPromise = (environment, options) => {
  return new Promise((resolve, reject) => {
    commitMutationDefault(environment, {
      ...options,
      onError: err => {
        reject(err);
      },
      onCompleted: (res, err) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      }
    });
  });
};

export default commitMutationPromise;
