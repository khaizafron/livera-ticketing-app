import React, { useState } from 'react';

import Button from '../../../components/ui/Button';

const EventTabs = ({ event, activeTab, onTabChange }) => {
  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'Info' },
    { id: 'tickets', label: 'Tickets', icon: 'Ticket' },
    { id: 'venue', label: 'Venue', icon: 'MapPin' },
    { id: 'reviews', label: 'Reviews', icon: 'Star' }
  ];

  return (
    <div className="border-b border-purple-500/30 mb-8">
      <div className="flex space-x-1 overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? 'default' : 'ghost'}
            onClick={() => onTabChange(tab.id)}
            iconName={tab.icon}
            iconPosition="left"
            className={`flex-shrink-0 ${
              activeTab === tab.id 
                ? 'bg-primary/20 text-primary border-b-2 border-primary' :'text-text-secondary hover:text-white hover:bg-white/5'
            }`}
          >
            {tab.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default EventTabs;