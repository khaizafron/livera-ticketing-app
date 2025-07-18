import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TicketsTab = ({ event, onAddToCart }) => {
  const [selectedTickets, setSelectedTickets] = useState({});

  const handleQuantityChange = (ticketId, quantity) => {
    setSelectedTickets(prev => ({
      ...prev,
      [ticketId]: Math.max(0, Math.min(quantity, 10)) // Max 10 tickets per type
    }));
  };

  const handleAddToCart = (ticket) => {
    const quantity = selectedTickets[ticket.id] || 0;
    if (quantity > 0) {
      onAddToCart(ticket, quantity);
    }
  };

  const getTimeRemaining = (endDate) => {
    const now = new Date();
    const end = new Date(endDate);
    const diff = end - now;
    
    if (diff <= 0) return null;
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return { days, hours, minutes };
  };

  return (
    <div className="space-y-6">
      {/* Ticket Types */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {event.ticketTypes.map((ticket) => {
          const quantity = selectedTickets[ticket.id] || 0;
          const timeRemaining = ticket.saleEndDate ? getTimeRemaining(ticket.saleEndDate) : null;
          const isAvailable = ticket.available > 0 && (!ticket.saleEndDate || timeRemaining);
          
          return (
            <div key={ticket.id} className={`glassmorphism-card p-6 ${
              !isAvailable ? 'opacity-60' : ''
            }`}>
              {/* Ticket Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-lg font-semibold text-white">{ticket.name}</h3>
                    {ticket.isPopular && (
                      <span className="px-2 py-1 bg-accent/20 text-accent text-xs font-medium rounded-full border border-accent/30">
                        Popular
                      </span>
                    )}
                  </div>
                  <p className="text-text-secondary text-sm mb-2">{ticket.description}</p>
                  
                  {/* Price */}
                  <div className="flex items-baseline space-x-2">
                    <span className="text-2xl font-bold text-white">${ticket.price}</span>
                    {ticket.originalPrice && ticket.originalPrice > ticket.price && (
                      <span className="text-sm text-text-secondary line-through">${ticket.originalPrice}</span>
                    )}
                  </div>
                </div>
                
                {/* Ticket Icon */}
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  ticket.type === 'vip' ? 'bg-accent/20' :
                  ticket.type === 'early-bird'? 'bg-success/20' : 'bg-primary/20'
                }`}>
                  <Icon 
                    name={ticket.type === 'vip' ? 'Crown' : 'Ticket'} 
                    size={20} 
                    className={
                      ticket.type === 'vip' ? 'text-accent' :
                      ticket.type === 'early-bird'? 'text-success' : 'text-primary'
                    }
                  />
                </div>
              </div>

              {/* Countdown Timer */}
              {timeRemaining && (
                <div className="mb-4 p-3 bg-warning/10 border border-warning/30 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon name="Clock" size={16} className="text-warning" />
                    <span className="text-warning text-sm font-medium">Limited Time Offer</span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="text-center">
                      <div className="font-mono font-bold text-white">{timeRemaining.days}</div>
                      <div className="text-text-secondary">Days</div>
                    </div>
                    <div className="text-center">
                      <div className="font-mono font-bold text-white">{timeRemaining.hours}</div>
                      <div className="text-text-secondary">Hours</div>
                    </div>
                    <div className="text-center">
                      <div className="font-mono font-bold text-white">{timeRemaining.minutes}</div>
                      <div className="text-text-secondary">Minutes</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Features */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-white mb-2">Includes:</h4>
                <ul className="space-y-1">
                  {ticket.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2 text-sm text-text-secondary">
                      <Icon name="Check" size={14} className="text-success" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Availability */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-text-secondary">Available</span>
                  <span className={`font-medium ${
                    ticket.available > 50 ? 'text-success' :
                    ticket.available > 10 ? 'text-warning': 'text-error'
                  }`}>
                    {ticket.available} left
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      ticket.available > 50 ? 'bg-success' :
                      ticket.available > 10 ? 'bg-warning': 'bg-error'
                    }`}
                    style={{ width: `${Math.min((ticket.available / ticket.total) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>

              {/* Quantity Selector */}
              {isAvailable && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-text-secondary">Quantity:</span>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleQuantityChange(ticket.id, quantity - 1)}
                        disabled={quantity <= 0}
                        className="w-8 h-8"
                      >
                        <Icon name="Minus" size={14} />
                      </Button>
                      <span className="w-8 text-center font-medium text-white">{quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleQuantityChange(ticket.id, quantity + 1)}
                        disabled={quantity >= 10 || quantity >= ticket.available}
                        className="w-8 h-8"
                      >
                        <Icon name="Plus" size={14} />
                      </Button>
                    </div>
                  </div>
                  
                  <Button
                    variant="default"
                    onClick={() => handleAddToCart(ticket)}
                    disabled={quantity === 0}
                    iconName="ShoppingCart"
                    iconPosition="left"
                    className="ml-4"
                  >
                    Add to Cart
                  </Button>
                </div>
              )}

              {/* Sold Out State */}
              {!isAvailable && (
                <div className="text-center py-4">
                  <span className="text-error font-medium">
                    {ticket.available === 0 ? 'Sold Out' : 'Sale Ended'}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Pricing Information */}
      <div className="glassmorphism-card p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Pricing Information</h3>
        <div className="space-y-3 text-sm">
          <div className="flex items-center space-x-2 text-text-secondary">
            <Icon name="Info" size={16} />
            <span>All prices are in USD and include applicable taxes</span>
          </div>
          <div className="flex items-center space-x-2 text-text-secondary">
            <Icon name="CreditCard" size={16} />
            <span>Secure payment processing with 256-bit SSL encryption</span>
          </div>
          <div className="flex items-center space-x-2 text-text-secondary">
            <Icon name="RefreshCw" size={16} />
            <span>Refund policy: Full refund available up to 48 hours before event</span>
          </div>
          <div className="flex items-center space-x-2 text-text-secondary">
            <Icon name="Smartphone" size={16} />
            <span>Mobile tickets delivered instantly via email and SMS</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketsTab;