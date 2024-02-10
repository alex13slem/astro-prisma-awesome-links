import { ApolloClient, InMemoryCache } from '@apollo/client/core';

const apolloClient = new ApolloClient({
  uri:
    (import.meta.env.URL || 'https://awesome-links.netlify.app') +
    '/api/graphql',
  cache: new InMemoryCache(),
});

export default apolloClient;
