import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const EventOversightPanel = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const events = [
    {
      id: 1,
      title: "Summer Music Festival 2025",
      organizer: "MusicEvents Co.",
      status: "Pending Approval",
      category: "Music",
      date: "2025-07-15",
      venue: "Central Park",
      ticketsSold: 0,
      capacity: 5000,
      revenue: 0,
      flagged: false,
      image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=200&fit=crop"
    },
    {
      id: 2,
      title: "Tech Conference 2025",
      organizer: "TechHub Events",
      status: "Active",
      category: "Technology",
      date: "2025-03-20",
      venue: "Convention Center",
      ticketsSold: 1250,
      capacity: 2000,
      revenue: 125000,
      flagged: false,
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=300&h=200&fit=crop"
    },
    {
      id: 3,
      title: "Food & Wine Festival",
      organizer: "Culinary Events",
      status: "Flagged",
      category: "Food & Drink",
      date: "2025-05-10",
      venue: "Downtown Plaza",
      ticketsSold: 800,
      capacity: 1500,
      revenue: 48000,
      flagged: true,
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=300&h=200&fit=crop"
    },
    {
      id: 4,
      title: "Art Gallery Opening",
      organizer: "Modern Art Society",
      status: "Active",
      category: "Arts & Culture",
      date: "2025-02-28",
      venue: "Art District Gallery",
      ticketsSold: 150,
      capacity: 200,
      revenue: 7500,
      flagged: false,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop"
    },
    {
      id: 5,
      title: "Marathon Championship",
      organizer: "Sports Events Inc.",
      status: "Suspended",
      category: "Sports",
      date: "2025-04-15",
      venue: "City Stadium",
      ticketsSold: 3200,
      capacity: 10000,
      revenue: 160000,
      flagged: false,
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop"
    }
  ];

  const getStatusColor = (status) => {
    const colors = {
      'Active': 'bg-success/20 text-success border-success/30',
      'Pending Approval': 'bg-warning/20 text-warning border-warning/30',
      'Suspended': 'bg-error/20 text-error border-error/30',
      'Flagged': 'bg-error/20 text-error border-error/30'
    };
    return colors[status] || 'bg-muted/20 text-text-secondary border-muted/30';
  };

  const handleApprove = (eventId) => {
    console.log('Approving event:', eventId);
  };

  const handleReject = (eventId) => {
    console.log('Rejecting event:', eventId);
  };

  const handleSuspend = (eventId) => {
    console.log('Suspending event:', eventId);
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.organizer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || event.status.toLowerCase().includes(filterStatus.toLowerCase());
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="flex-1 max-w-md">
          <Input
            type="search"
            placeholder="Search events by title or organizer..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 bg-surface border border-purple-500/30 rounded-lg text-white text-sm focus:outline-none focus:border-primary"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending Approval</option>
            <option value="active">Active</option>
            <option value="flagged">Flagged</option>
            <option value="suspended">Suspended</option>
          </select>
          
          <Button variant="outline" size="sm">
            <Icon name="Filter" size={16} className="mr-2" />
            More Filters
          </Button>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <div key={event.id} className="glassmorphism-card overflow-hidden hover:scale-105 transition-all duration-300">
            {/* Event Image */}
            <div className="relative h-48 overflow-hidden">
              <img 
                src={event.image} 
                alt={event.title}
                className="w-full h-full object-cover"
              />
              {event.flagged && (
                <div className="absolute top-2 right-2 bg-error/90 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
                  <Icon name="Flag" size={12} className="mr-1" />
                  Flagged
                </div>
              )}
              <div className="absolute top-2 left-2">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(event.status)}`}>
                  {event.status}
                </span>
              </div>
            </div>

            {/* Event Details */}
            <div className="p-4">
              <div className="mb-3">
                <h3 className="font-semibold text-white mb-1 line-clamp-2">{event.title}</h3>
                <p className="text-sm text-text-secondary">{event.organizer}</p>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-text-secondary">
                  <Icon name="Calendar" size={14} className="mr-2" />
                  {new Date(event.date).toLocaleDateString()}
                </div>
                <div className="flex items-center text-sm text-text-secondary">
                  <Icon name="MapPin" size={14} className="mr-2" />
                  {event.venue}
                </div>
                <div className="flex items-center text-sm text-text-secondary">
                  <Icon name="Tag" size={14} className="mr-2" />
                  {event.category}
                </div>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 gap-4 mb-4 p-3 bg-white/5 rounded-lg">
                <div>
                  <p className="text-xs text-text-secondary">Tickets Sold</p>
                  <p className="font-semibold text-white">{event.ticketsSold.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-text-secondary">Revenue</p>
                  <p className="font-semibold text-white">${event.revenue.toLocaleString()}</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-xs text-text-secondary mb-1">
                  <span>Capacity</span>
                  <span>{event.ticketsSold}/{event.capacity}</span>
                </div>
                <div className="w-full bg-muted/30 rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(event.ticketsSold / event.capacity) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between">
                <Button variant="ghost" size="sm">
                  <Icon name="Eye" size={16} className="mr-1" />
                  View
                </Button>
                
                <div className="flex items-center space-x-1">
                  {event.status === 'Pending Approval' && (
                    <>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleApprove(event.id)}
                        className="text-success hover:text-success"
                      >
                        <Icon name="Check" size={16} />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleReject(event.id)}
                        className="text-error hover:text-error"
                      >
                        <Icon name="X" size={16} />
                      </Button>
                    </>
                  )}
                  
                  {event.status === 'Active' && (
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleSuspend(event.id)}
                      className="text-warning hover:text-warning"
                    >
                      <Icon name="Pause" size={16} />
                    </Button>
                  )}
                  
                  <Button variant="ghost" size="sm">
                    <Icon name="MoreHorizontal" size={16} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredEvents.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Calendar" size={48} className="mx-auto text-text-secondary mb-4" />
          <h3 className="text-lg font-medium text-white mb-2">No events found</h3>
          <p className="text-text-secondary">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default EventOversightPanel;