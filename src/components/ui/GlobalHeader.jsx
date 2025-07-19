import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const GlobalHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { label: 'Discover', path: '/event-discovery-dashboard', icon: 'Search' },
    { label: 'My Tickets', path: '/my-tickets-qr-codes', icon: 'Ticket' },
    { label: 'Cart', path: '/shopping-cart-checkout', icon: 'ShoppingCart' },
  ];

  const isActive = (path) => location.pathname === path;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glassmorphism border-b border-purple-500/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/event-discovery-dashboard" className="flex items-center space-x-2 group">
            <div className="relative">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-150">
                <Icon name="Zap" size={20} color="white" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-lg blur-sm opacity-50 group-hover:opacity-75 transition-opacity duration-150"></div>
            </div>
            <span className="text-xl font-bold text-white group-hover:text-primary transition-colors duration-150">
              Livera MY
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-150 hover:scale-105 ${
                  isActive(item.path)
                    ? 'text-primary bg-primary/10 border border-primary/30' :'text-text-secondary hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon name={item.icon} size={18} />
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Desktop Search & Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              {isSearchOpen ? (
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search events..."
                      className="w-64 px-4 py-2 pl-10 bg-surface border border-purple-500/30 rounded-lg text-white placeholder-text-secondary focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-150"
                      autoFocus
                    />
                    <Icon name="Search" size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleSearch}
                    className="text-text-secondary hover:text-white"
                  >
                    <Icon name="X" size={18} />
                  </Button>
                </div>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleSearch}
                  className="text-text-secondary hover:text-white hover:bg-white/5"
                >
                  <Icon name="Search" size={18} />
                </Button>
              )}
            </div>

            {/* User Actions */}
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-text-secondary hover:text-white hover:bg-white/5"
              >
                <Icon name="Bell" size={18} />
              </Button>
              
              <Link to="/login-register">
                <Button variant="outline" size="sm">
                  <Icon name="User" size={16} className="mr-2" />
                  Sign In
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSearch}
              className="text-text-secondary hover:text-white"
            >
              <Icon name="Search" size={18} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileMenu}
              className="text-text-secondary hover:text-white"
            >
              <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={18} />
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        {isSearchOpen && (
          <div className="md:hidden py-4 border-t border-purple-500/30">
            <div className="relative">
              <input
                type="text"
                placeholder="Search events..."
                className="w-full px-4 py-3 pl-12 bg-surface border border-purple-500/30 rounded-lg text-white placeholder-text-secondary focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-150"
              />
              <Icon name="Search" size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-secondary" />
            </div>
          </div>
        )}

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-purple-500/30">
            <nav className="space-y-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-150 ${
                    isActive(item.path)
                      ? 'text-primary bg-primary/10 border border-primary/30' :'text-text-secondary hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon name={item.icon} size={20} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
              
              <div className="pt-4 border-t border-purple-500/30 mt-4">
                <Link
                  to="/login-register"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center space-x-3 px-4 py-3 rounded-lg text-text-secondary hover:text-white hover:bg-white/5 transition-all duration-150"
                >
                  <Icon name="User" size={20} />
                  <span className="font-medium">Sign In</span>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default GlobalHeader;