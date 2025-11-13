/**
 * Vercel Serverless Function - Get Second Life Data
 * Date: 2025-11-13 13:03:43 UTC
 * Author: anyahritvikdeploy
 */

import fetch from 'node-fetch';

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { url } = req.query;

    if (!url) {
      return res.status(400).json({
        success: false,
        error: 'Missing capability URL parameter',
        timestamp: new Date().toISOString()
      });
    }

    console.log(`[${new Date().toISOString()}] Fetching from: ${url}`);

    // Fetch data from Second Life
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'User-Agent': 'Vercel-SL-Proxy/1.0'
      },
      timeout: 10000
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    console.log(`[${new Date().toISOString()}] Data fetched successfully`);

    return res.status(200).json({
      success: true,
      data: data,
      cached_at: new Date().toISOString(),
      fetched_by: 'anyahritvikdeploy'
    });

  } catch (error) {
    console.error('Error fetching SL data:', error.message);

    return res.status(500).json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
}