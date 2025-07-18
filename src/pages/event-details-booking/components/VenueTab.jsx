import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const VenueTab = ({ event }) => {
  const venue = event.venue;

  return (
    <div className="space-y-8">
      {/* Venue Information */}
      <div className="glassmorphism-card p-6">
        <div className="flex items-start space-x-4 mb-6">
          <div className="w-16 h-16 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <Icon name="MapPin" size={24} className="text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-white mb-2">{venue.name}</h3>
            <p className="text-text-secondary mb-2">{venue.address}</p>
            <p className="text-text-secondary">{venue.city}, {venue.state} {venue.zipCode}</p>
          </div>
        </div>

        {/* Venue Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Icon name="Users" size={20} className="text-primary" />
            </div>
            <h4 className="font-medium text-white mb-1">Capacity</h4>
            <p className="text-text-secondary">{venue.capacity.toLocaleString()} people</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Icon name="Car" size={20} className="text-primary" />
            </div>
            <h4 className="font-medium text-white mb-1">Parking</h4>
            <p className="text-text-secondary">{venue.parking}</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Icon name="Wifi" size={20} className="text-primary" />
            </div>
            <h4 className="font-medium text-white mb-1">Amenities</h4>
            <p className="text-text-secondary">Free WiFi, AC</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3">
          <Button
            variant="default"
            iconName="Navigation"
            iconPosition="left"
            onClick={() => window.open(`https://maps.google.com?q=${venue.lat},${venue.lng}`, '_blank')}
          >
            Get Directions
          </Button>
          <Button
            variant="outline"
            iconName="Phone"
            iconPosition="left"
            onClick={() => window.open(`tel:${venue.phone}`, '_self')}
          >
            Call Venue
          </Button>
          <Button
            variant="outline"
            iconName="Globe"
            iconPosition="left"
            onClick={() => window.open(venue.website, '_blank')}
          >
            Visit Website
          </Button>
        </div>
      </div>

      {/* Interactive Map */}
      <div className="glassmorphism-card p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Location</h3>
        <div className="w-full h-80 rounded-lg overflow-hidden">
          <iframe
            width="100%"
            height="100%"
            loading="lazy"
            title={venue.name}
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps?q=${venue.lat},${venue.lng}&z=15&output=embed`}
            className="border-0"
          />
        </div>
      </div>

      {/* Transportation Options */}
      <div className="glassmorphism-card p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Getting There</h3>
        <div className="space-y-4">
          {venue.transportation.map((option, index) => (
            <div key={index} className="flex items-start space-x-4 p-4 bg-white/5 rounded-lg">
              <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon 
                  name={
                    option.type === 'car' ? 'Car' :
                    option.type === 'bus' ? 'Bus' :
                    option.type === 'train'? 'Train' : 'MapPin'
                  } 
                  size={18} 
                  className="text-primary" 
                />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-white mb-1">{option.name}</h4>
                <p className="text-text-secondary text-sm mb-2">{option.description}</p>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-1 text-text-secondary">
                    <Icon name="Clock" size={14} />
                    <span>{option.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-text-secondary">
                    <Icon name="DollarSign" size={14} />
                    <span>{option.cost}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Nearby Places */}
      <div className="glassmorphism-card p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Nearby Places</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {venue.nearbyPlaces.map((place, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
              <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon 
                  name={
                    place.type === 'restaurant' ? 'Utensils' :
                    place.type === 'hotel' ? 'Building' :
                    place.type === 'parking'? 'Car' : 'MapPin'
                  } 
                  size={16} 
                  className="text-primary" 
                />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-white text-sm">{place.name}</h4>
                <p className="text-text-secondary text-xs">{place.distance} away</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Venue Policies */}
      <div className="glassmorphism-card p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Venue Policies</h3>
        <div className="space-y-3">
          {venue.policies.map((policy, index) => (
            <div key={index} className="flex items-start space-x-3">
              <Icon name="AlertCircle" size={16} className="text-warning mt-0.5 flex-shrink-0" />
              <p className="text-text-secondary text-sm">{policy}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VenueTab;