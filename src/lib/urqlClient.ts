import { Client, cacheExchange, fetchExchange, ssrExchange } from '@urql/core';

declare global {
  var urqlClient: undefined | Client;
}

const url =
  (import.meta.env.DEV ? 'http://localhost:8888/' : import.meta.env.SITE) +
  'api/graphql';

const isClient = import.meta.env.SSR === false;

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

interface Edge<T> {
  cursor: string;
  node: T;
}

interface PageInfo {
  startCursor: string;
  endCursor: string;
  hasPrevPage: boolean;
  hasNextPage: boolean;
}

export interface Page<T> {
  pageInfo: PageInfo;
  edges: Edge<T>[];
}
