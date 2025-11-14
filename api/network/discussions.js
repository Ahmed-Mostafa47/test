// Vercel serverless function for network discussions
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { method, body, query } = req;

  try {
    if (method === 'GET') {
      // Get all discussions
      const discussions = [
        {
          id: 1,
          author: 'student_001',
          content: 'How do I approach the SQL Injection lab?',
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          acks: ['instructor_01'],
          replies: 2
        },
        {
          id: 2,
          author: 'student_002',
          content: 'Tips for network forensics challenge',
          timestamp: new Date(Date.now() - 7200000).toISOString(),
          acks: [],
          replies: 1
        }
      ];
      return res.status(200).json({ success: true, data: discussions });
    }

    if (method === 'POST') {
      // Create new discussion
      const { author, content } = body;
      if (!author || !content) {
        return res.status(400).json({ success: false, message: 'Missing required fields' });
      }
      const newDiscussion = {
        id: Date.now(),
        author,
        content,
        timestamp: new Date().toISOString(),
        acks: [],
        replies: 0
      };
      return res.status(201).json({ success: true, data: newDiscussion });
    }

    if (method === 'DELETE') {
      // Delete discussion
      const { id } = query;
      if (!id) {
        return res.status(400).json({ success: false, message: 'Discussion ID required' });
      }
      return res.status(200).json({ success: true, message: 'Discussion deleted' });
    }

    return res.status(405).json({ success: false, message: 'Method not allowed' });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
}
