const { buildSchema } = require("graphql");

module.exports = buildSchema(`

  type Booking {
    _id: ID!
    event: Event!
    user: User!
    createdAt: String!
    updatedAt: String!

  }

  type User {
    _id: ID!
    email: String!
    password: String
    name: String!
    age: Int!
    createdEvents: [Event!]
  }

  input UserInput {
    email: String!
    password: String!
    name: String!
    age: Int!
  }


  type Event {
    _id: ID!
    title: String!
    description: String!
    price: Float!
    date: String!
    creator: User!
  }

  input EventInput {
    title: String!
    description: String!
    price: Float!
    date: String!
  }

  type AuthData {
    userId: ID!
    token: String!
    tokenExpiration: Int!
  }

  type Verify {
    isAuth: Boolean!
  }

  type RootQuery {
    events: [Event!]!
    users: [User!]
    bookings: [Booking!]!
  }

  type RootMutation {
    createEvent(eventInput: EventInput): Event
    createUser(userInput: UserInput): AuthData
    bookEvent(eventId: ID): Booking!
    cancelBooking(bookingId: ID): Event!
    login(email: String!, password: String!): AuthData!
    verifyToken: Verify!
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }

`);
