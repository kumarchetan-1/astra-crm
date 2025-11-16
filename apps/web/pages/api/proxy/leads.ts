import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
  try {
    const resp = await fetch(process.env.NEXT_PUBLIC_HTTP_BACKEND_URL || 'http://localhost:4000/api/leads');
    const json = await resp.json();
    res.status(200).json(json);
  } catch (err:any) {
    res.status(500).json({ error: err.message });
  }
}
