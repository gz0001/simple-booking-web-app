/* tslint:disable */
// This file was automatically generated and should not be edited.

import { Option } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: Test
// ====================================================

export interface Test_events {
  __typename: "Event";
  title: string;
  date: string;
}

export interface Test {
  events: Test_events[];
}

export interface TestVariables {
  option?: Option | null;
}
