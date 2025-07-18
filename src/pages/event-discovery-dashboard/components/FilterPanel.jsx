import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterPanel = ({ isOpen, onClose, filters, onFilterChange, isMobile }) => {
  const [expandedSections, setExpandedSections] = useState(['categories', 'dates']);

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const categories = [
    { id: 'music', label: 'Music & Concerts', count: 45 },
    { id: 'sports', label: 'Sports & Fitness', count: 23 },
    { id: 'business', label: 'Business & Networking', count: 18 },
    { id: 'arts', label: 'Arts & Culture', count: 31 },
    { id: 'food', label: 'Food & Drink', count: 12 },
    { id: 'tech', label: 'Technology', count: 27 },
    { id: 'health', label: 'Health & Wellness', count: 15 },
    { id: 'education', label: 'Education & Learning', count: 22 }
  ];

  const locations = [
    { id: 'new-york', label: 'New York, NY', count: 89 },
    { id: 'los-angeles', label: 'Los Angeles, CA', count: 67 },
    { id: 'chicago', label: 'Chicago, IL', count: 45 },
    { id: 'miami', label: 'Miami, FL', count: 34 },
    { id: 'austin', label: 'Austin, TX', count: 28 },
    { id: 'seattle', label: 'Seattle, WA', count: 23 }
  ];

  const FilterSection = ({ id, title, children, count }) => (
    <div className="border-b border-purple-500/20 last:border-b-0">
      <button
        onClick={() => toggleSection(id)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-white/5 transition-colors duration-150"
      >
        <div className="flex items-center gap-2">
          <span className="font-medium text-white">{title}</span>
          {count && (
            <span className="text-xs text-text-secondary bg-surface px-2 py-1 rounded-full">
              {count}
            </span>
          )}
        </div>
        <Icon 
          name="ChevronDown" 
          size={16} 
          className={`text-text-secondary transition-transform duration-150 ${
            expandedSections.includes(id) ? 'rotate-180' : ''
          }`}
        />
      </button>
      
      {expandedSections.includes(id) && (
        <div className="px-4 pb-4">
          {children}
        </div>
      )}
    </div>
  );

  const content = (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-purple-500/30">
        <h2 className="text-lg font-semibold text-white">Filters</h2>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onFilterChange('clear')}
            className="text-text-secondary hover:text-white"
          >
            Clear all
          </Button>
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-text-secondary hover:text-white"
            >
              <Icon name="X" size={18} />
            </Button>
          )}
        </div>
      </div>

      {/* Filter Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Categories */}
        <FilterSection id="categories" title="Categories" count={filters.categories?.length || 0}>
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center justify-between">
                <Checkbox
                  label={category.label}
                  checked={filters.categories?.includes(category.id) || false}
                  onChange={(e) => onFilterChange('category', category.id, e.target.checked)}
                />
                <span className="text-xs text-text-secondary">{category.count}</span>
              </div>
            ))}
          </div>
        </FilterSection>

        {/* Date Range */}
        <FilterSection id="dates" title="Date Range">
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <Input
                label="From"
                type="date"
                value={filters.dateFrom || ''}
                onChange={(e) => onFilterChange('dateFrom', e.target.value)}
              />
              <Input
                label="To"
                type="date"
                value={filters.dateTo || ''}
                onChange={(e) => onFilterChange('dateTo', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <p className="text-sm text-text-secondary">Quick select:</p>
              <div className="flex flex-wrap gap-2">
                {['Today', 'Tomorrow', 'This Week', 'This Month'].map((period) => (
                  <Button
                    key={period}
                    variant="outline"
                    size="sm"
                    onClick={() => onFilterChange('quickDate', period)}
                    className={`text-xs ${
                      filters.quickDate === period ? 'bg-primary/10 border-primary text-primary' : ''
                    }`}
                  >
                    {period}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </FilterSection>

        {/* Location */}
        <FilterSection id="location" title="Location" count={filters.locations?.length || 0}>
          <div className="space-y-3">
            <Input
              placeholder="Search locations..."
              value={filters.locationSearch || ''}
              onChange={(e) => onFilterChange('locationSearch', e.target.value)}
            />
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {locations
                .filter(location => 
                  !filters.locationSearch || 
                  location.label.toLowerCase().includes(filters.locationSearch.toLowerCase())
                )
                .map((location) => (
                  <div key={location.id} className="flex items-center justify-between">
                    <Checkbox
                      label={location.label}
                      checked={filters.locations?.includes(location.id) || false}
                      onChange={(e) => onFilterChange('location', location.id, e.target.checked)}
                    />
                    <span className="text-xs text-text-secondary">{location.count}</span>
                  </div>
                ))}
            </div>
          </div>
        </FilterSection>

        {/* Price Range */}
        <FilterSection id="price" title="Price Range">
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Min Price"
                type="number"
                placeholder="$0"
                value={filters.priceMin || ''}
                onChange={(e) => onFilterChange('priceMin', e.target.value)}
              />
              <Input
                label="Max Price"
                type="number"
                placeholder="$500"
                value={filters.priceMax || ''}
                onChange={(e) => onFilterChange('priceMax', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <p className="text-sm text-text-secondary">Quick select:</p>
              <div className="flex flex-wrap gap-2">
                {['Free', '$1-25', '$26-50', '$51-100', '$100+'].map((range) => (
                  <Button
                    key={range}
                    variant="outline"
                    size="sm"
                    onClick={() => onFilterChange('priceRange', range)}
                    className={`text-xs ${
                      filters.priceRange === range ? 'bg-primary/10 border-primary text-primary' : ''
                    }`}
                  >
                    {range}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </FilterSection>

        {/* Event Type */}
        <FilterSection id="eventType" title="Event Type">
          <div className="space-y-2">
            {['In-person', 'Virtual', 'Hybrid'].map((type) => (
              <Checkbox
                key={type}
                label={type}
                checked={filters.eventTypes?.includes(type.toLowerCase()) || false}
                onChange={(e) => onFilterChange('eventType', type.toLowerCase(), e.target.checked)}
              />
            ))}
          </div>
        </FilterSection>
      </div>

      {/* Mobile Apply Button */}
      {isMobile && (
        <div className="p-4 border-t border-purple-500/30">
          <Button
            variant="default"
            fullWidth
            onClick={onClose}
          >
            Apply Filters
          </Button>
        </div>
      )}
    </div>
  );

  if (isMobile) {
    return (
      <>
        {isOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
            <div className="absolute inset-y-0 right-0 w-full max-w-sm glassmorphism-card">
              {content}
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <div className={`hidden lg:block w-80 glassmorphism-card h-fit sticky top-20 ${isOpen ? '' : 'hidden'}`}>
      {content}
    </div>
  );
};

export default FilterPanel;