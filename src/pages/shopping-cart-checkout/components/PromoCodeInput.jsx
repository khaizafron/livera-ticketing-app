import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const PromoCodeInput = ({ onApplyPromo, appliedPromo, onRemovePromo }) => {
  const [promoCode, setPromoCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleApplyPromo = async () => {
    if (!promoCode.trim()) {
      setError('Please enter a promo code');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock promo code validation
      const validPromoCodes = {
        'SAVE20': { discount: 20, type: 'percentage', description: '20% off your order' },
        'FIRST10': { discount: 10, type: 'fixed', description: '$10 off first purchase' },
        'STUDENT15': { discount: 15, type: 'percentage', description: '15% student discount' },
        'WELCOME': { discount: 5, type: 'fixed', description: '$5 welcome bonus' }
      };

      const promo = validPromoCodes[promoCode.toUpperCase()];
      
      if (promo) {
        onApplyPromo({
          code: promoCode.toUpperCase(),
          ...promo
        });
        setPromoCode('');
      } else {
        setError('Invalid promo code. Please try again.');
      }
    } catch (err) {
      setError('Failed to apply promo code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemovePromo = () => {
    onRemovePromo();
    setError('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleApplyPromo();
    }
  };

  if (appliedPromo) {
    return (
      <div className="glassmorphism-card p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-success/20 rounded-full flex items-center justify-center">
              <Icon name="Check" size={16} className="text-success" />
            </div>
            <div>
              <p className="text-white font-medium">
                Promo Code: {appliedPromo.code}
              </p>
              <p className="text-text-secondary text-sm">
                {appliedPromo.description}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRemovePromo}
            className="text-error hover:text-error hover:bg-error/10"
          >
            <Icon name="X" size={16} />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="glassmorphism-card p-4">
      <h3 className="text-white font-medium mb-3">Promo Code</h3>
      <div className="flex space-x-2">
        <div className="flex-1">
          <Input
            type="text"
            placeholder="Enter promo code"
            value={promoCode}
            onChange={(e) => {
              setPromoCode(e.target.value);
              setError('');
            }}
            onKeyPress={handleKeyPress}
            error={error}
            disabled={isLoading}
            className="mb-0"
          />
        </div>
        <Button
          variant="outline"
          onClick={handleApplyPromo}
          loading={isLoading}
          disabled={!promoCode.trim()}
        >
          Apply
        </Button>
      </div>
      
      {/* Sample Promo Codes */}
      <div className="mt-3 pt-3 border-t border-purple-500/30">
        <p className="text-text-secondary text-xs mb-2">Try these codes:</p>
        <div className="flex flex-wrap gap-2">
          {['SAVE20', 'FIRST10', 'STUDENT15'].map((code) => (
            <button
              key={code}
              onClick={() => setPromoCode(code)}
              className="px-2 py-1 bg-primary/10 text-primary text-xs rounded border border-primary/30 hover:bg-primary/20 transition-colors duration-150"
            >
              {code}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PromoCodeInput;