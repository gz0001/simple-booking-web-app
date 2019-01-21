const { buildSchema } = require("graphql");

module.exports = buildSchema(`
  # =================== Booking Schema ===================
  type Booking {
    _id: ID!
    event: Event!
    user: User!
    status: String!
    createdAt: String!
    updatedAt: String!
  }

  # =================== User Schema ===================
  type User {
    _id: ID!
    email: String!
    password: String
    firstname: String!
    lastname: String!
    city: String!
    age: Int!
    createdEvents: [Event!]
    bookings: [Booking!]
    pic: String
  }

  input UserInput {
    email: String!
    password: String!
    firstname: String!
    lastname: String!
    city: String!
    age: Int!
    pic: String
  }

  # =================== Location Schema ===================
  type Location {
    street: String!
    city: String!
  }

  # =================== Event Schema ===================
  type Event {
    _id: ID!
    title: String!
    description: String!
    price: Float!
    date: String!
    dateEnd: String!
    creator: User!
    bookings: [Booking!]
    location: Location!
    max: Int!
    status: String!
    pics: [String]

  }

  input EventInput {
    title: String!
    description: String!
    price: Float!
    date: String!
    dateEnd: String
    street: String!
    city: String!
    max: Int!
    pics: [String]
  }

  # =================== Auth Schema ===================
  type AuthData {
    userId: ID!
    token: String!
    tokenExpiration: String!
  }

  type Verify {
    isAuth: Boolean!
  }

  # =================== Root ===================
  type RootQuery {
    events: [Event!]!
    users: [User!]
    bookings: [Booking!]!
  }

  type RootMutation {
    # Event
    createEvent(eventInput: EventInput): Event
    bookEvent(eventId: ID): Booking!

    # Booking
    cancelBooking(bookingId: ID): Event!

    # User
    createUser(userInput: UserInput): AuthData

    # Auth
    login(email: String!, password: String!): AuthData!
    verifyToken: Verify!
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }

`);
