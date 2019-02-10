/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: Verify
// ====================================================

export interface Verify_verifyToken {
  __typename: "AuthData";
  userId: string;
  token: string;
  tokenExpiration: string;
}

export interface Verify {
  verifyToken: Verify_verifyToken;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: Login
// ====================================================

export interface Login_login {
  __typename: "AuthData";
  userId: string;
  token: string;
  tokenExpiration: string;
}

export interface Login {
  login: Login_login;
}

export interface LoginVariables {
  email: string;
  password: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: Register
// ====================================================

export interface Register_createUser {
  __typename: "AuthData";
  userId: string;
  token: string;
  tokenExpiration: string;
}

export interface Register {
  createUser: Register_createUser | null;
}

export interface RegisterVariables {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  age: number;
  city: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetPreview
// ====================================================

export interface GetPreview_events_location {
  __typename: "Location";
  street: string;
  city: string;
}

export interface GetPreview_events_bookings_user {
  __typename: "User";
  firstname: string;
  lastname: string;
}

export interface GetPreview_events_bookings {
  __typename: "Booking";
  user: GetPreview_events_bookings_user;
}

export interface GetPreview_events {
  __typename: "Event";
  title: string;
  description: string;
  date: string;
  dateEnd: string | null;
  location: GetPreview_events_location;
  bookings: GetPreview_events_bookings[] | null;
}

export interface GetPreview_popularEvents_location {
  __typename: "Location";
  street: string;
  city: string;
}

export interface GetPreview_popularEvents_bookings_user {
  __typename: "User";
  firstname: string;
  lastname: string;
}

export interface GetPreview_popularEvents_bookings {
  __typename: "Booking";
  user: GetPreview_popularEvents_bookings_user;
}

export interface GetPreview_popularEvents {
  __typename: "Event";
  title: string;
  description: string;
  date: string;
  dateEnd: string | null;
  location: GetPreview_popularEvents_location;
  bookings: GetPreview_popularEvents_bookings[] | null;
}

export interface GetPreview {
  events: GetPreview_events[];
  popularEvents: GetPreview_popularEvents[] | null;
}

export interface GetPreviewVariables {
  option?: Option | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Bookings
// ====================================================

export interface Bookings_bookings_event {
  __typename: "Event";
  title: string;
  description: string;
}

export interface Bookings_bookings_user {
  __typename: "User";
  email: string;
}

export interface Bookings_bookings {
  __typename: "Booking";
  event: Bookings_bookings_event;
  user: Bookings_bookings_user;
}

export interface Bookings {
  bookings: Bookings_bookings[];
}

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

/* tslint:disable */
// This file was automatically generated and should not be edited.

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

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetAuth
// ====================================================

export interface GetAuth_auth {
  __typename: "AuthStatus";
  userId: string | null;
  token: string | null;
  isAuth: boolean | null;
}

export interface GetAuth {
  auth: GetAuth_auth;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SetAuth
// ====================================================

export interface SetAuth_setAuth {
  __typename: "AuthStatus";
  userId: string | null;
  token: string | null;
  isAuth: boolean | null;
}

export interface SetAuth {
  setAuth: SetAuth_setAuth | null;
}

export interface SetAuthVariables {
  userId?: string | null;
  token?: string | null;
  isAuth: boolean;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: EventPreview
// ====================================================

export interface EventPreview_location {
  __typename: "Location";
  street: string;
  city: string;
}

export interface EventPreview_bookings_user {
  __typename: "User";
  firstname: string;
  lastname: string;
}

export interface EventPreview_bookings {
  __typename: "Booking";
  user: EventPreview_bookings_user;
}

export interface EventPreview {
  __typename: "Event";
  title: string;
  description: string;
  date: string;
  dateEnd: string | null;
  location: EventPreview_location;
  bookings: EventPreview_bookings[] | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface Option {
  filter?: any | null;
  limit?: number | null;
  skip?: number | null;
  sort?: any | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
