import React, { useState, useEffect } from 'react';
import { ShoppingBag, Award, Lock, Star, Download, TrendingUp } from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import { usePaymentContext } from '../hooks/usePaymentContext';

const Marketplace = () => {
  const { user, isAuthenticated, spendDebatePoints } = useUser();
  const { createSession } = usePaymentContext();
  const [items, setItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [purchasedItems, setPurchasedItems] = useState([]);
  const [loading, setLoading] = useState('');

  useEffect(() => {
    const mockItems = [
      {
        id: 1,
        name: 'Advanced NBA Analytics Pack',
        description: 'Comprehensive statistics, player ratings, and predictive models for the entire NBA season.',
        category: 'data',
        price: '$9.99',
        debatePointsPrice: 500,
        image: '📊',
        isPremium: true,
        features: ['Real-time stats', 'Player efficiency ratings', 'Injury reports', 'Betting insights']
      },
      {
        id: 2,
        name: 'NFL Draft Analysis Report',
        description: 'In-depth scouting reports and draft predictions from expert analysts.',
        category: 'data',
        price: '$14.99',
        debatePointsPrice: 750,
        image: '🏈',
        isPremium: true,
        features: ['Player profiles', 'Team needs analysis', 'Mock drafts', 'Sleeper picks']
      },
      {
        id: 3,
        name: 'SportsTalk Premium Jersey',
        description: 'Limited edition SportsTalk branded jersey with premium materials.',
        category: 'merchandise',
        price: '$49.99',
        debatePointsPrice: 2000,
        image: '👕',
        isPremium: false,
        features: ['Premium fabric', 'Limited edition', 'Official SportsTalk design', 'Multiple sizes']
      },
      {
        id: 4,
        name: 'Soccer World Cup Predictions',
        description: 'AI-powered predictions and analysis for the upcoming World Cup.',
        category: 'data',
        price: '$19.99',
        debatePointsPrice: 1000,
        image: '⚽',
        isPremium: true,
        features: ['Team analysis', 'Match predictions', 'Player stats', 'Tactical insights']
      },
      {
        id: 5,
        name: 'Sports Trivia Champion Mug',
        description: 'Show off your sports knowledge with this championship mug.',
        category: 'merchandise',
        price: '$15.99',
        debatePointsPrice: 300,
        image: '🏆',
        isPremium: false,
        features: ['Ceramic material', 'Dishwasher safe', 'SportsTalk logo', '11 oz capacity']
      },
      {
        id: 6,
        name: 'Basketball Analytics Dashboard',
        description: 'Interactive dashboard with real-time basketball statistics and trends.',
        category: 'data',
        price: '$24.99',
        debatePointsPrice: 1200,
        image: '🏀',
        isPremium: true,
        features: ['Live data feed', 'Custom filters', 'Export capabilities', 'Mobile access']
      }
    ];

    setItems(mockItems);
    
    // Load purchased items from localStorage
    const saved = localStorage.getItem('sportstalk_purchased');
    if (saved) {
      setPurchasedItems(JSON.parse(saved));
    }
  }, []);

  const categories = [
    { id: 'all', name: 'All Items', icon: ShoppingBag },
    { id: 'data', name: 'Sports Data', icon: TrendingUp },
    { id: 'merchandise', name: 'Merchandise', icon: Star },
  ];

  const filteredItems = activeCategory === 'all' 
    ? items 
    : items.filter(item => item.category === activeCategory);

  const isPurchased = (itemId) => purchasedItems.includes(itemId);

  const handlePurchaseWithPoints = (item) => {
    if (!isAuthenticated) {
      alert('Please login to make purchases');
      return;
    }

    if (!user || user.debatePoints < item.debatePointsPrice) {
      alert('Insufficient Debate Points');
      return;
    }

    const success = spendDebatePoints(item.debatePointsPrice);
    if (success) {
      const newPurchased = [...purchasedItems, item.id];
      setPurchasedItems(newPurchased);
      localStorage.setItem('sportstalk_purchased', JSON.stringify(newPurchased));
      alert(`Successfully purchased ${item.name} with Debate Points!`);
    }
  };

  const handlePurchaseWithCrypto = async (item) => {
    if (!isAuthenticated) {
      alert('Please login to make purchases');
      return;
    }

    setLoading(item.id);
    try {
      await createSession(item.price);
      const newPurchased = [...purchasedItems, item.id];
      setPurchasedItems(newPurchased);
      localStorage.setItem('sportstalk_purchased', JSON.stringify(newPurchased));
      alert(`Successfully purchased ${item.name} with cryptocurrency!`);
    } catch (error) {
      console.error('Payment failed:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setLoading('');
    }
  };

  const handleDownload = (item) => {
    // Simulate download
    alert(`Downloading ${item.name}... (This is a demo - would normally trigger actual download)`);
  };

  if (!isAuthenticated) {
    return (
      <div className="container py-20">
        <div className="text-center">
          <ShoppingBag size={64} className="mx-auto mb-6 text-gray-400" />
          <h2 className="text-2xl font-bold mb-4">Marketplace</h2>
          <p className="text-gray-600 mb-8">
            Login to access premium sports data and exclusive merchandise
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Marketplace</h1>
        <p className="text-gray-600">
          Redeem Debate Points or purchase premium content and merchandise
        </p>
      </div>

      {/* User Points Display */}
      <div className="card mb-8 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold mb-2">Your Debate Points</h3>
            <div className="text-3xl font-bold">{user?.debatePoints || 0}</div>
          </div>
          <Award size={48} className="opacity-80" />
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex gap-4 mb-8 overflow-x-auto">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                activeCategory === category.id
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Icon size={18} />
              {category.name}
            </button>
          );
        })}
      </div>

      {/* Items Grid */}
      <div className="grid grid-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div key={item.id} className="card">
            <div className="text-center mb-4">
              <div className="text-6xl mb-3">{item.image}</div>
              <div className="flex items-center justify-center gap-2 mb-2">
                <h3 className="text-lg font-bold">{item.name}</h3>
                {item.isPremium && (
                  <Lock size={16} className="text-purple-600" />
                )}
              </div>
              <p className="text-gray-600 text-sm mb-4">{item.description}</p>
            </div>

            <div className="mb-4">
              <h4 className="font-semibold mb-2">Features:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                {item.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-purple-600 rounded-full"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {isPurchased(item.id) ? (
              <div className="space-y-3">
                <div className="success-message text-center">
                  ✅ Purchased
                </div>
                <button
                  onClick={() => handleDownload(item)}
                  className="btn btn-success w-full flex items-center justify-center gap-2"
                >
                  <Download size={18} />
                  Download/Access
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-bold text-lg">{item.price}</span>
                  <span className="points-badge">{item.debatePointsPrice} Points</span>
                </div>

                <div className="grid grid-2 gap-2">
                  <button
                    onClick={() => handlePurchaseWithPoints(item)}
                    disabled={!user || user.debatePoints < item.debatePointsPrice}
                    className="btn btn-primary text-sm"
                  >
                    {loading === item.id ? (
                      <div className="loading-spinner"></div>
                    ) : (
                      'Use Points'
                    )}
                  </button>
                  <button
                    onClick={() => handlePurchaseWithCrypto(item)}
                    disabled={loading === item.id}
                    className="btn btn-secondary text-sm"
                  >
                    Pay with Crypto
                  </button>
                </div>

                {user && user.debatePoints < item.debatePointsPrice && (
                  <p className="text-xs text-red-600 text-center">
                    Need {item.debatePointsPrice - user.debatePoints} more points
                  </p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <ShoppingBag size={48} className="mx-auto mb-4 text-gray-400" />
          <h3 className="text-xl font-bold mb-2">No Items Found</h3>
          <p className="text-gray-600">
            Try selecting a different category
          </p>
        </div>
      )}
    </div>
  );
};

export default Marketplace;