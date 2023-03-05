import type { RequestHandler } from '@sveltejs/kit';

export const GET = (async ({ params }) => {
  const fileName = encodeURIComponent(params.file_name!);

  const requestInit: RequestInit = {
    headers: {
      Authorization: 'Basic Z3Vlc3Q6Z3Vlc3Q='
    }
  };

  const url = `http://localhost:15672/api/trace-files/${fileName}`;

  const result = await fetch(url, requestInit);
  const text = await result.text();

  return new Response(text);
}) satisfies RequestHandler;