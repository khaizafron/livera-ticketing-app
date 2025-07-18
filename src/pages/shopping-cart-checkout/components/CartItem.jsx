import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) {
      onRemove(item.id);
    } else {
      onUpdateQuantity(item.id, newQuantity);
    }
  };

  return (
    <div className="glassmorphism-card p-4 mb-4">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Event Image */}
        <div className="w-full sm:w-24 h-32 sm:h-24 rounded-lg overflow-hidden">
          <Image
            src={item.eventImage}
            alt={item.eventTitle}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Event Details */}
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-white mb-1 truncate">
            {item.eventTitle}
          </h3>
          <p className="text-text-secondary text-sm mb-2">
            {item.ticketType} • {item.eventDate} • {item.eventTime}
          </p>
          <p className="text-text-secondary text-sm mb-3">
            <Icon name="MapPin" size={14} className="inline mr-1" />
            {item.venue}
          </p>

          {/* Mobile Price Display */}
          <div className="sm:hidden flex items-center justify-between mb-3">
            <span className="text-primary font-semibold">
              ${item.price.toFixed(2)} each
            </span>
            <span className="text-white font-bold">
              ${(item.price * item.quantity).toFixed(2)}
            </span>
          </div>
        </div>

        {/* Desktop Price */}
        <div className="hidden sm:flex flex-col items-end justify-between">
          <span className="text-primary font-semibold">
            ${item.price.toFixed(2)}
          </span>
          <span className="text-white font-bold">
            ${(item.price * item.quantity).toFixed(2)}
          </span>
        </div>
      </div>

      {/* Quantity Controls & Remove */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-purple-500/30">
        <div className="flex items-center space-x-3">
          <span className="text-text-secondary text-sm">Quantity:</span>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleQuantityChange(item.quantity - 1)}
              className="w-8 h-8"
            >
              <Icon name="Minus" size={14} />
            </Button>
            <span className="w-8 text-center text-white font-medium">
              {item.quantity}
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleQuantityChange(item.quantity + 1)}
              className="w-8 h-8"
            >
              <Icon name="Plus" size={14} />
            </Button>
          </div>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => onRemove(item.id)}
          className="text-error hover:text-error hover:bg-error/10"
        >
          <Icon name="Trash2" size={16} className="mr-2" />
          Remove
        </Button>
      </div>
    </div>
  );
};

export default CartItem;