import type { EdgeFunction } from '@netlify/edge-functions';
import { supabase } from '../../src/lib/supabaseClient';

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

  const { error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    return new Response(error.message, { status: 500 });
  }

  const url = new URL('/admin/signin', request.url);

  return Response.redirect(url);
};

export default handler;
