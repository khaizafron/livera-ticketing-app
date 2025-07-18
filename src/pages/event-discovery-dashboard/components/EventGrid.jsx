import React, { useState, useEffect } from 'react';
import EventCard from './EventCard';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EventGrid = ({ events, loading, onLoadMore, hasMore, onQuickPreview, onAddToCart }) => {
  const [visibleEvents, setVisibleEvents] = useState([]);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    setVisibleEvents(events);
  }, [events]);

  const handleLoadMore = async () => {
    if (loadingMore || !hasMore) return;
    
    setLoadingMore(true);
    await onLoadMore();
    setLoadingMore(false);
  };

  // Skeleton loader component
  const SkeletonCard = () => (
    <div className="glassmorphism-card overflow-hidden animate-pulse">
      <div className="h-48 bg-surface"></div>
      <div className="p-4 space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-surface rounded-lg"></div>
          <div className="space-y-2">
            <div className="h-3 bg-surface rounded w-16"></div>
            <div className="h-2 bg-surface rounded w-12"></div>
          </div>
        </div>
        <div className="h-4 bg-surface rounded w-3/4"></div>
        <div className="h-3 bg-surface rounded w-1/2"></div>
        <div className="h-3 bg-surface rounded w-2/3"></div>
        <div className="flex justify-between items-center">
          <div className="h-4 bg-surface rounded w-16"></div>
          <div className="h-3 bg-surface rounded w-12"></div>
        </div>
        <div className="h-1.5 bg-surface rounded w-full"></div>
        <div className="flex gap-2">
          <div className="h-8 bg-surface rounded flex-1"></div>
          <div className="h-8 w-8 bg-surface rounded"></div>
        </div>
      </div>
    </div>
  );

  // Empty state component
  const EmptyState = () => (
    <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
      <div className="w-24 h-24 bg-surface rounded-full flex items-center justify-center mb-6">
        <Icon name="Search" size={32} className="text-text-secondary" />
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">No events found</h3>
      <p className="text-text-secondary mb-6 max-w-md">
        We couldn't find any events matching your search criteria. Try adjusting your filters or search terms.
      </p>
      <Button variant="outline" onClick={() => window.location.reload()}>
        <Icon name="RotateCcw" size={16} className="mr-2" />
        Reset Filters
      </Button>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Event Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {/* Loading Skeletons */}
        {loading && visibleEvents.length === 0 && (
          <>
            {Array.from({ length: 8 }).map((_, index) => (
              <SkeletonCard key={`skeleton-${index}`} />
            ))}
          </>
        )}

        {/* Event Cards */}
        {visibleEvents.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            onQuickPreview={onQuickPreview}
            onAddToCart={onAddToCart}
          />
        ))}

        {/* Loading More Skeletons */}
        {loadingMore && (
          <>
            {Array.from({ length: 4 }).map((_, index) => (
              <SkeletonCard key={`loading-more-${index}`} />
            ))}
          </>
        )}
      </div>

      {/* Empty State */}
      {!loading && visibleEvents.length === 0 && <EmptyState />}

      {/* Load More Button */}
      {!loading && visibleEvents.length > 0 && hasMore && (
        <div className="flex justify-center pt-8">
          <Button
            variant="outline"
            onClick={handleLoadMore}
            loading={loadingMore}
            className="min-w-[200px]"
          >
            {loadingMore ? (
              <>
                <Icon name="Loader2" size={16} className="mr-2 animate-spin" />
                Loading more events...
              </>
            ) : (
              <>
                <Icon name="ChevronDown" size={16} className="mr-2" />
                Load More Events
              </>
            )}
          </Button>
        </div>
      )}

      {/* End of Results */}
      {!loading && visibleEvents.length > 0 && !hasMore && (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <div className="w-16 h-16 bg-surface rounded-full flex items-center justify-center mb-4">
            <Icon name="CheckCircle" size={24} className="text-success" />
          </div>
          <p className="text-text-secondary">
            You've reached the end of the results
          </p>
          <p className="text-sm text-text-secondary mt-1">
            {visibleEvents.length} events displayed
          </p>
        </div>
      )}
    </div>
  );
};

export default EventGrid;