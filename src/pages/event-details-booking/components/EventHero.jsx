import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const EventHero = ({ event, onShare }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    const time = new Date(`2000-01-01T${timeString}`);
    return time.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="relative h-[400px] md:h-[500px] overflow-hidden rounded-lg">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={event.banner}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
        <div className="max-w-4xl">
          {/* Event Category */}
          <div className="flex items-center space-x-2 mb-3">
            <span className="px-3 py-1 bg-primary/20 text-primary text-sm font-medium rounded-full border border-primary/30">
              {event.category}
            </span>
            {event.isPopular && (
              <span className="px-3 py-1 bg-accent/20 text-accent text-sm font-medium rounded-full border border-accent/30">
                <Icon name="TrendingUp" size={14} className="inline mr-1" />
                Popular
              </span>
            )}
          </div>

          {/* Event Title */}
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
            {event.title}
          </h1>

          {/* Event Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Date & Time */}
            <div className="flex items-center space-x-3 text-white">
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <Icon name="Calendar" size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-300">Date & Time</p>
                <p className="font-semibold">{formatDate(event.date)}</p>
                <p className="text-sm text-gray-300">{formatTime(event.startTime)} - {formatTime(event.endTime)}</p>
              </div>
            </div>

            {/* Venue */}
            <div className="flex items-center space-x-3 text-white">
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <Icon name="MapPin" size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-300">Venue</p>
                <p className="font-semibold">{event.venue.name}</p>
                <p className="text-sm text-gray-300">{event.venue.city}</p>
              </div>
            </div>

            {/* Starting Price */}
            <div className="flex items-center space-x-3 text-white">
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <Icon name="DollarSign" size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-300">Starting from</p>
                <p className="font-semibold text-xl">${event.startingPrice}</p>
                <p className="text-sm text-gray-300">per ticket</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant="default"
              iconName="Heart"
              iconPosition="left"
              className="glassmorphism hover:bg-primary/20"
            >
              Save Event
            </Button>
            
            <Button
              variant="outline"
              iconName="Share2"
              iconPosition="left"
              onClick={onShare}
              className="glassmorphism hover:bg-white/10"
            >
              Share
            </Button>

            <Button
              variant="ghost"
              iconName="Calendar"
              iconPosition="left"
              className="glassmorphism hover:bg-white/10"
            >
              Add to Calendar
            </Button>
          </div>
        </div>
      </div>

      {/* Ticket Availability Indicator */}
      <div className="absolute top-6 right-6">
        <div className="glassmorphism px-4 py-2 rounded-lg">
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${
              event.availableTickets > 100 ? 'bg-success' : 
              event.availableTickets > 20 ? 'bg-warning' : 'bg-error'
            }`}></div>
            <span className="text-white text-sm font-medium">
              {event.availableTickets > 100 ? 'Available' : 
               event.availableTickets > 0 ? `${event.availableTickets} left` : 'Sold Out'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventHero;