import React from 'react';
import Icon from '../../../components/AppIcon';

const OrderSummary = ({ cartItems, appliedPromo, taxRate = 0.08 }) => {
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  const promoDiscount = appliedPromo ? 
    (appliedPromo.type === 'percentage' ? 
      subtotal * (appliedPromo.discount / 100) : 
      appliedPromo.discount
    ) : 0;
  
  const discountedSubtotal = subtotal - promoDiscount;
  const tax = discountedSubtotal * taxRate;
  const total = discountedSubtotal + tax;

  return (
    <div className="glassmorphism-card p-4 sticky top-20">
      <h3 className="text-white font-semibold mb-4">Order Summary</h3>
      
      {/* Items */}
      <div className="space-y-3 mb-4">
        {cartItems.map((item) => (
          <div key={item.id} className="flex justify-between items-start">
            <div className="flex-1 min-w-0 mr-3">
              <p className="text-white text-sm font-medium truncate">
                {item.eventTitle}
              </p>
              <p className="text-text-secondary text-xs">
                {item.ticketType} × {item.quantity}
              </p>
            </div>
            <span className="text-white text-sm font-medium">
              ${(item.price * item.quantity).toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      <div className="border-t border-purple-500/30 pt-4 space-y-3">
        {/* Subtotal */}
        <div className="flex justify-between items-center">
          <span className="text-text-secondary">Subtotal</span>
          <span className="text-white">${subtotal.toFixed(2)}</span>
        </div>

        {/* Promo Discount */}
        {appliedPromo && (
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Icon name="Tag" size={14} className="text-success" />
              <span className="text-success text-sm">
                {appliedPromo.code}
              </span>
            </div>
            <span className="text-success">
              -${promoDiscount.toFixed(2)}
            </span>
          </div>
        )}

        {/* Tax */}
        <div className="flex justify-between items-center">
          <span className="text-text-secondary">Tax (8%)</span>
          <span className="text-white">${tax.toFixed(2)}</span>
        </div>

        {/* Processing Fee */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-1">
            <span className="text-text-secondary">Processing Fee</span>
            <Icon name="Info" size={12} className="text-text-secondary" />
          </div>
          <span className="text-white">$2.50</span>
        </div>

        {/* Total */}
        <div className="border-t border-purple-500/30 pt-3">
          <div className="flex justify-between items-center">
            <span className="text-white font-semibold text-lg">Total</span>
            <span className="text-primary font-bold text-xl">
              ${(total + 2.50).toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Security Notice */}
      <div className="mt-4 pt-4 border-t border-purple-500/30">
        <div className="flex items-center space-x-2 text-text-secondary text-xs">
          <Icon name="Shield" size={12} className="text-success" />
          <span>Your payment information is secure and encrypted</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;