import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GlobalHeader from '../../components/ui/GlobalHeader';
import MobileTabBar from '../../components/ui/MobileTabBar';
import CartItem from './components/CartItem';
import PromoCodeInput from './components/PromoCodeInput';
import CheckoutProgress from './components/CheckoutProgress';
import PaymentMethods from './components/PaymentMethods';
import BillingForm from './components/BillingForm';
import OrderSummary from './components/OrderSummary';
import SuccessConfirmation from './components/SuccessConfirmation';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const ShoppingCartCheckout = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [cartItems, setCartItems] = useState([]);
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('card');
  const [billingInfo, setBillingInfo] = useState({});
  const [billingErrors, setBillingErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  // Mock cart data
  useEffect(() => {
    const mockCartItems = [
      {
        id: 1,
        eventTitle: "Summer Music Festival 2024",
        ticketType: "VIP Pass",
        eventDate: "July 20, 2024",
        eventTime: "6:00 PM",
        venue: "Central Park, New York",
        price: 149.99,
        quantity: 2,
        eventImage: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=300&fit=crop"
      },
      {
        id: 2,
        eventTitle: "Tech Conference 2024",
        ticketType: "Early Bird",
        eventDate: "August 15, 2024",
        eventTime: "9:00 AM",
        venue: "Convention Center, San Francisco",
        price: 89.99,
        quantity: 1,
        eventImage: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop"
      }
    ];
    setCartItems(mockCartItems);
  }, []);

  const handleUpdateQuantity = (itemId, newQuantity) => {
    setCartItems(prev => 
      prev.map(item => 
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (itemId) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
  };

  const handleApplyPromo = (promo) => {
    setAppliedPromo(promo);
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
  };

  const validateBillingInfo = () => {
    const errors = {};
    const required = ['firstName', 'lastName', 'email', 'phone', 'address1', 'city', 'state', 'zipCode', 'country'];
    
    required.forEach(field => {
      if (!billingInfo[field]?.trim()) {
        errors[field] = 'This field is required';
      }
    });

    if (billingInfo.email && !/\S+@\S+\.\S+/.test(billingInfo.email)) {
      errors.email = 'Please enter a valid email address';
    }

    setBillingErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePaymentSubmit = async (paymentMethod, paymentDetails) => {
    if (!validateBillingInfo()) {
      return;
    }

    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Create order details
      const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const promoDiscount = appliedPromo ? 
        (appliedPromo.type === 'percentage' ? 
          subtotal * (appliedPromo.discount / 100) : 
          appliedPromo.discount
        ) : 0;
      const discountedSubtotal = subtotal - promoDiscount;
      const tax = discountedSubtotal * 0.08;
      const total = discountedSubtotal + tax + 2.50;

      const orderData = {
        orderNumber: `EVT-${Date.now()}`,
        paymentMethod: paymentMethod === 'card' ? 'Credit Card' : 
                      paymentMethod === 'paypal' ? 'PayPal' :
                      paymentMethod === 'fpx' ? 'FPX Online Banking' : 'Touch \'n Go eWallet',
        total: total.toFixed(2),
        purchaseDate: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        email: billingInfo.email,
        tickets: cartItems.map(item => ({
          eventTitle: item.eventTitle,
          ticketType: item.ticketType,
          quantity: item.quantity,
          price: (item.price * item.quantity).toFixed(2),
          eventDate: item.eventDate
        }))
      };

      setOrderDetails(orderData);
      setCurrentStep(3);
    } catch (error) {
      console.error('Payment failed:', error);
      // Handle payment error
    } finally {
      setIsProcessing(false);
    }
  };

  const handleContinueToPayment = () => {
    if (cartItems.length === 0) {
      return;
    }
    setCurrentStep(2);
  };

  const handleBackToReview = () => {
    setCurrentStep(1);
  };

  if (cartItems.length === 0 && currentStep === 1) {
    return (
      <div className="min-h-screen bg-background">
        <GlobalHeader />
        <div className="pt-16 pb-20 lg:pb-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-surface rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon name="ShoppingCart" size={40} className="text-text-secondary" />
              </div>
              <h1 className="text-2xl font-bold text-white mb-4">Your cart is empty</h1>
              <p className="text-text-secondary mb-8">
                Discover amazing events and add tickets to your cart
              </p>
              <Button
                variant="default"
                onClick={() => navigate('/event-discovery-dashboard')}
                iconName="Search"
                iconPosition="left"
              >
                Explore Events
              </Button>
            </div>
          </div>
        </div>
        <MobileTabBar />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <GlobalHeader />
      <div className="pt-16 pb-20 lg:pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {currentStep < 3 && (
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">
                {currentStep === 1 ? 'Shopping Cart' : 'Checkout'}
              </h1>
              <p className="text-text-secondary">
                {currentStep === 1 
                  ? 'Review your selected tickets and proceed to checkout' :'Complete your purchase securely'
                }
              </p>
            </div>
          )}

          {currentStep < 3 && <CheckoutProgress currentStep={currentStep} />}

          {currentStep === 1 && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-white mb-4">
                    Your Tickets ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})
                  </h2>
                  {cartItems.map(item => (
                    <CartItem
                      key={item.id}
                      item={item}
                      onUpdateQuantity={handleUpdateQuantity}
                      onRemove={handleRemoveItem}
                    />
                  ))}
                </div>

                <PromoCodeInput
                  onApplyPromo={handleApplyPromo}
                  appliedPromo={appliedPromo}
                  onRemovePromo={handleRemovePromo}
                />

                <div className="flex justify-between items-center">
                  <Button
                    variant="outline"
                    onClick={() => navigate('/event-discovery-dashboard')}
                    iconName="ArrowLeft"
                    iconPosition="left"
                  >
                    Continue Shopping
                  </Button>
                  <Button
                    variant="default"
                    onClick={handleContinueToPayment}
                    iconName="ArrowRight"
                    iconPosition="right"
                  >
                    Proceed to Checkout
                  </Button>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <OrderSummary
                  cartItems={cartItems}
                  appliedPromo={appliedPromo}
                />
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Payment Form */}
              <div className="lg:col-span-2 space-y-6">
                <BillingForm
                  billingInfo={billingInfo}
                  onBillingChange={setBillingInfo}
                  errors={billingErrors}
                />

                <PaymentMethods
                  selectedMethod={selectedPaymentMethod}
                  onMethodChange={setSelectedPaymentMethod}
                  onPaymentSubmit={handlePaymentSubmit}
                  isProcessing={isProcessing}
                />

                <div className="flex justify-between items-center">
                  <Button
                    variant="outline"
                    onClick={handleBackToReview}
                    iconName="ArrowLeft"
                    iconPosition="left"
                    disabled={isProcessing}
                  >
                    Back to Review
                  </Button>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <OrderSummary
                  cartItems={cartItems}
                  appliedPromo={appliedPromo}
                />
              </div>
            </div>
          )}

          {currentStep === 3 && orderDetails && (
            <SuccessConfirmation orderDetails={orderDetails} />
          )}
        </div>
      </div>
      <MobileTabBar />
    </div>
  );
};

export default ShoppingCartCheckout;