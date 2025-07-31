import React, { useState } from 'react';
import { User, Award, Target, MessageCircle, Calendar, Settings, Trophy } from 'lucide-react';
import { useUser } from '../contexts/UserContext';

const Profile = () => {
  const { user, isAuthenticated } = useUser();
  const [activeTab, setActiveTab] = useState('overview');

  if (!isAuthenticated || !user) {
    return (
      <div className="container py-20">
        <div className="text-center">
          <User size={64} className="mx-auto mb-6 text-gray-400" />
          <h2 className="text-2xl font-bold mb-4">Profile</h2>
          <p className="text-gray-600 mb-8">
            Login to view your profile and track your progress
          </p>
        </div>
      </div>
    );
  }

  const stats = [
    {
      icon: Award,
      label: 'Debate Points',
      value: user.debatePoints,
      color: 'text-purple-600'
    },
    {
      icon: Target,
      label: 'Predictions Made',
      value: 23,
      color: 'text-blue-600'
    },
    {
      icon: MessageCircle,
      label: 'Discussions Joined',
      value: 12,
      color: 'text-green-600'
    },
    {
      icon: Trophy,
      label: 'Accuracy Rate',
      value: '78%',
      color: 'text-yellow-600'
    }
  ];

  const recentActivity = [
    {
      type: 'prediction',
      description: 'Made prediction: Lakers vs Warriors',
      points: '+25',
      timestamp: '2 hours ago'
    },
    {
      type: 'discussion',
      description: 'Joined NBA Finals discussion',
      points: '+15',
      timestamp: '5 hours ago'
    },
    {
      type: 'purchase',
      description: 'Redeemed NBA Analytics Pack',
      points: '-500',
      timestamp: '1 day ago'
    },
    {
      type: 'prediction',
      description: 'Correct prediction: Chiefs vs Bills',
      points: '+35',
      timestamp: '2 days ago'
    }
  ];

  const achievements = [
    {
      title: 'First Prediction',
      description: 'Made your first sports prediction',
      icon: '🎯',
      earned: true
    },
    {
      title: 'Discussion Starter',
      description: 'Started your first discussion',
      icon: '💭',
      earned: true
    },
    {
      title: 'Point Collector',
      description: 'Earned 1000 Debate Points',
      icon: '💎',
      earned: true
    },
    {
      title: 'Accuracy Expert',
      description: 'Achieved 80% prediction accuracy',
      icon: '🏆',
      earned: false
    },
    {
      title: 'Community Champion',
      description: 'Made 100 valuable contributions',
      icon: '👑',
      earned: false
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'activity', label: 'Recent Activity' },
    { id: 'achievements', label: 'Achievements' },
    { id: 'settings', label: 'Settings' }
  ];

  return (
    <div className="container py-8">
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            {user.username.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-3xl font-bold">{user.username}</h1>
            <p className="text-gray-600">Member since {user.joinDate}</p>
            <div className="points-badge mt-2">{user.debatePoints} Debate Points</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b mb-6 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 font-semibold border-b-2 transition-colors whitespace-nowrap ${
              activeTab === tab.id
                ? 'border-purple-600 text-purple-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Stats Grid */}
          <div className="grid grid-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="card text-center">
                  <Icon size={32} className={`mx-auto mb-3 ${stat.color}`} />
                  <div className="text-2xl font-bold mb-1">{stat.value}</div>
                  <div className="text-gray-600 text-sm">{stat.label}</div>
                </div>
              );
            })}
          </div>

          {/* Favorite Teams */}
          <div className="card">
            <h3 className="text-xl font-bold mb-4">Favorite Teams</h3>
            <div className="flex flex-wrap gap-3">
              {user.favoriteTeams.map((team, index) => (
                <span
                  key={index}
                  className="bg-gray-100 px-3 py-2 rounded-lg font-medium"
                >
                  {team}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Recent Activity Tab */}
      {activeTab === 'activity' && (
        <div className="space-y-4">
          {recentActivity.map((activity, index) => (
            <div key={index} className="card">
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <p className="font-medium">{activity.description}</p>
                  <p className="text-sm text-gray-500">{activity.timestamp}</p>
                </div>
                <div className={`font-bold ${
                  activity.points.startsWith('+') ? 'text-green-600' : 'text-red-600'
                }`}>
                  {activity.points} points
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Achievements Tab */}
      {activeTab === 'achievements' && (
        <div className="grid grid-2 gap-6">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className={`card ${
                achievement.earned
                  ? 'border-yellow-300 bg-yellow-50'
                  : 'border-gray-200 bg-gray-50 opacity-75'
              }`}
            >
              <div className="text-center">
                <div className="text-4xl mb-3">{achievement.icon}</div>
                <h3 className="font-bold text-lg mb-2">{achievement.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{achievement.description}</p>
                <div className={`text-sm font-medium ${
                  achievement.earned ? 'text-yellow-600' : 'text-gray-500'
                }`}>
                  {achievement.earned ? '✅ Earned' : '🔒 Not Earned'}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <div className="space-y-6">
          <div className="card">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Settings size={24} />
              Account Settings
            </h3>
            <div className="space-y-4">
              <div className="form-group">
                <label className="form-label">Username</label>
                <input type="text" className="input" value={user.username} disabled />
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input type="email" className="input" value={user.email} disabled />
              </div>
              <div className="form-group">
                <label className="form-label">Subscription Status</label>
                <input
                  type="text"
                  className="input"
                  value={user.subscriptionStatus}
                  disabled
                />
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="text-xl font-bold mb-4">Preferences</h3>
            <div className="space-y-4">
              <label className="flex items-center gap-3">
                <input type="checkbox" defaultChecked className="rounded" />
                <span>Email notifications for predictions</span>
              </label>
              <label className="flex items-center gap-3">
                <input type="checkbox" defaultChecked className="rounded" />
                <span>Discussion reply notifications</span>
              </label>
              <label className="flex items-center gap-3">
                <input type="checkbox" className="rounded" />
                <span>Marketing emails</span>
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;