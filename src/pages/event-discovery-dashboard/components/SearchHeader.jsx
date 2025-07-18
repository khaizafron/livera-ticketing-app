import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SearchHeader = ({ onSearch, onFilterToggle, searchQuery, totalResults }) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);

  const mockSuggestions = [
    { type: 'event', text: 'Summer Music Festival 2024', icon: 'Music' },
    { type: 'category', text: 'Music & Concerts', icon: 'Tag' },
    { type: 'location', text: 'New York, NY', icon: 'MapPin' },
    { type: 'event', text: 'Tech Conference 2024', icon: 'Laptop' },
    { type: 'organizer', text: 'Gamon Society Productions', icon: 'User' },
    { type: 'category', text: 'Business & Networking', icon: 'Tag' }
  ];

  useEffect(() => {
    if (searchQuery && searchQuery.length > 1) {
      const filtered = mockSuggestions.filter(suggestion =>
        suggestion.text.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5));
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
        setIsSearchFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSuggestionClick = (suggestion) => {
    onSearch(suggestion.text);
    setShowSuggestions(false);
    setIsSearchFocused(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setShowSuggestions(false);
    setIsSearchFocused(false);
  };

  return (
    <div className="sticky top-16 z-40 glassmorphism border-b border-purple-500/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-4">
          {/* Search Bar */}
          <div className="flex-1 relative" ref={searchRef}>
            <form onSubmit={handleSearchSubmit} className="relative">
              <div className={`relative transition-all duration-200 ${
                isSearchFocused ? 'scale-[1.02]' : ''
              }`}>
                <Icon 
                  name="Search" 
                  size={20} 
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-secondary" 
                />
                <input
                  type="text"
                  placeholder="Search events, categories, locations..."
                  value={searchQuery}
                  onChange={(e) => onSearch(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  className="w-full pl-12 pr-12 py-3 bg-surface border border-purple-500/30 rounded-lg text-white placeholder-text-secondary focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-150"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => onSearch('')}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-white transition-colors duration-150"
                  >
                    <Icon name="X" size={18} />
                  </button>
                )}
              </div>
            </form>

            {/* Search Suggestions */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 glassmorphism-card border border-purple-500/30 rounded-lg overflow-hidden z-50">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-white/5 transition-colors duration-150 border-b border-purple-500/20 last:border-b-0"
                  >
                    <Icon name={suggestion.icon} size={16} className="text-text-secondary" />
                    <div>
                      <span className="text-white">{suggestion.text}</span>
                      <span className="text-xs text-text-secondary ml-2 capitalize">
                        {suggestion.type}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Filter Toggle */}
          <Button
            variant="outline"
            onClick={onFilterToggle}
            className="lg:hidden"
          >
            <Icon name="Filter" size={18} className="mr-2" />
            Filters
          </Button>

          {/* Sort Dropdown - Desktop */}
          <div className="hidden sm:block">
            <select className="px-4 py-3 bg-surface border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-150">
              <option value="relevance">Sort by Relevance</option>
              <option value="date">Date</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="popularity">Popularity</option>
              <option value="newest">Newest First</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        {totalResults !== null && (
          <div className="mt-4 flex items-center justify-between">
            <p className="text-text-secondary">
              {totalResults.toLocaleString()} events found
              {searchQuery && (
                <span className="ml-1">
                  for "<span className="text-white">{searchQuery}</span>"
                </span>
              )}
            </p>
            
            {/* Mobile Sort */}
            <div className="sm:hidden">
              <select className="px-3 py-2 bg-surface border border-purple-500/30 rounded text-sm text-white focus:outline-none focus:border-primary">
                <option value="relevance">Relevance</option>
                <option value="date">Date</option>
                <option value="price-low">Price ↑</option>
                <option value="price-high">Price ↓</option>
                <option value="popularity">Popular</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchHeader;