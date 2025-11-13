/**
 * Vercel Serverless Function - Get Saved URLs
 * Date: 2025-11-13 13:03:43 UTC
 * Author: anyahritvikdeploy
 */

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Return demo URLs (in production, fetch from database)
    const urls = [
      {
        id: '1',
        region: 'Brunswick',
        url: 'http://simhost-0cd13d7854e3507fc.agni.secondlife.io:12046/cap/9e6aa33c-ef65-2bee-3fdb-ba4df4ba162f',
        created_at: '2025-11-13T13:03:43Z',
        created_by: 'anyahritvikdeploy'
      }
    ];

    return res.status(200).json({
      success: true,
      urls,
      count: urls.length,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error getting URLs:', error);

    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
}