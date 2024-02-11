import { ApolloClient, InMemoryCache } from '@apollo/client/core';

// const apolloClient = new ApolloClient({
//   uri: (import.meta.env.URL || '') + '/api/graphql',
//   cache: new InMemoryCache(),
//   ssrMode: true,
// });

// export default apolloClient;

const apolloClientSingleton = () =>
  new ApolloClient({
    uri: (import.meta.env.URL || '') + '/api/graphql',
    cache: new InMemoryCache(),
    ssrMode: true,
  });

declare global {
  var apolloClient: undefined | ReturnType<typeof apolloClientSingleton>;
}

const apolloClient = globalThis.apolloClient || apolloClientSingleton();

if (process.env.NODE_ENV !== 'production')
  globalThis.apolloClient = apolloClient;

export default apolloClient;
