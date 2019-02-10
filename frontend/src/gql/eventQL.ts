import gql from 'graphql-tag'

const previewFragment = gql`
  fragment EventPreview on Event {
    title
    description
    date
    dateEnd
    location {
      street
      city
    }
    bookings(option: { filter: { status: "booked" } }) {
      user {
        firstname
        lastname
      }
    }
  }
`

export const previewQuery = gql`
  query GetPreview($option: Option) {
    events(option: $option) {
      ...EventPreview
    }

    popularEvents {
      ...EventPreview
    }
  }
  ${previewFragment}
`

export const setEventOption = (filter, sort, limit = 0, skip = 0) => {
  const option = {
    filter: {
      creator: { $ne: localStorage.getItem('userId') },
      date: { $gt: new Date() },
      ...filter
    },
    limit,
    skip,
    sort: sort ? sort : { date: -1 }
  }
  return option
}

