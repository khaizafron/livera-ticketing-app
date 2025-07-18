import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const QuickPreviewModal = ({ event, isOpen, onClose, onAddToCart }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !event) return null;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return {
      full: date.toLocaleDateString('en-US', { 
        weekday: 'long',
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      time: date.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      })
    };
  };

  const dateInfo = formatDate(event.date);

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glassmorphism-card">
        {/* Close Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-text-secondary hover:text-white bg-black/40 backdrop-blur-sm"
        >
          <Icon name="X" size={18} />
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Image Section */}
          <div className="relative h-64 lg:h-full">
            <Image
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover"
            />
            
            {/* Event Type Badge */}
            <div className="absolute top-4 left-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                event.type === 'virtual' ?'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                  : event.type === 'hybrid' ?'bg-purple-500/20 text-purple-400 border border-purple-500/30' :'bg-green-500/20 text-green-400 border border-green-500/30'
              }`}>
                {event.type === 'virtual' ? 'Virtual Event' : event.type === 'hybrid' ? 'Hybrid Event' : 'In-person Event'}
              </span>
            </div>

            {/* Price Badge */}
            <div className="absolute bottom-4 left-4">
              <div className="px-3 py-2 bg-black/60 backdrop-blur-sm rounded-lg">
                <span className="text-lg font-bold text-white">
                  {event.price === 0 ? 'Free' : `$${event.price}`}
                </span>
                {event.originalPrice && event.originalPrice > event.price && (
                  <span className="text-sm text-text-secondary line-through ml-2">
                    ${event.originalPrice}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-6 lg:p-8">
            {/* Title */}
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4 leading-tight">
              {event.title}
            </h2>

            {/* Date & Time */}
            <div className="flex items-start gap-4 mb-6">
              <div className="flex items-center justify-center w-12 h-12 bg-primary/10 border border-primary/30 rounded-lg flex-shrink-0">
                <Icon name="Calendar" size={20} className="text-primary" />
              </div>
              <div>
                <p className="font-medium text-white">{dateInfo.full}</p>
                <p className="text-text-secondary">{dateInfo.time} {event.timezone}</p>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-start gap-4 mb-6">
              <div className="flex items-center justify-center w-12 h-12 bg-primary/10 border border-primary/30 rounded-lg flex-shrink-0">
                <Icon name="MapPin" size={20} className="text-primary" />
              </div>
              <div>
                <p className="font-medium text-white">{event.location}</p>
                <p className="text-text-secondary">{event.venue}</p>
              </div>
            </div>

            {/* Organizer */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center flex-shrink-0">
                <Icon name="User" size={20} color="white" />
              </div>
              <div>
                <p className="font-medium text-white">{event.organizer}</p>
                <p className="text-text-secondary">Event Organizer</p>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="font-semibold text-white mb-2">About this event</h3>
              <p className="text-text-secondary leading-relaxed">
                {event.description}
              </p>
            </div>

            {/* Categories */}
            <div className="mb-6">
              <h3 className="font-semibold text-white mb-2">Categories</h3>
              <div className="flex flex-wrap gap-2">
                {event.categories.map((category, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-surface border border-purple-500/30 text-sm text-text-secondary rounded-full"
                  >
                    {category}
                  </span>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-medium">Availability</span>
                <span className={`font-medium ${
                  event.ticketsLeft <= 10 ? 'text-error' : 
                  event.ticketsLeft <= 50 ? 'text-warning' : 'text-success'
                }`}>
                  {event.ticketsLeft} tickets left
                </span>
              </div>
              <div className="w-full bg-surface rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-300"
                  style={{ 
                    width: `${((event.totalTickets - event.ticketsLeft) / event.totalTickets) * 100}%` 
                  }}
                />
              </div>
              <p className="text-xs text-text-secondary mt-1">
                {event.totalTickets - event.ticketsLeft} of {event.totalTickets} tickets sold
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to={`/event-details-booking?id=${event.id}`} className="flex-1">
                <Button variant="default" fullWidth>
                  <Icon name="Ticket" size={18} className="mr-2" />
                  Book Tickets
                </Button>
              </Link>
              <Button
                variant="outline"
                onClick={() => onAddToCart(event)}
                className="flex-1"
              >
                <Icon name="ShoppingCart" size={18} className="mr-2" />
                Add to Cart
              </Button>
            </div>

            {/* Additional Actions */}
            <div className="flex items-center justify-center gap-4 mt-4 pt-4 border-t border-purple-500/30">
              <button className="flex items-center gap-2 text-text-secondary hover:text-white transition-colors duration-150">
                <Icon name="Heart" size={16} />
                <span className="text-sm">Save</span>
              </button>
              <button className="flex items-center gap-2 text-text-secondary hover:text-white transition-colors duration-150">
                <Icon name="Share" size={16} />
                <span className="text-sm">Share</span>
              </button>
              <button className="flex items-center gap-2 text-text-secondary hover:text-white transition-colors duration-150">
                <Icon name="Calendar" size={16} />
                <span className="text-sm">Add to Calendar</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickPreviewModal;