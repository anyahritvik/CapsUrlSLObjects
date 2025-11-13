/**
 * Vercel Serverless Function - Save Capability URL
 * Date: 2025-11-13 13:03:43 UTC
 * Author: anyahritvikdeploy
 */

// In-memory storage (for demo - use database in production)
const urlStorage = new Map();

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { url, region } = req.body;

    if (!url) {
      return res.status(400).json({
        success: false,
        error: 'Missing URL parameter'
      });
    }

    const id = Date.now().toString();
    const entry = {
      id,
      url,
      region: region || 'Unknown',
      created_at: new Date().toISOString(),
      created_by: 'anyahritvikdeploy'
    };

    urlStorage.set(id, entry);

    console.log(`[${new Date().toISOString()}] URL saved: ${id}`);

    return res.status(200).json({
      success: true,
      id,
      message: 'URL saved successfully',
      data: entry
    });

  } catch (error) {
    console.error('Error saving URL:', error);

    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
}