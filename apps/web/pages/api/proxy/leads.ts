import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
  try {
    const backendUrl = process.env.NEXT_PUBLIC_HTTP_BACKEND_URL || 'http://localhost:4000';
    const resp = await fetch(`${backendUrl}/api/leads`);
    
    if (!resp.ok) {
      console.error(`Backend returned ${resp.status}: ${resp.statusText}`);
      return res.status(200).json([]); // Return empty array instead of error
    }
    
    const json = await resp.json();
    // Ensure we always return an array
    res.status(200).json(Array.isArray(json) ? json : []);
  } catch (err:any) {
    console.error('Error fetching leads:', err);
    res.status(200).json([]); // Return empty array on error
  }
}
