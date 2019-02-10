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
