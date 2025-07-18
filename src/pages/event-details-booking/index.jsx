import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import GlobalHeader from '../../components/ui/GlobalHeader';
import MobileTabBar from '../../components/ui/MobileTabBar';
import EventHero from './components/EventHero';
import EventTabs from './components/EventTabs';
import OverviewTab from './components/OverviewTab';
import TicketsTab from './components/TicketsTab';
import VenueTab from './components/VenueTab';
import ReviewsTab from './components/ReviewsTab';
import BookingSidebar from './components/BookingSidebar';
import StickyMobileBooking from './components/StickyMobileBooking';
import ShareModal from './components/ShareModal';

const EventDetailsBooking = () => {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedTickets, setSelectedTickets] = useState({});
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  // Mock event data - in real app, this would be fetched based on URL params
  const mockEvent = {
    id: "evt_001",
    title: "Summer Music Festival 2025",
    category: "Music",
    isPopular: true,
    date: "2025-08-15",
    startTime: "18:00",
    endTime: "23:00",
    banner: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=1200&h=600&fit=crop",
    description: `Join us for the most anticipated music festival of the summer! Experience three days of non-stop entertainment featuring world-renowned artists, local talents, and emerging musicians across multiple stages.\n\nThis year's lineup includes headliners from various genres including rock, pop, electronic, and indie music. With over 50 artists performing across 4 stages, there's something for every music lover.\n\nBeyond the music, enjoy gourmet food trucks, craft beer gardens, interactive art installations, and exclusive merchandise from your favorite artists. VIP ticket holders get access to premium viewing areas, complimentary drinks, and meet-and-greet opportunities.`,
    startingPrice: 89,
    availableTickets: 1250,
    rating: 4.8,
    venue: {
      name: "Sunset Park Amphitheater",
      address: "1234 Music Drive",
      city: "Los Angeles",
      state: "CA",
      zipCode: "90210",
      lat: 34.0522,
      lng: -118.2437,
      capacity: 15000,
      parking: "Free on-site parking",
      phone: "+1 (555) 123-4567",
      website: "https://sunsetparkamphitheater.com",
      transportation: [
        {
          type: "car",
          name: "Driving",
          description: "Free parking available on-site with shuttle service to entrance",
          duration: "Varies by location",
          cost: "Free parking"
        },
        {
          type: "bus",
          name: "Metro Bus",
          description: "Route 720 stops directly at venue entrance",
          duration: "45 minutes from downtown",
          cost: "$2.50"
        },
        {
          type: "train",
          name: "Metro Rail",
          description: "Red Line to Hollywood/Highland, then shuttle bus",
          duration: "1 hour from downtown",
          cost: "$3.50"
        }
      ],
      nearbyPlaces: [
        { name: "The Grove", type: "restaurant", distance: "0.5 miles" },
        { name: "Hollywood Hotel", type: "hotel", distance: "1.2 miles" },
        { name: "Sunset Plaza", type: "parking", distance: "0.3 miles" },
        { name: "Music Store LA", type: "restaurant", distance: "0.8 miles" }
      ],
      policies: [
        "No outside food or beverages allowed",
        "Professional cameras and recording equipment prohibited",
        "All bags subject to search at entrance",
        "No re-entry once you leave the venue",
        "Must be 21+ for alcohol consumption areas"
      ]
    },
    ticketTypes: [
      {
        id: "early_bird",
        name: "Early Bird General",
        type: "early-bird",
        description: "Limited time offer - save 25% on general admission",
        price: 89,
        originalPrice: 119,
        available: 150,
        total: 500,
        saleEndDate: "2025-07-20T23:59:59",
        isPopular: true,
        features: [
          "General admission access",
          "Access to all 4 stages",
          "Food court access",
          "Free festival app with schedule",
          "Commemorative wristband"
        ]
      },
      {
        id: "regular",
        name: "General Admission",
        type: "regular",
        description: "Standard festival access with all basic amenities",
        price: 119,
        available: 800,
        total: 1000,
        features: [
          "General admission access",
          "Access to all 4 stages",
          "Food court access",
          "Free festival app with schedule",
          "Commemorative wristband"
        ]
      },
      {
        id: "vip",
        name: "VIP Experience",
        type: "vip",
        description: "Premium experience with exclusive perks and amenities",
        price: 299,
        available: 45,
        total: 100,
        features: [
          "VIP viewing areas at all stages",
          "Complimentary drinks (3 per day)",
          "Exclusive VIP lounge access",
          "Priority entry and exit",
          "Meet & greet opportunities",
          "Premium restroom facilities",
          "Dedicated VIP parking",
          "Exclusive merchandise package"
        ]
      }
    ],
    highlights: [
      {
        title: "World-Class Lineup",
        description: "50+ artists across multiple genres and 4 different stages"
      },
      {
        title: "Gourmet Food Experience",
        description: "20+ food trucks and vendors featuring local and international cuisine"
      },
      {
        title: "Interactive Art Installations",
        description: "Immersive art experiences and photo opportunities throughout the venue"
      },
      {
        title: "Sustainability Focus",
        description: "100% renewable energy, zero waste initiative, and eco-friendly practices"
      }
    ],
    organizer: {
      name: "SoundWave Events",
      bio: "Premier music event organizer with 15+ years of experience creating unforgettable live music experiences.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      eventsCount: 127,
      followersCount: 45200,
      rating: 4.9
    },
    schedule: [
      {
        time: "17:00",
        title: "Gates Open",
        description: "Venue opens, food vendors and merchandise booths available"
      },
      {
        time: "18:00",
        title: "Opening Acts",
        description: "Local artists kick off the festival on all stages",
        speaker: "Various Local Artists"
      },
      {
        time: "19:30",
        title: "Main Stage Headliner",
        description: "First major headliner performance on the main stage",
        speaker: "The Electric Waves"
      },
      {
        time: "21:00",
        title: "Multi-Stage Performances",
        description: "Simultaneous performances across all four stages"
      },
      {
        time: "22:30",
        title: "Closing Headliner",
        description: "Final performance of the night featuring special guest appearances",
        speaker: "Midnight Symphony"
      }
    ],
    reviews: [
      {
        id: "rev_001",
        user: {
          name: "Sarah Johnson",
          avatar: "https://randomuser.me/api/portraits/women/1.jpg"
        },
        rating: 5,
        date: "2024-08-20",
        comment: "Absolutely incredible experience! The sound quality was perfect, the venue was well-organized, and the lineup exceeded all expectations. The VIP experience was worth every penny - the exclusive viewing areas and complimentary drinks made the night even more special.",
        verified: true,
        helpfulCount: 24,
        images: [
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop",
          "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=100&h=100&fit=crop"
        ],
        organizerResponse: {
          date: "2024-08-21",
          message: "Thank you so much for the amazing review, Sarah! We're thrilled you had such a great time. See you next year!"
        }
      },
      {
        id: "rev_002",
        user: {
          name: "Mike Chen",
          avatar: "https://randomuser.me/api/portraits/men/2.jpg"
        },
        rating: 4,
        date: "2024-08-19",
        comment: "Great festival overall! The music was fantastic and the food options were diverse. Only minor complaint was the long lines for drinks, but the staff was friendly and helpful throughout the event.",
        verified: true,
        helpfulCount: 18
      },
      {
        id: "rev_003",
        user: {
          name: "Emily Rodriguez",
          avatar: "https://randomuser.me/api/portraits/women/3.jpg"
        },
        rating: 5,
        date: "2024-08-18",
        comment: "This was my third year attending and it just keeps getting better! The new art installations were amazing and the sustainability initiatives really show the organizers care about the environment. Can\'t wait for next year!",
        verified: true,
        helpfulCount: 31
      },
      {
        id: "rev_004",
        user: {
          name: "David Park",
          avatar: "https://randomuser.me/api/portraits/men/4.jpg"
        },
        rating: 4,
        date: "2024-08-17",
        comment: "Solid festival with great music and atmosphere. The general admission experience was good, though I'd probably upgrade to VIP next time for the better viewing areas. Parking was easy and the shuttle service was efficient.",
        verified: false,
        helpfulCount: 12
      }
    ]
  };

  const handleAddToCart = (ticket, quantity) => {
    setSelectedTickets(prev => ({
      ...prev,
      [ticket.id]: (prev[ticket.id] || 0) + quantity
    }));
    
    // Show success message or animation
    console.log(`Added ${quantity} ${ticket.name} tickets to cart`);
  };

  const handleUpdateTickets = (updatedTickets) => {
    setSelectedTickets(updatedTickets);
  };

  const handleShare = () => {
    setIsShareModalOpen(true);
  };

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <GlobalHeader />
      
      <main className="pt-16 pb-20 lg:pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="mb-8">
            <EventHero event={mockEvent} onShare={handleShare} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-8">
              {/* Tabs Navigation */}
              <EventTabs 
                event={mockEvent}
                activeTab={activeTab}
                onTabChange={setActiveTab}
              />

              {/* Tab Content */}
              <div className="min-h-[600px]">
                {activeTab === 'overview' && (
                  <OverviewTab event={mockEvent} />
                )}
                {activeTab === 'tickets' && (
                  <TicketsTab 
                    event={mockEvent}
                    onAddToCart={handleAddToCart}
                  />
                )}
                {activeTab === 'venue' && (
                  <VenueTab event={mockEvent} />
                )}
                {activeTab === 'reviews' && (
                  <ReviewsTab event={mockEvent} />
                )}
              </div>
            </div>

            {/* Desktop Sidebar */}
            <div className="hidden lg:block lg:col-span-4">
              <BookingSidebar
                event={mockEvent}
                selectedTickets={selectedTickets}
                onUpdateTickets={handleUpdateTickets}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Sticky Booking Bar */}
      <StickyMobileBooking
        event={mockEvent}
        selectedTickets={selectedTickets}
        onUpdateTickets={handleUpdateTickets}
      />

      {/* Share Modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        event={mockEvent}
      />

      <MobileTabBar />
    </div>
  );
};

export default EventDetailsBooking;