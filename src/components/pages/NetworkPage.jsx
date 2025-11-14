import React, { useState, useEffect } from 'react';
import { MessageCircle, Send, ThumbsUp, Reply, Trash2 } from 'lucide-react';

const NetworkPage = ({ currentUser }) => {
  const [discussions, setDiscussions] = useState([]);
  const [newDiscussion, setNewDiscussion] = useState('');
  const [replies, setReplies] = useState({});
  const [replyText, setReplyText] = useState({});
  const [ackUsers, setAckUsers] = useState({});

  useEffect(() => {
    fetchDiscussions();
  }, []);

  const fetchDiscussions = async () => {
    // Mock data - replace with API call
    setDiscussions([
      {
        id: 1,
        author: 'student_001',
        content: 'How do I approach the SQL Injection lab?',
        timestamp: new Date(Date.now() - 3600000),
        acks: ['instructor_01', 'student_002'],
        replies: 2
      },
      {
        id: 2,
        author: 'student_002',
        content: 'Regarding the network forensics challenge...',
        timestamp: new Date(Date.now() - 7200000),
        acks: ['student_001'],
        replies: 1
      }
    ]);
  };

  const handlePostDiscussion = async () => {
    if (newDiscussion.trim()) {
      const discussion = {
        id: discussions.length + 1,
        author: currentUser?.username || 'Anonymous',
        content: newDiscussion,
        timestamp: new Date(),
        acks: [],
        replies: 0
      };
      setDiscussions([discussion, ...discussions]);
      setNewDiscussion('');
    }
  };

  const handleAck = (discussionId) => {
    const key = `discussion_${discussionId}`;
    const current = ackUsers[key] || [];
    const userName = currentUser?.username || 'user';
    if (current.includes(userName)) {
      setAckUsers({
        ...ackUsers,
        [key]: current.filter(u => u !== userName)
      });
    } else {
      setAckUsers({
        ...ackUsers,
        [key]: [...current, userName]
      });
    }
  };

  const handleReply = async (discussionId) => {
    const text = replyText[discussionId];
    if (text?.trim()) {
      setDiscussions(discussions.map(d =>
        d.id === discussionId
          ? { ...d, replies: d.replies + 1 }
          : d
      ));
      setReplyText({ ...replyText, [discussionId]: '' });
    }
  };

  const handleDeleteDiscussion = (discussionId) => {
    setDiscussions(discussions.filter(d => d.id !== discussionId));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-2">
            <MessageCircle className="w-8 h-8 text-purple-400" />
            <h1 className="text-4xl font-bold text-purple-400 font-mono">NETWORK_FORUM</h1>
          </div>
          <p className="text-gray-400 font-mono">Collaborate, discuss, and acknowledge insights</p>
        </div>

        {/* New Discussion */}
        <div className="bg-gray-800/50 border border-purple-500/20 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-mono text-purple-400 mb-4">START_DISCUSSION</h2>
          <textarea
            value={newDiscussion}
            onChange={(e) => setNewDiscussion(e.target.value)}
            placeholder="Share your thoughts or ask a question..."
            className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white font-mono placeholder-gray-500 focus:border-purple-500 outline-none mb-4"
            rows="3"
          />
          <button
            onClick={handlePostDiscussion}
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-lg font-mono transition"
          >
            <Send className="w-4 h-4" />
            POST
          </button>
        </div>

        {/* Discussions */}
        <div className="space-y-6">
          {discussions.map(discussion => (
            <div key={discussion.id} className="bg-gray-800/50 border border-purple-500/20 rounded-lg p-6">
              {/* Discussion Header */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="font-mono text-sm text-purple-400">@{discussion.author}</p>
                  <p className="text-gray-400 text-xs">
                    {discussion.timestamp.toLocaleString()}
                  </p>
                </div>
                {currentUser?.username === discussion.author && (
                  <button
                    onClick={() => handleDeleteDiscussion(discussion.id)}
                    className="text-red-400 hover:text-red-300 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Discussion Content */}
              <p className="text-gray-200 mb-4 font-mono">{discussion.content}</p>

              {/* Discussion Actions */}
              <div className="flex gap-4 mb-4 text-sm">
                <button
                  onClick={() => handleAck(discussion.id)}
                  className={`flex items-center gap-1 px-3 py-1 rounded transition ${
                    (ackUsers[`discussion_${discussion.id}`] || []).includes(currentUser?.username)
                      ? 'bg-purple-500/30 text-purple-300'
                      : 'bg-gray-700/50 text-gray-400 hover:bg-gray-600/50'
                  }`}
                >
                  <ThumbsUp className="w-3 h-3" />
                  ACK ({discussion.acks.length})
                </button>
                <span className="text-gray-400 flex items-center gap-1">
                  <MessageCircle className="w-3 h-3" />
                  {discussion.replies} replies
                </span>
              </div>

              {/* Replies Section */}
              <div className="bg-gray-900/50 rounded-lg p-4 mt-4">
                <div className="flex gap-3 mb-4">
                  <input
                    type="text"
                    value={replyText[discussion.id] || ''}
                    onChange={(e) => setReplyText({ ...replyText, [discussion.id]: e.target.value })}
                    placeholder="Add a response..."
                    className="flex-1 bg-gray-700/50 border border-gray-600 rounded px-3 py-2 text-white font-mono placeholder-gray-500 focus:border-purple-500 outline-none text-sm"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleReply(discussion.id);
                      }
                    }}
                  />
                  <button
                    onClick={() => handleReply(discussion.id)}
                    className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded font-mono text-sm transition flex items-center gap-1"
                  >
                    <Reply className="w-3 h-3" />
                    RESPOND
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {discussions.length === 0 && (
          <div className="text-center text-gray-400 font-mono py-12">
            <p>NO_DISCUSSIONS_YET</p>
            <p className="text-sm mt-2">Be the first to start a conversation</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NetworkPage;
