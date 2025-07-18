import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const PaymentMethods = ({ selectedMethod, onMethodChange, onPaymentSubmit, isProcessing }) => {
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  });
  const [errors, setErrors] = useState({});

  const paymentMethods = [
    {
      id: 'card',
      name: 'Credit/Debit Card',
      icon: 'CreditCard',
      description: 'Visa, Mastercard, American Express'
    },
    {
      id: 'paypal',
      name: 'PayPal',
      icon: 'Wallet',
      description: 'Pay with your PayPal account'
    },
    {
      id: 'fpx',
      name: 'FPX Online Banking',
      icon: 'Building2',
      description: 'Malaysian online banking'
    },
    {
      id: 'tng',
      name: 'Touch \'n Go eWallet',
      icon: 'Smartphone',
      description: 'Pay with TNG eWallet'
    }
  ];

  const handleCardInputChange = (field, value) => {
    setCardDetails(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value) => {
    const v = value.replace(/\D/g, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const validateCardForm = () => {
    const newErrors = {};
    
    if (!cardDetails.cardNumber || cardDetails.cardNumber.replace(/\s/g, '').length < 16) {
      newErrors.cardNumber = 'Please enter a valid card number';
    }
    if (!cardDetails.expiryDate || cardDetails.expiryDate.length < 5) {
      newErrors.expiryDate = 'Please enter a valid expiry date';
    }
    if (!cardDetails.cvv || cardDetails.cvv.length < 3) {
      newErrors.cvv = 'Please enter a valid CVV';
    }
    if (!cardDetails.cardholderName.trim()) {
      newErrors.cardholderName = 'Please enter the cardholder name';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (selectedMethod === 'card' && !validateCardForm()) {
      return;
    }
    onPaymentSubmit(selectedMethod, cardDetails);
  };

  return (
    <div className="space-y-6">
      {/* Payment Method Selection */}
      <div className="glassmorphism-card p-4">
        <h3 className="text-white font-semibold mb-4">Payment Method</h3>
        <div className="space-y-3">
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              onClick={() => onMethodChange(method.id)}
              className={`p-3 rounded-lg border cursor-pointer transition-all duration-150 hover:scale-102 ${
                selectedMethod === method.id
                  ? 'border-primary bg-primary/10 neon-glow' :'border-purple-500/30 hover:border-primary/50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  selectedMethod === method.id ? 'bg-primary' : 'bg-surface'
                }`}>
                  <Icon 
                    name={method.icon} 
                    size={16} 
                    className={selectedMethod === method.id ? 'text-white' : 'text-text-secondary'}
                  />
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium">{method.name}</p>
                  <p className="text-text-secondary text-sm">{method.description}</p>
                </div>
                <div className={`w-4 h-4 rounded-full border-2 ${
                  selectedMethod === method.id
                    ? 'border-primary bg-primary' :'border-purple-500/30'
                }`}>
                  {selectedMethod === method.id && (
                    <div className="w-full h-full rounded-full bg-white scale-50" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Card Details Form */}
      {selectedMethod === 'card' && (
        <div className="glassmorphism-card p-4">
          <h3 className="text-white font-semibold mb-4">Card Details</h3>
          <div className="space-y-4">
            <Input
              label="Card Number"
              type="text"
              placeholder="1234 5678 9012 3456"
              value={cardDetails.cardNumber}
              onChange={(e) => handleCardInputChange('cardNumber', formatCardNumber(e.target.value))}
              error={errors.cardNumber}
              maxLength={19}
              disabled={isProcessing}
            />
            
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Expiry Date"
                type="text"
                placeholder="MM/YY"
                value={cardDetails.expiryDate}
                onChange={(e) => handleCardInputChange('expiryDate', formatExpiryDate(e.target.value))}
                error={errors.expiryDate}
                maxLength={5}
                disabled={isProcessing}
              />
              <Input
                label="CVV"
                type="text"
                placeholder="123"
                value={cardDetails.cvv}
                onChange={(e) => handleCardInputChange('cvv', e.target.value.replace(/\D/g, ''))}
                error={errors.cvv}
                maxLength={4}
                disabled={isProcessing}
              />
            </div>
            
            <Input
              label="Cardholder Name"
              type="text"
              placeholder="John Doe"
              value={cardDetails.cardholderName}
              onChange={(e) => handleCardInputChange('cardholderName', e.target.value)}
              error={errors.cardholderName}
              disabled={isProcessing}
            />
          </div>
        </div>
      )}

      {/* Security Badges */}
      <div className="glassmorphism-card p-4">
        <div className="flex items-center justify-center space-x-6">
          <div className="flex items-center space-x-2">
            <Icon name="Shield" size={16} className="text-success" />
            <span className="text-text-secondary text-sm">SSL Secured</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Lock" size={16} className="text-success" />
            <span className="text-text-secondary text-sm">256-bit Encryption</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="CheckCircle" size={16} className="text-success" />
            <span className="text-text-secondary text-sm">PCI Compliant</span>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <Button
        variant="default"
        fullWidth
        onClick={handleSubmit}
        loading={isProcessing}
        className="h-12 text-lg font-semibold"
      >
        {isProcessing ? 'Processing Payment...' : 'Complete Purchase'}
      </Button>
    </div>
  );
};

export default PaymentMethods;