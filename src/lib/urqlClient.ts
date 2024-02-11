import { Client, cacheExchange, fetchExchange } from '@urql/core';

// const url = import.meta.env.SITE + '/api/graphql';
const url =
  (import.meta.env.DEV ? 'http://localhost:8888' : import.meta.env.SITE) +
  '/api/graphql';

declare global {
  var urqlClient: undefined | Client;
}

const urqlClient =
  globalThis.urqlClient ||
  new Client({
    url,
    exchanges: [cacheExchange, fetchExchange],
  });

if (import.meta.env.DEV) globalThis.urqlClient = urqlClient;

export default urqlClient;
