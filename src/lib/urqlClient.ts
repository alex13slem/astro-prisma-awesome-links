import { Client, fetchExchange, ssrExchange } from '@urql/core';

const url =
  (import.meta.env.DEV ? 'http://localhost:8888/' : import.meta.env.SITE) +
  'api/graphql';

declare global {
  var urqlClient: undefined | Client;
}

const urqlClient =
  globalThis.urqlClient ||
  new Client({
    url,
    exchanges: [
      ssrExchange({
        isClient: false,
        staleWhileRevalidate: true,
      }),
      fetchExchange,
    ],
  });

if (import.meta.env.DEV) globalThis.urqlClient = urqlClient;

export default urqlClient;
