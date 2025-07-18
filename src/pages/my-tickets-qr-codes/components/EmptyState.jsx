import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmptyState = ({ type = 'no-tickets', searchQuery = '' }) => {
  const getEmptyStateContent = () => {
    switch (type) {
      case 'no-tickets':
        return {
          icon: 'Ticket',
          title: 'No Tickets Yet',
          description: 'You haven\'t purchased any tickets yet. Discover amazing events and get your first ticket!',
          actionText: 'Discover Events',
          actionLink: '/event-discovery-dashboard',
          illustration: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=300&fit=crop&crop=center'
        };
      
      case 'no-search-results':
        return {
          icon: 'Search',
          title: 'No Results Found',
          description: `We couldn't find any tickets matching "${searchQuery}". Try adjusting your search terms.`,
          actionText: 'Clear Search',
          actionLink: null,
          illustration: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=300&fit=crop&crop=center'
        };
      
      case 'no-upcoming':
        return {
          icon: 'Calendar',
          title: 'No Upcoming Events',
          description: 'You don\'t have any upcoming events. Browse our event catalog to find your next adventure!',
          actionText: 'Browse Events',
          actionLink: '/event-discovery-dashboard',
          illustration: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=400&h=300&fit=crop&crop=center'
        };
      
      case 'no-past':
        return {
          icon: 'Clock',
          title: 'No Past Events',
          description: 'You haven\'t attended any events yet. Start creating memories by booking your first event!',
          actionText: 'Find Events',
          actionLink: '/event-discovery-dashboard',
          illustration: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop&crop=center'
        };
      
      case 'no-valid':
        return {
          icon: 'CheckCircle',
          title: 'No Valid Tickets',
          description: 'All your tickets have been used or expired. Time to book your next event!',
          actionText: 'Book New Tickets',
          actionLink: '/event-discovery-dashboard',
          illustration: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=300&fit=crop&crop=center'
        };
      
      default:
        return {
          icon: 'Ticket',
          title: 'No Tickets',
          description: 'No tickets found for the selected filter.',
          actionText: 'View All Tickets',
          actionLink: null,
          illustration: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=300&fit=crop&crop=center'
        };
    }
  };

  const content = getEmptyStateContent();

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      {/* Illustration */}
      <div className="mb-8 relative">
        <div className="w-64 h-48 rounded-lg overflow-hidden opacity-20">
          <img
            src={content.illustration}
            alt="Empty state illustration"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center neon-glow">
            <Icon name={content.icon} size={32} color="white" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md space-y-4">
        <h3 className="text-2xl font-bold text-white">
          {content.title}
        </h3>
        
        <p className="text-text-secondary leading-relaxed">
          {content.description}
        </p>

        {/* Action Button */}
        <div className="pt-4">
          {content.actionLink ? (
            <Link to={content.actionLink}>
              <Button variant="default" size="lg">
                <Icon name="Plus" size={18} className="mr-2" />
                {content.actionText}
              </Button>
            </Link>
          ) : (
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => window.location.reload()}
            >
              <Icon name="RotateCcw" size={18} className="mr-2" />
              {content.actionText}
            </Button>
          )}
        </div>
      </div>

      {/* Additional Actions */}
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link to="/event-discovery-dashboard">
          <Button variant="ghost" size="sm">
            <Icon name="Search" size={16} className="mr-2" />
            Browse Events
          </Button>
        </Link>
        
        <Link to="/shopping-cart-checkout">
          <Button variant="ghost" size="sm">
            <Icon name="ShoppingCart" size={16} className="mr-2" />
            View Cart
          </Button>
        </Link>
        
        <Button variant="ghost" size="sm" onClick={() => window.history.back()}>
          <Icon name="ArrowLeft" size={16} className="mr-2" />
          Go Back
        </Button>
      </div>

      {/* Help Text */}
      <div className="mt-8 text-center">
        <p className="text-sm text-text-secondary">
          Need help? {' '}
          <a href="#" className="text-primary hover:underline">
            Contact Support
          </a>
          {' '} or check our {' '}
          <a href="#" className="text-primary hover:underline">
            FAQ
          </a>
        </p>
      </div>
    </div>
  );
};

export default EmptyState;