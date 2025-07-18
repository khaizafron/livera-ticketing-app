import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const ReviewsTab = ({ event }) => {
  const [sortBy, setSortBy] = useState('newest');
  const [filterRating, setFilterRating] = useState('all');

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={16}
        className={index < rating ? 'text-warning fill-current' : 'text-gray-600'}
      />
    ));
  };

  const filteredReviews = event.reviews.filter(review => 
    filterRating === 'all' || review.rating === parseInt(filterRating)
  );

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    if (sortBy === 'newest') return new Date(b.date) - new Date(a.date);
    if (sortBy === 'oldest') return new Date(a.date) - new Date(b.date);
    if (sortBy === 'highest') return b.rating - a.rating;
    if (sortBy === 'lowest') return a.rating - b.rating;
    return 0;
  });

  return (
    <div className="space-y-8">
      {/* Rating Overview */}
      <div className="glassmorphism-card p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Overall Rating */}
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-2">{event.rating}</div>
            <div className="flex items-center justify-center space-x-1 mb-2">
              {renderStars(Math.round(event.rating))}
            </div>
            <p className="text-text-secondary">Based on {event.reviews.length} reviews</p>
          </div>

          {/* Rating Breakdown */}
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map(rating => {
              const count = event.reviews.filter(r => r.rating === rating).length;
              const percentage = (count / event.reviews.length) * 100;
              
              return (
                <div key={rating} className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1 w-12">
                    <span className="text-sm text-white">{rating}</span>
                    <Icon name="Star" size={12} className="text-warning" />
                  </div>
                  <div className="flex-1 bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-warning h-2 rounded-full transition-all duration-300"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-text-secondary w-8">{count}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Filters and Sort */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-text-secondary">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-surface border border-purple-500/30 rounded-lg px-3 py-1 text-white text-sm focus:outline-none focus:border-primary"
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="highest">Highest Rating</option>
              <option value="lowest">Lowest Rating</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-text-secondary">Filter:</span>
            <select
              value={filterRating}
              onChange={(e) => setFilterRating(e.target.value)}
              className="bg-surface border border-purple-500/30 rounded-lg px-3 py-1 text-white text-sm focus:outline-none focus:border-primary"
            >
              <option value="all">All Ratings</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>
          </div>
        </div>

        <Button variant="outline" iconName="MessageSquare" iconPosition="left">
          Write a Review
        </Button>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {sortedReviews.map((review) => (
          <div key={review.id} className="glassmorphism-card p-6">
            <div className="flex items-start space-x-4">
              {/* User Avatar */}
              <Image
                src={review.user.avatar}
                alt={review.user.name}
                className="w-12 h-12 rounded-full object-cover flex-shrink-0"
              />
              
              <div className="flex-1">
                {/* Review Header */}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-medium text-white">{review.user.name}</h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <div className="flex items-center space-x-1">
                        {renderStars(review.rating)}
                      </div>
                      <span className="text-text-secondary text-sm">•</span>
                      <span className="text-text-secondary text-sm">{formatDate(review.date)}</span>
                    </div>
                  </div>
                  
                  {/* Verified Badge */}
                  {review.verified && (
                    <div className="flex items-center space-x-1 px-2 py-1 bg-success/20 text-success text-xs rounded-full border border-success/30">
                      <Icon name="CheckCircle" size={12} />
                      <span>Verified</span>
                    </div>
                  )}
                </div>

                {/* Review Content */}
                <p className="text-text-secondary mb-4 leading-relaxed">{review.comment}</p>

                {/* Review Images */}
                {review.images && review.images.length > 0 && (
                  <div className="flex space-x-2 mb-4">
                    {review.images.map((image, index) => (
                      <Image
                        key={index}
                        src={image}
                        alt={`Review image ${index + 1}`}
                        className="w-16 h-16 rounded-lg object-cover cursor-pointer hover:opacity-80 transition-opacity"
                      />
                    ))}
                  </div>
                )}

                {/* Review Actions */}
                <div className="flex items-center space-x-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="ThumbsUp"
                    iconPosition="left"
                    className="text-text-secondary hover:text-white"
                  >
                    Helpful ({review.helpfulCount})
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="MessageSquare"
                    iconPosition="left"
                    className="text-text-secondary hover:text-white"
                  >
                    Reply
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Flag"
                    iconPosition="left"
                    className="text-text-secondary hover:text-white"
                  >
                    Report
                  </Button>
                </div>

                {/* Organizer Response */}
                {review.organizerResponse && (
                  <div className="mt-4 p-4 bg-primary/10 border border-primary/30 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Icon name="User" size={16} className="text-primary" />
                      <span className="text-primary font-medium text-sm">Organizer Response</span>
                      <span className="text-text-secondary text-sm">•</span>
                      <span className="text-text-secondary text-sm">{formatDate(review.organizerResponse.date)}</span>
                    </div>
                    <p className="text-text-secondary text-sm">{review.organizerResponse.message}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      {sortedReviews.length < event.reviews.length && (
        <div className="text-center">
          <Button variant="outline">
            Load More Reviews
          </Button>
        </div>
      )}
    </div>
  );
};

export default ReviewsTab;