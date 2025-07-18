import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const OverviewTab = ({ event }) => {
  return (
    <div className="space-y-8">
      {/* Event Description */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-4">About This Event</h3>
        <div className="prose prose-invert max-w-none">
          <p className="text-text-secondary leading-relaxed whitespace-pre-line">
            {event.description}
          </p>
        </div>
      </div>

      {/* Event Highlights */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-4">Event Highlights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {event.highlights.map((highlight, index) => (
            <div key={index} className="flex items-start space-x-3 glassmorphism-card p-4">
              <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name="Check" size={16} className="text-primary" />
              </div>
              <div>
                <h4 className="font-medium text-white mb-1">{highlight.title}</h4>
                <p className="text-sm text-text-secondary">{highlight.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Organizer Info */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-4">Organizer</h3>
        <div className="glassmorphism-card p-6">
          <div className="flex items-start space-x-4">
            <Image
              src={event.organizer.avatar}
              alt={event.organizer.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div className="flex-1">
              <h4 className="font-semibold text-white mb-1">{event.organizer.name}</h4>
              <p className="text-text-secondary mb-3">{event.organizer.bio}</p>
              <div className="flex items-center space-x-4 text-sm text-text-secondary">
                <div className="flex items-center space-x-1">
                  <Icon name="Calendar" size={14} />
                  <span>{event.organizer.eventsCount} events</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Users" size={14} />
                  <span>{event.organizer.followersCount} followers</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Star" size={14} />
                  <span>{event.organizer.rating}/5</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Event Schedule */}
      {event.schedule && (
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Event Schedule</h3>
          <div className="space-y-4">
            {event.schedule.map((item, index) => (
              <div key={index} className="flex items-start space-x-4 glassmorphism-card p-4">
                <div className="text-primary font-mono text-sm font-medium min-w-[80px]">
                  {item.time}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-white mb-1">{item.title}</h4>
                  <p className="text-sm text-text-secondary">{item.description}</p>
                  {item.speaker && (
                    <p className="text-sm text-primary mt-1">Speaker: {item.speaker}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* What to Expect */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-4">What to Expect</h3>
        <div className="glassmorphism-card p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Icon name="Music" size={24} className="text-primary" />
              </div>
              <h4 className="font-medium text-white mb-2">Live Performance</h4>
              <p className="text-sm text-text-secondary">Experience world-class entertainment</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Icon name="Users" size={24} className="text-primary" />
              </div>
              <h4 className="font-medium text-white mb-2">Networking</h4>
              <p className="text-sm text-text-secondary">Connect with like-minded people</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Icon name="Gift" size={24} className="text-primary" />
              </div>
              <h4 className="font-medium text-white mb-2">Exclusive Perks</h4>
              <p className="text-sm text-text-secondary">Special offers and giveaways</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;