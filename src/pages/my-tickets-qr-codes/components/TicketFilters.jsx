import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const TicketFilters = ({ 
  activeFilter, 
  onFilterChange, 
  searchQuery, 
  onSearchChange, 
  ticketCounts,
  sortBy,
  onSortChange 
}) => {
  const filterOptions = [
    { 
      key: 'all', 
      label: 'All Tickets', 
      count: ticketCounts.all,
      icon: 'Ticket'
    },
    { 
      key: 'upcoming', 
      label: 'Upcoming', 
      count: ticketCounts.upcoming,
      icon: 'Calendar'
    },
    { 
      key: 'past', 
      label: 'Past Events', 
      count: ticketCounts.past,
      icon: 'Clock'
    },
    { 
      key: 'valid', 
      label: 'Valid', 
      count: ticketCounts.valid,
      icon: 'CheckCircle'
    },
    { 
      key: 'used', 
      label: 'Used', 
      count: ticketCounts.used,
      icon: 'Clock'
    }
  ];

  const sortOptions = [
    { value: 'date-desc', label: 'Event Date (Newest)' },
    { value: 'date-asc', label: 'Event Date (Oldest)' },
    { value: 'purchase-desc', label: 'Purchase Date (Recent)' },
    { value: 'purchase-asc', label: 'Purchase Date (Oldest)' },
    { value: 'title-asc', label: 'Event Title (A-Z)' },
    { value: 'title-desc', label: 'Event Title (Z-A)' }
  ];

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Input
          type="search"
          placeholder="Search tickets by event name, venue, or order ID..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
        <Icon 
          name="Search" 
          size={18} 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" 
        />
        {searchQuery && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onSearchChange('')}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-white"
          >
            <Icon name="X" size={16} />
          </Button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {filterOptions.map((filter) => (
          <Button
            key={filter.key}
            variant={activeFilter === filter.key ? 'default' : 'outline'}
            size="sm"
            onClick={() => onFilterChange(filter.key)}
            className="flex items-center space-x-2"
          >
            <Icon name={filter.icon} size={14} />
            <span>{filter.label}</span>
            {filter.count > 0 && (
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                activeFilter === filter.key 
                  ? 'bg-white/20 text-white' :'bg-primary/10 text-primary'
              }`}>
                {filter.count}
              </span>
            )}
          </Button>
        ))}
      </div>

      {/* Sort and View Options */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Sort Dropdown */}
        <div className="flex items-center space-x-3">
          <Icon name="ArrowUpDown" size={16} className="text-text-secondary" />
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="bg-surface border border-purple-500/30 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Results Count */}
        <div className="text-sm text-text-secondary">
          {ticketCounts[activeFilter] === 1 
            ? '1 ticket found' 
            : `${ticketCounts[activeFilter]} tickets found`
          }
        </div>
      </div>

      {/* Active Filters Display */}
      {(searchQuery || activeFilter !== 'all') && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-text-secondary">Active filters:</span>
          
          {activeFilter !== 'all' && (
            <div className="flex items-center space-x-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
              <span>Status: {filterOptions.find(f => f.key === activeFilter)?.label}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onFilterChange('all')}
                className="w-4 h-4 text-primary hover:text-primary/80"
              >
                <Icon name="X" size={12} />
              </Button>
            </div>
          )}
          
          {searchQuery && (
            <div className="flex items-center space-x-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
              <span>Search: "{searchQuery}"</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onSearchChange('')}
                className="w-4 h-4 text-primary hover:text-primary/80"
              >
                <Icon name="X" size={12} />
              </Button>
            </div>
          )}
          
          {(searchQuery || activeFilter !== 'all') && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                onFilterChange('all');
                onSearchChange('');
              }}
              className="text-text-secondary hover:text-white"
            >
              Clear all
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default TicketFilters;