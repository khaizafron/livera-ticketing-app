import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SuccessConfirmation = ({ orderDetails }) => {
  const handleDownloadTickets = () => {
    // Simulate PDF download
    console.log('Downloading tickets...');
  };

  const handleEmailTickets = () => {
    // Simulate email sending
    console.log('Sending tickets via email...');
  };

  return (
    <div className="max-w-2xl mx-auto text-center">
      {/* Success Animation */}
      <div className="mb-8">
        <div className="w-20 h-20 bg-success rounded-full flex items-center justify-center mx-auto mb-4 neon-glow pulse-glow">
          <Icon name="CheckCircle" size={40} className="text-white" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">
          Payment Successful!
        </h1>
        <p className="text-text-secondary text-lg">
          Your tickets have been confirmed and are ready to use
        </p>
      </div>

      {/* Order Details */}
      <div className="glassmorphism-card p-6 mb-6 text-left">
        <h2 className="text-xl font-semibold text-white mb-4">Order Details</h2>
        
        <div className="space-y-3 mb-4">
          <div className="flex justify-between">
            <span className="text-text-secondary">Order Number:</span>
            <span className="text-white font-mono">{orderDetails.orderNumber}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-secondary">Payment Method:</span>
            <span className="text-white">{orderDetails.paymentMethod}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-secondary">Total Amount:</span>
            <span className="text-primary font-bold">${orderDetails.total}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-secondary">Purchase Date:</span>
            <span className="text-white">{orderDetails.purchaseDate}</span>
          </div>
        </div>

        {/* Tickets */}
        <div className="border-t border-purple-500/30 pt-4">
          <h3 className="text-white font-medium mb-3">Your Tickets</h3>
          <div className="space-y-2">
            {orderDetails.tickets.map((ticket, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-surface rounded-lg">
                <div>
                  <p className="text-white font-medium">{ticket.eventTitle}</p>
                  <p className="text-text-secondary text-sm">
                    {ticket.ticketType} • Qty: {ticket.quantity}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-white">${ticket.price}</p>
                  <p className="text-text-secondary text-sm">
                    {ticket.eventDate}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-4 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Button
            variant="default"
            fullWidth
            onClick={handleDownloadTickets}
            iconName="Download"
            iconPosition="left"
          >
            Download Tickets
          </Button>
          <Button
            variant="outline"
            fullWidth
            onClick={handleEmailTickets}
            iconName="Mail"
            iconPosition="left"
          >
            Email Tickets
          </Button>
        </div>
        
        <Link to="/my-tickets-qr-codes">
          <Button variant="outline" fullWidth>
            <Icon name="Ticket" size={18} className="mr-2" />
            View All My Tickets
          </Button>
        </Link>
      </div>

      {/* Next Steps */}
      <div className="glassmorphism-card p-6">
        <h3 className="text-white font-semibold mb-4">What's Next?</h3>
        <div className="space-y-3 text-left">
          <div className="flex items-start space-x-3">
            <Icon name="Mail" size={16} className="text-primary mt-1" />
            <div>
              <p className="text-white font-medium">Check Your Email</p>
              <p className="text-text-secondary text-sm">
                Confirmation and tickets sent to {orderDetails.email}
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Icon name="Smartphone" size={16} className="text-primary mt-1" />
            <div>
              <p className="text-white font-medium">Save to Mobile</p>
              <p className="text-text-secondary text-sm">
                Add tickets to your mobile wallet for easy access
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Icon name="QrCode" size={16} className="text-primary mt-1" />
            <div>
              <p className="text-white font-medium">Event Check-in</p>
              <p className="text-text-secondary text-sm">
                Present QR code at the venue for quick entry
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Continue Shopping */}
      <div className="mt-8">
        <Link to="/event-discovery-dashboard">
          <Button variant="ghost" className="text-primary hover:text-primary">
            <Icon name="ArrowLeft" size={16} className="mr-2" />
            Continue Exploring Events
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default SuccessConfirmation;