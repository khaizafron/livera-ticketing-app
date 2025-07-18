import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GlobalHeader from '../../components/ui/GlobalHeader';
import MobileTabBar from '../../components/ui/MobileTabBar';
import SearchHeader from './components/SearchHeader';
import FilterChips from './components/FilterChips';
import FilterPanel from './components/FilterPanel';
import EventGrid from './components/EventGrid';
import QuickPreviewModal from './components/QuickPreviewModal';



const EventDiscoveryDashboard = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [events, setEvents] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [totalResults, setTotalResults] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  const [filters, setFilters] = useState({
    categories: [],
    locations: [],
    eventTypes: [],
    dateFrom: '',
    dateTo: '',
    quickDate: '',
    priceMin: '',
    priceMax: '',
    priceRange: '',
    locationSearch: ''
  });

  // Mock events data
  const mockEvents = [
    {
      id: 1,
      title: "Summer Music Festival 2024",
      description: `Join us for the biggest music festival of the year featuring top artists from around the world. Experience three days of non-stop music, food, and entertainment in a beautiful outdoor setting.\n\nThis year's lineup includes Grammy-winning artists, emerging talents, and special surprise performances that will make this an unforgettable experience.`,
      image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&h=600&fit=crop",
      date: "2024-07-20T18:00:00Z",
      location: "Central Park, New York, NY",
      venue: "Great Lawn Amphitheater",
      organizer: "MusicFest Productions",
      price: 89,
      originalPrice: 120,
      ticketsLeft: 45,
      totalTickets: 500,
      categories: ["Music", "Festival", "Outdoor"],
      type: "in-person",
      timezone: "EST",
      saleEndDate: "2024-07-15T23:59:59Z"
    },
    {
      id: 2,
      title: "Tech Innovation Conference 2024",
      description: `Discover the latest trends in technology and innovation at this premier conference featuring industry leaders, startup founders, and tech visionaries.\n\nNetwork with professionals, attend hands-on workshops, and gain insights into the future of technology across various industries.`,
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
      date: "2024-08-15T09:00:00Z",
      location: "Convention Center, San Francisco, CA",
      venue: "Hall A - Main Auditorium",
      organizer: "TechForward Events",
      price: 299,
      originalPrice: 399,
      ticketsLeft: 12,
      totalTickets: 200,
      categories: ["Technology", "Business", "Networking"],
      type: "hybrid",
      timezone: "PST",
      saleEndDate: "2024-08-10T23:59:59Z"
    },
    {
      id: 3,
      title: "Virtual Cooking Masterclass",
      description: `Learn from world-renowned chefs in this interactive virtual cooking experience. Master the art of Italian cuisine from the comfort of your own kitchen.\n\nAll participants will receive a recipe book and ingredient list prior to the event.`,
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop",
      date: "2024-07-25T19:00:00Z",
      location: "Online Event",
      venue: "Zoom Platform",
      organizer: "Culinary Masters Academy",
      price: 0,
      originalPrice: null,
      ticketsLeft: 234,
      totalTickets: 1000,
      categories: ["Food", "Education", "Virtual"],
      type: "virtual",
      timezone: "EST",
      saleEndDate: "2024-07-24T23:59:59Z"
    },
    {
      id: 4,
      title: "Art Gallery Opening Night",
      description: `Experience contemporary art at its finest during this exclusive gallery opening featuring works from emerging and established artists.\n\nEnjoy wine, hors d'oeuvres, and the opportunity to meet the artists in person.`,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
      date: "2024-07-30T18:30:00Z",
      location: "Modern Art Gallery, Chicago, IL",
      venue: "Gallery Main Floor",
      organizer: "Contemporary Arts Collective",
      price: 25,
      originalPrice: null,
      ticketsLeft: 78,
      totalTickets: 150,
      categories: ["Arts", "Culture", "Social"],
      type: "in-person",
      timezone: "CST",
      saleEndDate: "2024-07-29T23:59:59Z"
    },
    {
      id: 5,
      title: "Marathon Training Workshop",
      description: `Prepare for your next marathon with expert guidance from professional trainers and nutritionists. Learn proper techniques, injury prevention, and race strategies.\n\nSuitable for all levels from beginners to experienced runners.`,
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
      date: "2024-08-05T07:00:00Z",
      location: "Riverside Park, Austin, TX",
      venue: "Park Pavilion",
      organizer: "Austin Running Club",
      price: 45,
      originalPrice: 60,
      ticketsLeft: 156,
      totalTickets: 300,
      categories: ["Sports", "Health", "Training"],
      type: "in-person",
      timezone: "CST",
      saleEndDate: "2024-08-03T23:59:59Z"
    },
    {
      id: 6,
      title: "Digital Marketing Summit",
      description: `Stay ahead of the curve with the latest digital marketing strategies and tools. Learn from industry experts about SEO, social media, content marketing, and more.\n\nIncludes networking sessions and hands-on workshops.`,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
      date: "2024-08-12T10:00:00Z",
      location: "Business Center, Miami, FL",
      venue: "Conference Room A",
      organizer: "Digital Growth Agency",
      price: 199,
      originalPrice: 249,
      ticketsLeft: 89,
      totalTickets: 250,
      categories: ["Business", "Marketing", "Education"],
      type: "hybrid",
      timezone: "EST",
      saleEndDate: "2024-08-10T23:59:59Z"
    },
    {
      id: 7,
      title: "Jazz Night Under the Stars",
      description: `Enjoy an evening of smooth jazz under the open sky with some of the finest musicians in the country. Bring your blanket and enjoy this magical outdoor experience.\n\nFood trucks and beverages will be available on-site.`,
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop",
      date: "2024-08-18T20:00:00Z",
      location: "Waterfront Park, Seattle, WA",
      venue: "Outdoor Amphitheater",
      organizer: "Seattle Jazz Society",
      price: 35,
      originalPrice: null,
      ticketsLeft: 203,
      totalTickets: 400,
      categories: ["Music", "Jazz", "Outdoor"],
      type: "in-person",
      timezone: "PST",
      saleEndDate: "2024-08-16T23:59:59Z"
    },
    {
      id: 8,
      title: "Startup Pitch Competition",
      description: `Watch innovative startups pitch their ideas to a panel of investors and industry experts. Network with entrepreneurs and discover the next big thing in business.\n\nPrizes will be awarded to the top three presentations.`,
      image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=600&fit=crop",
      date: "2024-08-22T14:00:00Z",
      location: "Innovation Hub, Boston, MA",
      venue: "Main Auditorium",
      organizer: "Startup Boston",
      price: 15,
      originalPrice: null,
      ticketsLeft: 67,
      totalTickets: 200,
      categories: ["Business", "Startup", "Networking"],
      type: "in-person",
      timezone: "EST",
      saleEndDate: "2024-08-20T23:59:59Z"
    }
  ];

  // Initialize events on component mount
  useEffect(() => {
    const loadInitialEvents = async () => {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setEvents(mockEvents);
      setTotalResults(mockEvents.length);
      setLoading(false);
    };

    loadInitialEvents();
  }, []);

  // Handle search
  const handleSearch = (query) => {
    setSearchQuery(query);
    // In a real app, this would trigger an API call
    if (query) {
      const filtered = mockEvents.filter(event =>
        event.title.toLowerCase().includes(query.toLowerCase()) ||
        event.description.toLowerCase().includes(query.toLowerCase()) ||
        event.location.toLowerCase().includes(query.toLowerCase()) ||
        event.categories.some(cat => cat.toLowerCase().includes(query.toLowerCase()))
      );
      setEvents(filtered);
      setTotalResults(filtered.length);
    } else {
      setEvents(mockEvents);
      setTotalResults(mockEvents.length);
    }
  };

  // Handle filter changes
  const handleFilterChange = (type, value, checked) => {
    setFilters(prev => {
      const newFilters = { ...prev };
      
      switch (type) {
        case 'category':
          if (checked) {
            newFilters.categories = [...prev.categories, value];
          } else {
            newFilters.categories = prev.categories.filter(cat => cat !== value);
          }
          break;
        case 'location':
          if (checked) {
            newFilters.locations = [...prev.locations, value];
          } else {
            newFilters.locations = prev.locations.filter(loc => loc !== value);
          }
          break;
        case 'eventType':
          if (checked) {
            newFilters.eventTypes = [...prev.eventTypes, value];
          } else {
            newFilters.eventTypes = prev.eventTypes.filter(type => type !== value);
          }
          break;
        case 'clear':
          return {
            categories: [],
            locations: [],
            eventTypes: [],
            dateFrom: '',
            dateTo: '',
            quickDate: '',
            priceMin: '',
            priceMax: '',
            priceRange: '',
            locationSearch: ''
          };
        default:
          newFilters[type] = value;
      }
      
      return newFilters;
    });
  };

  // Get active filters for chips
  const getActiveFilters = () => {
    const active = [];
    
    filters.categories.forEach(cat => {
      active.push({ type: 'category', value: cat, label: cat });
    });
    
    filters.locations.forEach(loc => {
      active.push({ type: 'location', value: loc, label: loc });
    });
    
    if (filters.quickDate) {
      active.push({ type: 'quickDate', value: filters.quickDate, label: filters.quickDate });
    }
    
    if (filters.priceRange) {
      active.push({ type: 'priceRange', value: filters.priceRange, label: filters.priceRange });
    }
    
    return active;
  };

  // Remove filter
  const handleRemoveFilter = (filter) => {
    handleFilterChange(filter.type, filter.value, false);
  };

  // Clear all filters
  const handleClearAllFilters = () => {
    handleFilterChange('clear');
  };

  // Load more events
  const handleLoadMore = async () => {
    setLoadingMore(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    // In a real app, this would load more events
    setLoadingMore(false);
    setHasMore(false); // For demo purposes
  };

  // Quick preview
  const handleQuickPreview = (event) => {
    setSelectedEvent(event);
    setIsPreviewModalOpen(true);
  };

  // Add to cart
  const handleAddToCart = (event) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === event.id);
      if (existing) {
        return prev.map(item =>
          item.id === event.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...event, quantity: 1 }];
    });
    
    // Show success message or navigate to cart
    console.log('Added to cart:', event.title);
  };

  const activeFilters = getActiveFilters();

  return (
    <div className="min-h-screen bg-background">
      <GlobalHeader />
      
      <div className="pt-16">
        <SearchHeader
          onSearch={handleSearch}
          onFilterToggle={() => setIsFilterPanelOpen(true)}
          searchQuery={searchQuery}
          totalResults={totalResults}
        />
        
        <FilterChips
          activeFilters={activeFilters}
          onRemoveFilter={handleRemoveFilter}
          onClearAll={handleClearAllFilters}
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex gap-6">
            {/* Desktop Filter Panel */}
            <FilterPanel
              isOpen={true}
              onClose={() => setIsFilterPanelOpen(false)}
              filters={filters}
              onFilterChange={handleFilterChange}
              isMobile={false}
            />
            
            {/* Main Content */}
            <div className="flex-1 min-w-0">
              <EventGrid
                events={events}
                loading={loading}
                onLoadMore={handleLoadMore}
                hasMore={hasMore}
                onQuickPreview={handleQuickPreview}
                onAddToCart={handleAddToCart}
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Filter Panel */}
      <FilterPanel
        isOpen={isFilterPanelOpen}
        onClose={() => setIsFilterPanelOpen(false)}
        filters={filters}
        onFilterChange={handleFilterChange}
        isMobile={true}
      />
      
      {/* Quick Preview Modal */}
      <QuickPreviewModal
        event={selectedEvent}
        isOpen={isPreviewModalOpen}
        onClose={() => setIsPreviewModalOpen(false)}
        onAddToCart={handleAddToCart}
      />
      
      <MobileTabBar />
    </div>
  );
};

export default EventDiscoveryDashboard;