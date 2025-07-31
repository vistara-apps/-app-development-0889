import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, TrendingUp, Award, ShoppingBag, Users, Brain, Gift } from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: Brain,
      title: 'AI-Moderated Discussions',
      description: 'Engage in high-quality sports debates with AI ensuring safe, insightful conversations.',
    },
    {
      icon: TrendingUp,
      title: 'Prediction Rewards',
      description: 'Earn Debate Points for accurate predictions and valuable sports insights.',
    },
    {
      icon: Award,
      title: 'Premium Sports Data',
      description: 'Access exclusive analytics and predictions to enhance your sports knowledge.',
    },
    {
      icon: Gift,
      title: 'Exclusive Merchandise',
      description: 'Redeem your points for unique sports merchandise and collectibles.',
    },
  ];

  const stats = [
    { label: 'Active Discussions', value: '2,456' },
    { label: 'Predictions Made', value: '18,923' },
    { label: 'Debate Points Earned', value: '156,789' },
    { label: 'Sports Fans', value: '12,345' },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1>Elevate Your Sports Knowledge</h1>
          <p>
            Join the ultimate sports community where predictions meet rewards and knowledge earns recognition.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/discussions" className="btn btn-primary">
              Join Discussions
            </Link>
            <Link to="/predictions" className="btn btn-secondary">
              Make Predictions
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why SportsTalk?</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Turn your sports passion into rewards with our innovative platform that combines 
              AI technology, community engagement, and exclusive perks.
            </p>
          </div>

          <div className="grid grid-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="feature-card">
                  <div className="feature-icon">
                    <Icon size={32} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Community Impact</h2>
            <p className="text-gray-600">See how our community is growing and engaging</p>
          </div>

          <div className="grid grid-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-600 text-lg">Simple steps to start earning rewards</p>
          </div>

          <div className="grid grid-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-bold mb-3">Join Discussions</h3>
              <p className="text-gray-600">
                Participate in AI-moderated sports discussions and share your insights
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-content text-white font-bold text-xl mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-bold mb-3">Make Predictions</h3>
              <p className="text-gray-600">
                Submit predictions for upcoming games and earn points for accuracy
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-bold mb-3">Redeem Rewards</h3>
              <p className="text-gray-600">
                Use your Debate Points for premium data, merchandise, and exclusive content
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg mb-8 opacity-90">
            Join thousands of sports fans already earning rewards for their knowledge
          </p>
          <Link to="/discussions" className="btn bg-white text-purple-600 hover:bg-gray-100">
            Start Your Journey
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;