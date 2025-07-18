import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const BillingForm = ({ billingInfo, onBillingChange, errors }) => {
  const countryOptions = [
    { value: 'US', label: 'United States' },
    { value: 'CA', label: 'Canada' },
    { value: 'GB', label: 'United Kingdom' },
    { value: 'AU', label: 'Australia' },
    { value: 'MY', label: 'Malaysia' },
    { value: 'SG', label: 'Singapore' },
    { value: 'IN', label: 'India' },
    { value: 'DE', label: 'Germany' },
    { value: 'FR', label: 'France' },
    { value: 'JP', label: 'Japan' }
  ];

  const stateOptions = {
    US: [
      { value: 'CA', label: 'California' },
      { value: 'NY', label: 'New York' },
      { value: 'TX', label: 'Texas' },
      { value: 'FL', label: 'Florida' },
      { value: 'IL', label: 'Illinois' }
    ],
    CA: [
      { value: 'ON', label: 'Ontario' },
      { value: 'BC', label: 'British Columbia' },
      { value: 'AB', label: 'Alberta' },
      { value: 'QC', label: 'Quebec' }
    ]
  };

  const handleInputChange = (field, value) => {
    onBillingChange({ ...billingInfo, [field]: value });
  };

  return (
    <div className="glassmorphism-card p-4">
      <h3 className="text-white font-semibold mb-4">Billing Information</h3>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="First Name"
            type="text"
            placeholder="John"
            value={billingInfo.firstName || ''}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
            error={errors.firstName}
            required
          />
          <Input
            label="Last Name"
            type="text"
            placeholder="Doe"
            value={billingInfo.lastName || ''}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
            error={errors.lastName}
            required
          />
        </div>

        <Input
          label="Email Address"
          type="email"
          placeholder="john.doe@example.com"
          value={billingInfo.email || ''}
          onChange={(e) => handleInputChange('email', e.target.value)}
          error={errors.email}
          required
        />

        <Input
          label="Phone Number"
          type="tel"
          placeholder="+1 (555) 123-4567"
          value={billingInfo.phone || ''}
          onChange={(e) => handleInputChange('phone', e.target.value)}
          error={errors.phone}
          required
        />

        <Input
          label="Address Line 1"
          type="text"
          placeholder="123 Main Street"
          value={billingInfo.address1 || ''}
          onChange={(e) => handleInputChange('address1', e.target.value)}
          error={errors.address1}
          required
        />

        <Input
          label="Address Line 2 (Optional)"
          type="text"
          placeholder="Apartment, suite, etc."
          value={billingInfo.address2 || ''}
          onChange={(e) => handleInputChange('address2', e.target.value)}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            label="City"
            type="text"
            placeholder="New York"
            value={billingInfo.city || ''}
            onChange={(e) => handleInputChange('city', e.target.value)}
            error={errors.city}
            required
          />
          
          <Select
            label="State/Province"
            placeholder="Select state"
            options={stateOptions[billingInfo.country] || []}
            value={billingInfo.state || ''}
            onChange={(value) => handleInputChange('state', value)}
            error={errors.state}
            disabled={!billingInfo.country || !stateOptions[billingInfo.country]}
          />
          
          <Input
            label="ZIP/Postal Code"
            type="text"
            placeholder="10001"
            value={billingInfo.zipCode || ''}
            onChange={(e) => handleInputChange('zipCode', e.target.value)}
            error={errors.zipCode}
            required
          />
        </div>

        <Select
          label="Country"
          placeholder="Select country"
          options={countryOptions}
          value={billingInfo.country || ''}
          onChange={(value) => handleInputChange('country', value)}
          error={errors.country}
          required
        />
      </div>
    </div>
  );
};

export default BillingForm;