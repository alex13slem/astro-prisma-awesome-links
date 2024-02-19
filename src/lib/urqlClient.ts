import { Client, cacheExchange, fetchExchange, ssrExchange } from '@urql/core';

declare global {
  var urqlClient: undefined | Client;
}

const url =
  (import.meta.env.DEV ? 'http://localhost:4321/' : import.meta.env.SITE) +
  'api/graphql';

export const isClient = import.meta.env.SSR === false;

const urqlClient =
  globalThis.urqlClient ||
  new Client({
    url,
    exchanges: [
      cacheExchange,
      ssrExchange({
        isClient,
        staleWhileRevalidate: true,
      }),
      fetchExchange,
    ],
  });

if (import.meta.env.DEV) globalThis.urqlClient = urqlClient;

export default urqlClient;
