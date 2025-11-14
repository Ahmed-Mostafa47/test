// Vercel serverless function for acknowledgments
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
      // Get acknowledgments for content
      const { contentId, contentType } = query;
      const acks = [
        {
          id: 1,
          contentId: contentId || 1,
          contentType: contentType || 'discussion',
          users: ['instructor_01', 'student_002'],
          count: 2
        }
      ];
      return res.status(200).json({ success: true, data: acks });
    }

    if (method === 'POST') {
      // Add acknowledgment
      const { contentId, contentType, userId } = body;
      if (!contentId || !userId) {
        return res.status(400).json({ success: false, message: 'Missing required fields' });
      }
      return res.status(201).json({
        success: true,
        data: { contentId, contentType, userId, timestamp: new Date().toISOString() }
      });
    }

    if (method === 'DELETE') {
      // Remove acknowledgment
      const { contentId, userId } = query;
      if (!contentId || !userId) {
        return res.status(400).json({ success: false, message: 'Missing parameters' });
      }
      return res.status(200).json({ success: true, message: 'Acknowledgment removed' });
    }

    return res.status(405).json({ success: false, message: 'Method not allowed' });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
}
