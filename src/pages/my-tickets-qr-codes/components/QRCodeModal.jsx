import React, { useEffect, useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QRCodeModal = ({ isOpen, onClose, ticket }) => {
  const [brightness, setBrightness] = useState(100);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Increase screen brightness for better QR scanning
      setBrightness(100);
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const generateQRCode = (ticketId) => {
    // Mock QR code generation - in real app, this would be actual QR code
    return `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(ticketId)}&bgcolor=0D0D0D&color=A259FF`;
  };

  const formatDateTime = (date, time) => {
    const eventDate = new Date(date);
    const eventTime = new Date(`2000-01-01T${time}`);
    
    return {
      date: eventDate.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      }),
      time: eventTime.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      })
    };
  };

  if (!isOpen || !ticket) return null;

  const { date, time } = formatDateTime(ticket.eventDate, ticket.eventTime);

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-md glassmorphism-card p-6 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute top-4 right-4 text-text-secondary hover:text-white z-10"
        >
          <Icon name="X" size={18} />
        </Button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center neon-glow">
              <Icon name="QrCode" size={24} color="white" />
            </div>
          </div>
          <h2 className="text-xl font-bold text-white mb-2">
            Your Ticket QR Code
          </h2>
          <p className="text-text-secondary text-sm">
            Show this QR code at the event entrance
          </p>
        </div>

        {/* Event Info */}
        <div className="mb-6 p-4 bg-surface rounded-lg">
          <h3 className="font-semibold text-white mb-2 line-clamp-2">
            {ticket.eventTitle}
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center text-text-secondary">
              <Icon name="Calendar" size={14} className="mr-2" />
              <span>{date}</span>
            </div>
            <div className="flex items-center text-text-secondary">
              <Icon name="Clock" size={14} className="mr-2" />
              <span>{time}</span>
            </div>
            <div className="flex items-center text-text-secondary">
              <Icon name="MapPin" size={14} className="mr-2" />
              <span>{ticket.venue}</span>
            </div>
            <div className="flex items-center text-text-secondary">
              <Icon name="Ticket" size={14} className="mr-2" />
              <span>{ticket.ticketType} • Qty: {ticket.quantity}</span>
            </div>
          </div>
        </div>

        {/* QR Code */}
        <div className="mb-6">
          <div className="bg-white p-6 rounded-lg flex items-center justify-center">
            <img
              src={generateQRCode(ticket.orderId)}
              alt="Ticket QR Code"
              className="w-48 h-48"
              style={{ filter: `brightness(${brightness}%)` }}
            />
          </div>
          
          {/* Brightness Control */}
          <div className="mt-4 flex items-center space-x-3">
            <Icon name="Sun" size={16} className="text-text-secondary" />
            <input
              type="range"
              min="50"
              max="150"
              value={brightness}
              onChange={(e) => setBrightness(e.target.value)}
              className="flex-1 h-2 bg-surface rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-sm text-text-secondary w-12">{brightness}%</span>
          </div>
        </div>

        {/* Ticket Details */}
        <div className="mb-6 p-4 bg-surface rounded-lg">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-text-secondary">Order ID:</span>
              <div className="font-mono text-white">{ticket.orderId}</div>
            </div>
            <div>
              <span className="text-text-secondary">Seat/Section:</span>
              <div className="text-white">{ticket.seatInfo || 'General Admission'}</div>
            </div>
            <div>
              <span className="text-text-secondary">Entry Gate:</span>
              <div className="text-white">{ticket.entryGate || 'Main Entrance'}</div>
            </div>
            <div>
              <span className="text-text-secondary">Status:</span>
              <div className={`font-medium capitalize ${
                ticket.status === 'valid' ? 'text-success' : 
                ticket.status === 'used' ? 'text-text-secondary' : 'text-error'
              }`}>
                {ticket.status}
              </div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mb-6 p-4 bg-warning/10 border border-warning/30 rounded-lg">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={16} className="text-warning mt-0.5" />
            <div className="text-sm">
              <p className="text-warning font-medium mb-1">Scanning Instructions:</p>
              <ul className="text-text-secondary space-y-1">
                <li>• Keep your screen brightness high</li>
                <li>• Hold steady when scanning</li>
                <li>• Ensure QR code is clearly visible</li>
                <li>• Have backup PDF ready if needed</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            variant="outline"
            fullWidth
            onClick={() => {
              // Mock download functionality
              const link = document.createElement('a');
              link.href = generateQRCode(ticket.orderId);
              link.download = `ticket-qr-${ticket.orderId}.png`;
              link.click();
            }}
            iconName="Download"
            iconPosition="left"
          >
            Save QR Code
          </Button>
          
          <Button
            variant="ghost"
            fullWidth
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: `Ticket for ${ticket.eventTitle}`,
                  text: `My ticket QR code for ${ticket.eventTitle}`,
                  url: generateQRCode(ticket.orderId)
                });
              }
            }}
            iconName="Share"
            iconPosition="left"
          >
            Share QR Code
          </Button>
        </div>

        {/* Footer Note */}
        <div className="mt-6 text-center">
          <p className="text-xs text-text-secondary">
            This QR code is unique to your ticket. Do not share with others.
          </p>
        </div>
      </div>
    </div>
  );
};

export default QRCodeModal;