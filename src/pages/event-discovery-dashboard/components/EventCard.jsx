import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const EventCard = ({ event, onQuickPreview, onAddToCart }) => {
  const [isHovered, setIsHovered] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = date.toLocaleDateString('en-US', { month: 'short' });
    const day = date.getDate();
    const time = date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
    return { month, day, time };
  };

  const getUrgencyColor = (ticketsLeft) => {
    if (ticketsLeft <= 10) return 'text-error';
    if (ticketsLeft <= 50) return 'text-warning';
    return 'text-success';
  };

  const getCountdownText = (endDate) => {
    const now = new Date();
    const end = new Date(endDate);
    const diff = end - now;
    
    if (diff <= 0) return 'Sale ended';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days}d ${hours}h left`;
    return `${hours}h left`;
  };

  const dateInfo = formatDate(event.date);

  return (
    <div 
      className="group glassmorphism-card overflow-hidden hover:scale-[1.02] transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Event Image */}
      <div className="relative overflow-hidden h-48">
        <Image
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Overlay Actions */}
        <div className={`absolute inset-0 bg-black/60 flex items-center justify-center gap-3 transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onQuickPreview(event)}
            className="backdrop-blur-sm"
          >
            <Icon name="Eye" size={16} className="mr-2" />
            Quick View
          </Button>
          <Link to={`/event-details-booking?id=${event.id}`}>
            <Button variant="default" size="sm">
              <Icon name="Ticket" size={16} className="mr-2" />
              Book Now
            </Button>
          </Link>
        </div>

        {/* Event Type Badge */}
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            event.type === 'virtual' ?'bg-blue-500/20 text-blue-400 border border-blue-500/30'
              : event.type === 'hybrid' ?'bg-purple-500/20 text-purple-400 border border-purple-500/30' :'bg-green-500/20 text-green-400 border border-green-500/30'
          }`}>
            {event.type === 'virtual' ? 'Virtual' : event.type === 'hybrid' ? 'Hybrid' : 'In-person'}
          </span>
        </div>

        {/* Favorite Button */}
        <button className="absolute top-3 right-3 p-2 rounded-full bg-black/40 backdrop-blur-sm hover:bg-black/60 transition-colors duration-150">
          <Icon name="Heart" size={16} className="text-white" />
        </button>

        {/* Countdown Timer */}
        {event.saleEndDate && (
          <div className="absolute bottom-3 left-3 px-2 py-1 bg-black/60 backdrop-blur-sm rounded text-xs text-white">
            <Icon name="Clock" size={12} className="inline mr-1" />
            {getCountdownText(event.saleEndDate)}
          </div>
        )}
      </div>

      {/* Event Details */}
      <div className="p-4">
        {/* Date */}
        <div className="flex items-center gap-3 mb-3">
          <div className="flex flex-col items-center justify-center w-12 h-12 bg-primary/10 border border-primary/30 rounded-lg">
            <span className="text-xs text-primary font-medium">{dateInfo.month}</span>
            <span className="text-sm font-bold text-white">{dateInfo.day}</span>
          </div>
          <div>
            <p className="text-sm text-text-secondary">{dateInfo.time}</p>
            <p className="text-xs text-text-secondary">{event.timezone}</p>
          </div>
        </div>

        {/* Title */}
        <Link to={`/event-details-booking?id=${event.id}`}>
          <h3 className="font-semibold text-white mb-2 line-clamp-2 hover:text-primary transition-colors duration-150">
            {event.title}
          </h3>
        </Link>

        {/* Location */}
        <div className="flex items-center gap-2 mb-3">
          <Icon name="MapPin" size={14} className="text-text-secondary" />
          <span className="text-sm text-text-secondary truncate">{event.location}</span>
        </div>

        {/* Organizer */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
            <Icon name="User" size={12} color="white" />
          </div>
          <span className="text-sm text-text-secondary">{event.organizer}</span>
        </div>

        {/* Price and Availability */}
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-lg font-bold text-white">
              {event.price === 0 ? 'Free' : `$${event.price}`}
            </span>
            {event.originalPrice && event.originalPrice > event.price && (
              <span className="text-sm text-text-secondary line-through ml-2">
                ${event.originalPrice}
              </span>
            )}
          </div>
          
          <div className="text-right">
            <p className={`text-sm font-medium ${getUrgencyColor(event.ticketsLeft)}`}>
              {event.ticketsLeft} left
            </p>
            <p className="text-xs text-text-secondary">
              {event.totalTickets - event.ticketsLeft} sold
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-surface rounded-full h-1.5 mb-3">
          <div 
            className="bg-gradient-to-r from-primary to-secondary h-1.5 rounded-full transition-all duration-300"
            style={{ 
              width: `${((event.totalTickets - event.ticketsLeft) / event.totalTickets) * 100}%` 
            }}
          />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-1 mb-3">
          {event.categories.slice(0, 2).map((category, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-surface text-xs text-text-secondary rounded-full"
            >
              {category}
            </span>
          ))}
          {event.categories.length > 2 && (
            <span className="px-2 py-1 bg-surface text-xs text-text-secondary rounded-full">
              +{event.categories.length - 2}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            fullWidth
            onClick={() => onAddToCart(event)}
            className="flex-1"
          >
            <Icon name="ShoppingCart" size={16} className="mr-2" />
            Add to Cart
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onQuickPreview(event)}
            className="text-text-secondary hover:text-white"
          >
            <Icon name="Share" size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;