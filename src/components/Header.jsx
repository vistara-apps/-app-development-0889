import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Trophy, MessageCircle, TrendingUp, ShoppingBag, User, Menu, X } from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import LoginModal from './LoginModal';
import PointsDisplay from './ui/PointsDisplay';

const Header = () => {
  const { user, isAuthenticated, logout } = useUser();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Discussions', path: '/discussions', icon: MessageCircle },
    { name: 'Predictions', path: '/predictions', icon: TrendingUp },
    { name: 'Marketplace', path: '/marketplace', icon: ShoppingBag },
  ];

  const isActivePath = (path) => location.pathname === path;

  return (
    <>
      <header className="header">
        <div className="container">
          <div className="header-content">
            <Link to="/" className="logo">
              <Trophy className="inline-block mr-2" size={28} />
              SportsTalk
            </Link>

            <nav className="nav hidden md:flex">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`nav-link flex items-center gap-2 ${
                      isActivePath(item.path) ? 'active' : ''
                    }`}
                  >
                    <Icon size={18} />
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-4">
              {isAuthenticated ? (
                <>
                  <PointsDisplay 
                    points={user.debatePoints} 
                    size="small"
                    showLevel={false}
                    showProgress={false}
                  />
                  <div className="relative group">
                    <button className="flex items-center gap-2 btn btn-secondary">
                      <User size={18} />
                      {user.username}
                    </button>
                    <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-dropdown">
                      <Link to="/profile" className="block px-4 py-2 text-sm hover:bg-gray-50 rounded-t-lg">
                        Profile
                      </Link>
                      <button
                        onClick={logout}
                        className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 text-red-600 rounded-b-lg"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="btn btn-primary"
                >
                  Login
                </button>
              )}
              
              <ConnectButton />

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden btn btn-secondary p-2"
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="container py-4">
              <nav className="flex flex-col gap-4">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      to={item.path}
                      className={`nav-link flex items-center gap-2 ${
                        isActivePath(item.path) ? 'active' : ''
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Icon size={18} />
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
        )}
      </header>

      {showLoginModal && (
        <LoginModal onClose={() => setShowLoginModal(false)} />
      )}
    </>
  );
};

export default Header;
