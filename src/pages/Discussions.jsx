import React, { useState, useEffect } from 'react';
import { MessageCircle, ThumbsUp, Award, Send, Plus } from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import AIDiscussionModal from '../components/AIDiscussionModal';

const Discussions = () => {
  const { user, isAuthenticated, updateDebatePoints } = useUser();
  const [discussions, setDiscussions] = useState([]);
  const [selectedDiscussion, setSelectedDiscussion] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [showNewTopicModal, setShowNewTopicModal] = useState(false);
  const [loading, setLoading] = useState(false);

  // Mock discussions data
  useEffect(() => {
    const mockDiscussions = [
      {
        id: 1,
        title: 'NBA Finals Predictions 2024',
        topic: 'Who will win the championship?',
        sportEvent: 'NBA Finals 2024',
        posts: [
          {
            id: 1,
            username: 'BasketballPro',
            content: 'I think the Lakers have a strong chance this year with their improved defense.',
            timestamp: '2 hours ago',
            likes: 12,
            debatePoints: 15
          },
          {
            id: 2,
            username: 'SportAnalyst',
            content: 'The analytics show that the Celtics have better efficiency metrics across the board.',
            timestamp: '1 hour ago',
            likes: 8,
            debatePoints: 20
          }
        ],
        totalPosts: 23,
        debatePointsAwarded: 340
      },
      {
        id: 2,
        title: 'NFL Draft Analysis',
        topic: 'Best picks for the upcoming season',
        sportEvent: 'NFL Draft 2024',
        posts: [
          {
            id: 3,
            username: 'DraftExpert',
            content: 'The quarterback class this year is exceptional. Three potential franchise players.',
            timestamp: '3 hours ago',
            likes: 15,
            debatePoints: 25
          }
        ],
        totalPosts: 18,
        debatePointsAwarded: 280
      },
      {
        id: 3,
        title: 'Soccer World Cup Odds',
        topic: 'Which team has the best odds?',
        sportEvent: 'FIFA World Cup 2026',
        posts: [
          {
            id: 4,
            username: 'SoccerFan',
            content: 'Brazil always performs well in World Cups, but France has been dominant recently.',
            timestamp: '4 hours ago',
            likes: 10,
            debatePoints: 18
          }
        ],
        totalPosts: 31,
        debatePointsAwarded: 450
      }
    ];
    setDiscussions(mockDiscussions);
  }, []);

  const handlePostMessage = async () => {
    if (!newMessage.trim() || !isAuthenticated || !selectedDiscussion) return;

    setLoading(true);
    
    // Simulate AI moderation and response
    setTimeout(() => {
      const newPost = {
        id: Date.now(),
        username: user.username,
        content: newMessage,
        timestamp: 'Just now',
        likes: 0,
        debatePoints: Math.floor(Math.random() * 20) + 5
      };

      const updatedDiscussions = discussions.map(disc => {
        if (disc.id === selectedDiscussion.id) {
          return {
            ...disc,
            posts: [...disc.posts, newPost],
            totalPosts: disc.totalPosts + 1
          };
        }
        return disc;
      });

      setDiscussions(updatedDiscussions);
      setSelectedDiscussion({
        ...selectedDiscussion,
        posts: [...selectedDiscussion.posts, newPost]
      });

      // Award debate points
      updateDebatePoints(newPost.debatePoints);
      setNewMessage('');
      setLoading(false);
    }, 1500);
  };

  const handleLikePost = (postId) => {
    if (!isAuthenticated) return;

    const updatedDiscussion = {
      ...selectedDiscussion,
      posts: selectedDiscussion.posts.map(post => {
        if (post.id === postId) {
          return { ...post, likes: post.likes + 1 };
        }
        return post;
      })
    };

    setSelectedDiscussion(updatedDiscussion);
    
    // Update in discussions list
    const updatedDiscussions = discussions.map(disc => {
      if (disc.id === selectedDiscussion.id) {
        return updatedDiscussion;
      }
      return disc;
    });
    setDiscussions(updatedDiscussions);

    // Award 1 point for engagement
    updateDebatePoints(1);
  };

  if (!isAuthenticated) {
    return (
      <div className="container py-20">
        <div className="text-center">
          <MessageCircle size={64} className="mx-auto mb-6 text-gray-400" />
          <h2 className="text-2xl font-bold mb-4">Join the Discussion</h2>
          <p className="text-gray-600 mb-8">
            Login to participate in AI-moderated sports discussions and earn Debate Points
          </p>
        </div>
      </div>
    );
  }

  if (selectedDiscussion) {
    return (
      <div className="container py-8">
        <button
          onClick={() => setSelectedDiscussion(null)}
          className="btn btn-secondary mb-6"
        >
          ← Back to Discussions
        </button>

        <div className="card">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2">{selectedDiscussion.title}</h1>
            <p className="text-gray-600">{selectedDiscussion.topic}</p>
            <div className="flex gap-4 mt-4 text-sm text-gray-500">
              <span>{selectedDiscussion.totalPosts} posts</span>
              <span>{selectedDiscussion.debatePointsAwarded} points awarded</span>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            {selectedDiscussion.posts.map((post) => (
              <div key={post.id} className="discussion-post">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <strong>{post.username}</strong>
                    <span className="points-badge text-xs">+{post.debatePoints} points</span>
                  </div>
                  <span className="text-sm text-gray-500">{post.timestamp}</span>
                </div>
                <p className="mb-3">{post.content}</p>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleLikePost(post.id)}
                    className="flex items-center gap-1 text-sm text-gray-600 hover:text-purple-600"
                  >
                    <ThumbsUp size={16} />
                    {post.likes}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t pt-6">
            <div className="flex gap-3">
              <input
                type="text"
                className="input flex-1"
                placeholder="Share your sports insight..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handlePostMessage()}
                disabled={loading}
              />
              <button
                onclick={handlePostMessage}
                disabled={!newMessage.trim() || loading}
                className="btn btn-primary px-4"
              >
                {loading ? (
                  <div className="loading-spinner"></div>
                ) : (
                  <Send size={18} />
                )}
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              💡 Earn Debate Points for valuable contributions. AI moderation ensures quality discussions.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Sports Discussions</h1>
          <p className="text-gray-600">
            AI-moderated discussions where quality insights earn Debate Points
          </p>
        </div>
        <button
          onClick={() => setShowNewTopicModal(true)}
          className="btn btn-primary flex items-center gap-2"
        >
          <Plus size={18} />
          New Topic
        </button>
      </div>

      <div className="grid grid-2 gap-6">
        {discussions.map((discussion) => (
          <div
            key={discussion.id}
            className="card hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => setSelectedDiscussion(discussion)}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">{discussion.title}</h3>
                <p className="text-gray-600 mb-3">{discussion.topic}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <MessageCircle size={16} />
                    {discussion.totalPosts} posts
                  </span>
                  <span className="flex items-center gap-1">
                    <Award size={16} />
                    {discussion.debatePointsAwarded} points
                  </span>
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="text-sm">
                <strong>Latest: </strong>
                {discussion.posts[discussion.posts.length - 1]?.content.slice(0, 100)}...
              </div>
              <div className="text-xs text-gray-500 mt-2">
                by {discussion.posts[discussion.posts.length - 1]?.username} •{' '}
                {discussion.posts[discussion.posts.length - 1]?.timestamp}
              </div>
            </div>
          </div>
        ))}
      </div>

      {showNewTopicModal && (
        <AIDiscussionModal onClose={() => setShowNewTopicModal(false)} />
      )}
    </div>
  );
};

export default Discussions;