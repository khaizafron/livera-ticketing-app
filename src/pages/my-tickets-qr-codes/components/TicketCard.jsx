import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const TicketCard = ({ ticket, onViewQR, onDownloadPDF, onResendEmail, onTransferTicket }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case 'valid':
        return 'bg-success/10 text-success border-success/30';
      case 'used':
        return 'bg-muted text-text-secondary border-border';
      case 'expired':
        return 'bg-error/10 text-error border-error/30';
      default:
        return 'bg-muted text-text-secondary border-border';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'valid':
        return 'CheckCircle';
      case 'used':
        return 'Clock';
      case 'expired':
        return 'XCircle';
      default:
        return 'Clock';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
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
    <div className="glassmorphism-card overflow-hidden hover:scale-[1.02] transition-all duration-300">
      {/* Event Banner */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={ticket.eventBanner}
          alt={ticket.eventTitle}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        {/* Status Badge */}
        <div className={`absolute top-4 right-4 px-3 py-1 rounded-full border text-xs font-medium flex items-center space-x-1 ${getStatusColor(ticket.status)}`}>
          <Icon name={getStatusIcon(ticket.status)} size={12} />
          <span className="capitalize">{ticket.status}</span>
        </div>

        {/* Event Title Overlay */}
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-white font-bold text-lg mb-1 line-clamp-2">
            {ticket.eventTitle}
          </h3>
          <div className="flex items-center text-white/80 text-sm">
            <Icon name="Calendar" size={14} className="mr-1" />
            <span>{formatDate(ticket.eventDate)}</span>
            <span className="mx-2">•</span>
            <Icon name="Clock" size={14} className="mr-1" />
            <span>{formatTime(ticket.eventTime)}</span>
          </div>
        </div>
      </div>

      {/* Ticket Details */}
      <div className="p-4">
        {/* Venue and Ticket Type */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center text-text-secondary text-sm mb-1">
              <Icon name="MapPin" size={14} className="mr-1" />
              <span>{ticket.venue}</span>
            </div>
            <div className="flex items-center text-text-secondary text-sm">
              <Icon name="Ticket" size={14} className="mr-1" />
              <span>{ticket.ticketType}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-white font-semibold">${ticket.price}</div>
            <div className="text-text-secondary text-sm">Qty: {ticket.quantity}</div>
          </div>
        </div>

        {/* Order Info */}
        <div className="border-t border-purple-500/30 pt-3 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-text-secondary">Order ID:</span>
            <span className="text-white font-mono">{ticket.orderId}</span>
          </div>
          <div className="flex justify-between text-sm mt-1">
            <span className="text-text-secondary">Purchased:</span>
            <span className="text-white">{formatDate(ticket.purchaseDate)}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2">
          <Button
            variant="default"
            size="sm"
            onClick={() => onViewQR(ticket)}
            disabled={ticket.status === 'expired'}
            iconName="QrCode"
            iconPosition="left"
            className="flex-1 min-w-0"
          >
            View QR
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
            iconPosition="right"
            className="flex-1 min-w-0"
          >
            {isExpanded ? 'Less' : 'More'}
          </Button>
        </div>

        {/* Expanded Actions */}
        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-purple-500/30 space-y-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDownloadPDF(ticket)}
                iconName="Download"
                iconPosition="left"
                fullWidth
              >
                Download PDF
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onResendEmail(ticket)}
                iconName="Mail"
                iconPosition="left"
                fullWidth
              >
                Resend Email
              </Button>
            </div>
            
            {ticket.status === 'valid' && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onTransferTicket(ticket)}
                iconName="Send"
                iconPosition="left"
                fullWidth
              >
                Transfer Ticket
              </Button>
            )}
            
            {/* Additional Details */}
            <div className="mt-3 p-3 bg-surface rounded-lg">
              <div className="text-xs text-text-secondary space-y-1">
                <div className="flex justify-between">
                  <span>Seat/Section:</span>
                  <span className="text-white">{ticket.seatInfo || 'General Admission'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Entry Gate:</span>
                  <span className="text-white">{ticket.entryGate || 'Main Entrance'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Check-in Status:</span>
                  <span className="text-white">{ticket.checkedIn ? 'Checked In' : 'Not Checked In'}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketCard;