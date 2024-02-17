import type { EdgeFunction } from '@netlify/edge-functions';
import supabase from '../lib/supabaseClient';

const handler: EdgeFunction = async (request, ctx) => {
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }
  const formData = await request.formData();
  const email = formData.get('email')?.toString();
  const password = formData.get('password')?.toString();

  if (!email || !password) {
    return new Response('Email and password are required', { status: 400 });
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return new Response(error.message, { status: 500 });
  }

  const { access_token, refresh_token } = data.session;
  ctx.cookies.set('sb-access-token', access_token);
  ctx.cookies.set('sb-refresh-token', refresh_token);

  const url = new URL('/admin', request.url);
  console.log(url);

  return Response.redirect(url);
  // return new Response('Success');
};

export default handler;
