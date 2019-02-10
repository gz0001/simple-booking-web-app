module.exports = {
  client: {
    service: {
      name: 'my-service-name',
      url: 'http://192.168.99.100:1234/graphql',
      includes: ['./src/**/*.tsx'],
      excludes: ['**/__tests__/**']
    }
  }
}
