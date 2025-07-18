import React, { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import Icon from '../../components/AppIcon';

import GlobalHeader from '../../components/ui/GlobalHeader';
import MobileTabBar from '../../components/ui/MobileTabBar';
import TicketCard from './components/TicketCard';
import QRCodeModal from './components/QRCodeModal';
import TicketFilters from './components/TicketFilters';
import TransferTicketModal from './components/TransferTicketModal';
import EmptyState from './components/EmptyState';

const MyTicketsQRCodes = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('date-desc');
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Mock tickets data
  const mockTickets = [
    {
      id: 'TKT-001',
      orderId: 'ORD-2024-001',
      eventTitle: 'Summer Music Festival 2024',
      eventDate: '2024-08-15',
      eventTime: '18:00',
      venue: 'Central Park Amphitheater',
      ticketType: 'VIP Access',
      price: 149.99,
      quantity: 2,
      status: 'valid',
      purchaseDate: '2024-07-10',
      eventBanner: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=400&fit=crop&crop=center',
      seatInfo: 'VIP Section A, Row 3',
      entryGate: 'VIP Entrance',
      checkedIn: false
    },
    {
      id: 'TKT-002',
      orderId: 'ORD-2024-002',
      eventTitle: 'Tech Conference 2024: Future of AI',
      eventDate: '2024-07-25',
      eventTime: '09:00',
      venue: 'Convention Center Hall B',
      ticketType: 'Early Bird',
      price: 89.99,
      quantity: 1,
      status: 'used',
      purchaseDate: '2024-06-15',
      eventBanner: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop&crop=center',
      seatInfo: 'General Admission',
      entryGate: 'Main Entrance',
      checkedIn: true
    },
    {
      id: 'TKT-003',
      orderId: 'ORD-2024-003',
      eventTitle: 'Food & Wine Festival',
      eventDate: '2024-09-20',
      eventTime: '12:00',
      venue: 'Riverside Park',
      ticketType: 'Standard',
      price: 75.00,
      quantity: 3,
      status: 'valid',
      purchaseDate: '2024-07-12',
      eventBanner: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=400&fit=crop&crop=center',
      seatInfo: 'General Admission',
      entryGate: 'South Gate',
      checkedIn: false
    },
    {
      id: 'TKT-004',
      orderId: 'ORD-2024-004',
      eventTitle: 'Comedy Night Live',
      eventDate: '2024-06-30',
      eventTime: '20:00',
      venue: 'Downtown Comedy Club',
      ticketType: 'Premium',
      price: 45.00,
      quantity: 2,
      status: 'expired',
      purchaseDate: '2024-06-01',
      eventBanner: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=400&fit=crop&crop=center',
      seatInfo: 'Table 5',
      entryGate: 'Main Entrance',
      checkedIn: false
    },
    {
      id: 'TKT-005',
      orderId: 'ORD-2024-005',
      eventTitle: 'Art Gallery Opening: Modern Expressions',
      eventDate: '2024-08-30',
      eventTime: '19:00',
      venue: 'Metropolitan Art Gallery',
      ticketType: 'Standard',
      price: 25.00,
      quantity: 1,
      status: 'valid',
      purchaseDate: '2024-07-15',
      eventBanner: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop&crop=center',
      seatInfo: 'General Admission',
      entryGate: 'Gallery Entrance',
      checkedIn: false
    },
    {
      id: 'TKT-006',
      orderId: 'ORD-2024-006',
      eventTitle: 'Marathon 2024: Run for Charity',
      eventDate: '2024-10-05',
      eventTime: '07:00',
      venue: 'City Marathon Route',
      ticketType: '10K Race',
      price: 35.00,
      quantity: 1,
      status: 'valid',
      purchaseDate: '2024-07-16',
      eventBanner: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=400&fit=crop&crop=center',
      seatInfo: 'Starting Block C',
      entryGate: 'Registration Tent',
      checkedIn: false
    }
  ];

  // Filter and sort tickets
  const filteredAndSortedTickets = useMemo(() => {
    let filtered = mockTickets;
    const currentDate = new Date();

    // Apply status filter
    if (activeFilter !== 'all') {
      if (activeFilter === 'upcoming') {
        filtered = filtered.filter(ticket => new Date(ticket.eventDate) > currentDate);
      } else if (activeFilter === 'past') {
        filtered = filtered.filter(ticket => new Date(ticket.eventDate) <= currentDate);
      } else {
        filtered = filtered.filter(ticket => ticket.status === activeFilter);
      }
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(ticket =>
        ticket.eventTitle.toLowerCase().includes(query) ||
        ticket.venue.toLowerCase().includes(query) ||
        ticket.orderId.toLowerCase().includes(query) ||
        ticket.ticketType.toLowerCase().includes(query)
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date-desc':
          return new Date(b.eventDate) - new Date(a.eventDate);
        case 'date-asc':
          return new Date(a.eventDate) - new Date(b.eventDate);
        case 'purchase-desc':
          return new Date(b.purchaseDate) - new Date(a.purchaseDate);
        case 'purchase-asc':
          return new Date(a.purchaseDate) - new Date(b.purchaseDate);
        case 'title-asc':
          return a.eventTitle.localeCompare(b.eventTitle);
        case 'title-desc':
          return b.eventTitle.localeCompare(a.eventTitle);
        default:
          return 0;
      }
    });

    return filtered;
  }, [mockTickets, activeFilter, searchQuery, sortBy]);

  // Calculate ticket counts
  const ticketCounts = useMemo(() => {
    const currentDate = new Date();
    return {
      all: mockTickets.length,
      upcoming: mockTickets.filter(ticket => new Date(ticket.eventDate) > currentDate).length,
      past: mockTickets.filter(ticket => new Date(ticket.eventDate) <= currentDate).length,
      valid: mockTickets.filter(ticket => ticket.status === 'valid').length,
      used: mockTickets.filter(ticket => ticket.status === 'used').length
    };
  }, [mockTickets]);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleViewQR = (ticket) => {
    setSelectedTicket(ticket);
    setIsQRModalOpen(true);
  };

  const handleDownloadPDF = (ticket) => {
    // Mock PDF download
    console.log('Downloading PDF for ticket:', ticket.orderId);
    // In real app, this would trigger PDF generation and download
  };

  const handleResendEmail = (ticket) => {
    // Mock email resend
    console.log('Resending email for ticket:', ticket.orderId);
    // In real app, this would trigger email resend API call
  };

  const handleTransferTicket = (ticket) => {
    setSelectedTicket(ticket);
    setIsTransferModalOpen(true);
  };

  const handleTransferComplete = (ticketId, transferData) => {
    console.log('Transfer completed:', { ticketId, transferData });
    // In real app, this would update the ticket status
  };

  const getEmptyStateType = () => {
    if (searchQuery) return 'no-search-results';
    if (activeFilter === 'upcoming') return 'no-upcoming';
    if (activeFilter === 'past') return 'no-past';
    if (activeFilter === 'valid') return 'no-valid';
    return 'no-tickets';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <GlobalHeader />
        <div className="pt-16 pb-20 lg:pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Loading Skeleton */}
            <div className="space-y-6">
              <div className="h-8 bg-surface rounded-lg animate-pulse"></div>
              <div className="h-12 bg-surface rounded-lg animate-pulse"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="glassmorphism-card p-6 space-y-4">
                    <div className="h-48 bg-surface rounded-lg animate-pulse"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-surface rounded animate-pulse"></div>
                      <div className="h-4 bg-surface rounded animate-pulse w-3/4"></div>
                      <div className="h-4 bg-surface rounded animate-pulse w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <MobileTabBar />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>My Tickets & QR Codes - EventFlow</title>
        <meta name="description" content="Manage your event tickets and access QR codes for seamless event entry. View, download, and transfer your tickets." />
      </Helmet>

      <GlobalHeader />
      
      <div className="pt-16 pb-20 lg:pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Icon name="Ticket" size={20} color="white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">My Tickets</h1>
                <p className="text-text-secondary">Manage your event tickets and QR codes</p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="glassmorphism-card p-4 text-center">
                <div className="text-2xl font-bold text-primary">{ticketCounts.all}</div>
                <div className="text-sm text-text-secondary">Total Tickets</div>
              </div>
              <div className="glassmorphism-card p-4 text-center">
                <div className="text-2xl font-bold text-success">{ticketCounts.upcoming}</div>
                <div className="text-sm text-text-secondary">Upcoming</div>
              </div>
              <div className="glassmorphism-card p-4 text-center">
                <div className="text-2xl font-bold text-warning">{ticketCounts.valid}</div>
                <div className="text-sm text-text-secondary">Valid</div>
              </div>
              <div className="glassmorphism-card p-4 text-center">
                <div className="text-2xl font-bold text-text-secondary">{ticketCounts.used}</div>
                <div className="text-sm text-text-secondary">Used</div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="mb-8">
            <TicketFilters
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              ticketCounts={ticketCounts}
              sortBy={sortBy}
              onSortChange={setSortBy}
            />
          </div>

          {/* Tickets Grid */}
          {filteredAndSortedTickets.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAndSortedTickets.map((ticket) => (
                <TicketCard
                  key={ticket.id}
                  ticket={ticket}
                  onViewQR={handleViewQR}
                  onDownloadPDF={handleDownloadPDF}
                  onResendEmail={handleResendEmail}
                  onTransferTicket={handleTransferTicket}
                />
              ))}
            </div>
          ) : (
            <EmptyState 
              type={getEmptyStateType()} 
              searchQuery={searchQuery}
            />
          )}
        </div>
      </div>

      <MobileTabBar />

      {/* QR Code Modal */}
      <QRCodeModal
        isOpen={isQRModalOpen}
        onClose={() => setIsQRModalOpen(false)}
        ticket={selectedTicket}
      />

      {/* Transfer Ticket Modal */}
      <TransferTicketModal
        isOpen={isTransferModalOpen}
        onClose={() => setIsTransferModalOpen(false)}
        ticket={selectedTicket}
        onTransfer={handleTransferComplete}
      />
    </div>
  );
};

export default MyTicketsQRCodes;