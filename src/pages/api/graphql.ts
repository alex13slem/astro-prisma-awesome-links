import type { APIRoute } from 'astro';
import { createYoga } from 'graphql-yoga';
import { schema } from '../../../graphql/schema';

const { handleRequest } = createYoga({
  fetchAPI: {
    Request: Request,
    Response: Response,
  },
  schema,
  graphqlEndpoint: '/api/graphql',
});

export const POST: APIRoute = async (ctx) => {
  const { request } = ctx;
  return handleRequest(request, ctx);
};

// export const GET: APIRoute = async ({ request, ...ctx }) =>
//   handleRequest(request, ctx);
