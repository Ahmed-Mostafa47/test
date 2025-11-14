// Vercel serverless function for responses/replies
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
      // Get responses for a discussion
      const { discussionId } = query;
      const responses = [
        {
          id: 1,
          discussionId: discussionId || 1,
          author: 'instructor_01',
          content: 'Start with understanding the vulnerability first.',
          timestamp: new Date(Date.now() - 1800000).toISOString(),
          acks: ['student_001']
        }
      ];
      return res.status(200).json({ success: true, data: responses });
    }

    if (method === 'POST') {
      // Add new response
      const { discussionId, author, content } = body;
      if (!discussionId || !author || !content) {
        return res.status(400).json({ success: false, message: 'Missing required fields' });
      }
      const newResponse = {
        id: Date.now(),
        discussionId,
        author,
        content,
        timestamp: new Date().toISOString(),
        acks: []
      };
      return res.status(201).json({ success: true, data: newResponse });
    }

    if (method === 'DELETE') {
      // Delete response
      const { id } = query;
      if (!id) {
        return res.status(400).json({ success: false, message: 'Response ID required' });
      }
      return res.status(200).json({ success: true, message: 'Response deleted' });
    }

    return res.status(405).json({ success: false, message: 'Method not allowed' });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
}
