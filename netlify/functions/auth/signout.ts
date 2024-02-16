import type { EdgeFunction } from '@netlify/edge-functions';

const handler: EdgeFunction = async (request, ctx) => {
  ctx.cookies.delete('sb-access-token');
  ctx.cookies.delete('sb-refresh-token');

  const url = new URL('/', request.url);

  return Response.redirect(url);
};

export default handler;
