/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetEvents
// ====================================================

export interface GetEvents_popularEvents {
  __typename: "Event";
  _id: string;
  title: string;
}

export interface GetEvents {
  popularEvents: GetEvents_popularEvents[] | null;
}
