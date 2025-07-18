import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const StickyMobileBooking = ({ event, selectedTickets, onUpdateTickets }) => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);

  const calculateSubtotal = () => {
    return Object.entries(selectedTickets).reduce((total, [ticketId, quantity]) => {
      const ticket = event.ticketTypes.find(t => t.id === ticketId);
      return total + (ticket ? ticket.price * quantity : 0);
    }, 0);
  };

  const getTotalTickets = () => {
    return Object.values(selectedTickets).reduce((total, quantity) => total + quantity, 0);
  };

  const subtotal = calculateSubtotal();
  const totalTickets = getTotalTickets();
  const hasSelectedTickets = totalTickets > 0;

  const handleProceedToCheckout = () => {
    if (hasSelectedTickets) {
      const serviceFee = subtotal * 0.05;
      const total = subtotal + serviceFee;
      
      navigate('/shopping-cart-checkout', {
        state: {
          event,
          selectedTickets,
          subtotal,
          discount: 0,
          serviceFee,
          total,
          promoCode: null
        }
      });
    }
  };

  const handleQuantityChange = (ticketId, quantity) => {
    const updatedTickets = { ...selectedTickets };
    if (quantity === 0) {
      delete updatedTickets[ticketId];
    } else {
      updatedTickets[ticketId] = quantity;
    }
    onUpdateTickets(updatedTickets);
  };

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 glassmorphism border-t border-purple-500/30">
      {/* Expanded View */}
      {isExpanded && hasSelectedTickets && (
        <div className="p-4 border-b border-purple-500/30 max-h-80 overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-white">Selected Tickets</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsExpanded(false)}
              className="text-text-secondary hover:text-white"
            >
              <Icon name="ChevronDown" size={18} />
            </Button>
          </div>
          
          <div className="space-y-3">
            {Object.entries(selectedTickets).map(([ticketId, quantity]) => {
              const ticket = event.ticketTypes.find(t => t.id === ticketId);
              if (!ticket) return null;

              return (
                <div key={ticketId} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div className="flex-1">
                    <p className="text-white font-medium text-sm">{ticket.name}</p>
                    <p className="text-text-secondary text-xs">${ticket.price} each</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleQuantityChange(ticketId, quantity - 1)}
                      className="w-8 h-8"
                    >
                      <Icon name="Minus" size={14} />
                    </Button>
                    <span className="w-8 text-center text-white text-sm">{quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleQuantityChange(ticketId, quantity + 1)}
                      className="w-8 h-8"
                    >
                      <Icon name="Plus" size={14} />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Main Bar */}
      <div className="p-4">
        <div className="flex items-center justify-between">
          {/* Left Side - Ticket Summary */}
          <div className="flex-1">
            {hasSelectedTickets ? (
              <div 
                className="flex items-center space-x-2 cursor-pointer"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                <div className="flex items-center space-x-1">
                  <Icon name="Ticket" size={16} className="text-primary" />
                  <span className="text-white font-medium text-sm">
                    {totalTickets} ticket{totalTickets !== 1 ? 's' : ''}
                  </span>
                </div>
                <Icon name="ChevronUp" size={16} className="text-text-secondary" />
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Icon name="Ticket" size={16} className="text-text-secondary" />
                <span className="text-text-secondary text-sm">No tickets selected</span>
              </div>
            )}
            
            {hasSelectedTickets && (
              <p className="text-text-secondary text-xs mt-1">
                Total: ${subtotal.toFixed(2)}
              </p>
            )}
          </div>

          {/* Right Side - Action Button */}
          <Button
            variant="default"
            onClick={handleProceedToCheckout}
            disabled={!hasSelectedTickets}
            iconName="ArrowRight"
            iconPosition="right"
            className={`${hasSelectedTickets ? 'neon-glow' : ''}`}
          >
            {hasSelectedTickets ? 'Checkout' : 'Select Tickets'}
          </Button>
        </div>
      </div>

      {/* Safe area padding for devices with home indicator */}
      <div className="h-safe-area-inset-bottom bg-background/80"></div>
    </div>
  );
};

export default StickyMobileBooking;