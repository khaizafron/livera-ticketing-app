import React from 'react';
import Icon from '../../../components/AppIcon';

const CheckoutProgress = ({ currentStep }) => {
  const steps = [
    { id: 1, label: 'Review', icon: 'ShoppingCart' },
    { id: 2, label: 'Payment', icon: 'CreditCard' },
    { id: 3, label: 'Confirmation', icon: 'CheckCircle' }
  ];

  return (
    <div className="glassmorphism-card p-4 mb-6">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className="flex items-center space-x-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                step.id < currentStep 
                  ? 'bg-success text-white' 
                  : step.id === currentStep
                    ? 'bg-primary text-white neon-glow' :'bg-surface border border-purple-500/30 text-text-secondary'
              }`}>
                {step.id < currentStep ? (
                  <Icon name="Check" size={16} />
                ) : (
                  <Icon name={step.icon} size={16} />
                )}
              </div>
              <span className={`hidden sm:block text-sm font-medium transition-colors duration-300 ${
                step.id <= currentStep ? 'text-white' : 'text-text-secondary'
              }`}>
                {step.label}
              </span>
            </div>
            
            {index < steps.length - 1 && (
              <div className={`flex-1 h-0.5 mx-4 transition-colors duration-300 ${
                step.id < currentStep ? 'bg-success' : 'bg-purple-500/30'
              }`} />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default CheckoutProgress;