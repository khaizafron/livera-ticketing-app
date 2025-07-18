import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BookingSidebar = ({ event, selectedTickets, onUpdateTickets }) => {
  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoDiscount, setPromoDiscount] = useState(0);

  const handleQuantityChange = (ticketId, quantity) => {
    const updatedTickets = { ...selectedTickets };
    if (quantity === 0) {
      delete updatedTickets[ticketId];
    } else {
      updatedTickets[ticketId] = quantity;
    }
    onUpdateTickets(updatedTickets);
  };

  const handleApplyPromo = () => {
    // Mock promo code validation
    const validPromoCodes = {
      'EARLY20': 20,
      'STUDENT15': 15,
      'WELCOME10': 10
    };

    if (validPromoCodes[promoCode.toUpperCase()]) {
      setPromoDiscount(validPromoCodes[promoCode.toUpperCase()]);
      setPromoApplied(true);
    } else {
      alert('Invalid promo code');
    }
  };

  const calculateSubtotal = () => {
    return Object.entries(selectedTickets).reduce((total, [ticketId, quantity]) => {
      const ticket = event.ticketTypes.find(t => t.id === ticketId);
      return total + (ticket ? ticket.price * quantity : 0);
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const discount = promoApplied ? (subtotal * promoDiscount) / 100 : 0;
  const serviceFee = subtotal * 0.05; // 5% service fee
  const total = subtotal - discount + serviceFee;

  const hasSelectedTickets = Object.keys(selectedTickets).length > 0;

  const handleProceedToCheckout = () => {
    if (hasSelectedTickets) {
      navigate('/shopping-cart-checkout', {
        state: {
          event,
          selectedTickets,
          subtotal,
          discount,
          serviceFee,
          total,
          promoCode: promoApplied ? promoCode : null
        }
      });
    }
  };

  return (
    <div className="sticky top-24 space-y-6">
      {/* Quick Event Info */}
      <div className="glassmorphism-card p-6">
        <h3 className="font-semibold text-white mb-4">Event Summary</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <Icon name="Calendar" size={16} className="text-primary" />
            <div>
              <p className="text-white text-sm font-medium">{new Date(event.date).toLocaleDateString('en-US', { 
                weekday: 'short', 
                month: 'short', 
                day: 'numeric' 
              })}</p>
              <p className="text-text-secondary text-xs">{event.startTime} - {event.endTime}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Icon name="MapPin" size={16} className="text-primary" />
            <div>
              <p className="text-white text-sm font-medium">{event.venue.name}</p>
              <p className="text-text-secondary text-xs">{event.venue.city}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Selected Tickets */}
      {hasSelectedTickets && (
        <div className="glassmorphism-card p-6">
          <h3 className="font-semibold text-white mb-4">Selected Tickets</h3>
          <div className="space-y-4">
            {Object.entries(selectedTickets).map(([ticketId, quantity]) => {
              const ticket = event.ticketTypes.find(t => t.id === ticketId);
              if (!ticket) return null;

              return (
                <div key={ticketId} className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-white font-medium text-sm">{ticket.name}</p>
                    <p className="text-text-secondary text-xs">${ticket.price} each</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleQuantityChange(ticketId, quantity - 1)}
                      className="w-6 h-6"
                    >
                      <Icon name="Minus" size={12} />
                    </Button>
                    <span className="w-8 text-center text-white text-sm">{quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleQuantityChange(ticketId, quantity + 1)}
                      className="w-6 h-6"
                    >
                      <Icon name="Plus" size={12} />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Promo Code */}
      {hasSelectedTickets && (
        <div className="glassmorphism-card p-6">
          <h3 className="font-semibold text-white mb-4">Promo Code</h3>
          {!promoApplied ? (
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Enter promo code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="flex-1 px-3 py-2 bg-surface border border-purple-500/30 rounded-lg text-white placeholder-text-secondary focus:outline-none focus:border-primary text-sm"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={handleApplyPromo}
                disabled={!promoCode.trim()}
              >
                Apply
              </Button>
            </div>
          ) : (
            <div className="flex items-center justify-between p-3 bg-success/10 border border-success/30 rounded-lg">
              <div className="flex items-center space-x-2">
                <Icon name="Check" size={16} className="text-success" />
                <span className="text-success text-sm font-medium">{promoCode.toUpperCase()}</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setPromoApplied(false);
                  setPromoCode('');
                  setPromoDiscount(0);
                }}
                className="text-text-secondary hover:text-white"
              >
                Remove
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Order Summary */}
      {hasSelectedTickets && (
        <div className="glassmorphism-card p-6">
          <h3 className="font-semibold text-white mb-4">Order Summary</h3>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Subtotal</span>
              <span className="text-white">${subtotal.toFixed(2)}</span>
            </div>
            
            {promoApplied && (
              <div className="flex justify-between text-sm">
                <span className="text-success">Discount ({promoDiscount}%)</span>
                <span className="text-success">-${discount.toFixed(2)}</span>
              </div>
            )}
            
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Service Fee</span>
              <span className="text-white">${serviceFee.toFixed(2)}</span>
            </div>
            
            <div className="border-t border-purple-500/30 pt-3">
              <div className="flex justify-between">
                <span className="font-semibold text-white">Total</span>
                <span className="font-semibold text-white text-lg">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Checkout Button */}
      <Button
        variant="default"
        fullWidth
        onClick={handleProceedToCheckout}
        disabled={!hasSelectedTickets}
        iconName="CreditCard"
        iconPosition="left"
        className="neon-glow"
      >
        {hasSelectedTickets ? 'Proceed to Checkout' : 'Select Tickets'}
      </Button>

      {/* Security Info */}
      <div className="glassmorphism-card p-4">
        <div className="flex items-center space-x-2 mb-3">
          <Icon name="Shield" size={16} className="text-success" />
          <span className="text-success text-sm font-medium">Secure Checkout</span>
        </div>
        <div className="space-y-2 text-xs text-text-secondary">
          <div className="flex items-center space-x-2">
            <Icon name="Lock" size={12} />
            <span>256-bit SSL encryption</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="CreditCard" size={12} />
            <span>PCI DSS compliant</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="RefreshCw" size={12} />
            <span>Full refund policy</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSidebar;