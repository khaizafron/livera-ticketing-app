import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const SystemConfiguration = () => {
  const [activeTab, setActiveTab] = useState('platform');
  const [settings, setSettings] = useState({
    platform: {
      siteName: 'EventFlow',
      siteDescription: 'Comprehensive event ticketing and management platform',
      maintenanceMode: false,
      registrationEnabled: true,
      emailVerificationRequired: true,
      maxEventsPerOrganizer: 50,
      defaultEventDuration: 4,
      autoApproveEvents: false
    },
    email: {
      smtpHost: 'smtp.eventflow.com',
      smtpPort: 587,
      smtpUsername: 'noreply@eventflow.com',
      smtpPassword: '••••••••',
      fromName: 'EventFlow',
      fromEmail: 'noreply@eventflow.com',
      enableWelcomeEmail: true,
      enableTicketConfirmation: true,
      enableEventReminders: true,
      reminderHours: 24
    },
    whatsapp: {
      apiKey: '••••••••••••••••',
      businessNumber: '+1234567890',
      enableConfirmations: true,
      enableReminders: false,
      enableBroadcasts: true,
      templateLanguage: 'en'
    },
    payment: {
      stripePublishableKey: 'pk_test_••••••••••••••••',
      stripeSecretKey: 'sk_test_••••••••••••••••',
      paypalClientId: '••••••••••••••••',
      paypalClientSecret: '••••••••••••••••',
      enableStripe: true,
      enablePaypal: true,
      enableTNG: false,
      processingFee: 2.9,
      fixedFee: 0.30,
      currency: 'USD'
    },
    security: {
      sessionTimeout: 30,
      maxLoginAttempts: 5,
      lockoutDuration: 15,
      requireStrongPasswords: true,
      enableTwoFactor: false,
      allowedFileTypes: 'jpg,jpeg,png,pdf',
      maxFileSize: 10,
      enableRateLimiting: true,
      rateLimit: 100
    }
  });

  const tabs = [
    { id: 'platform', label: 'Platform Settings', icon: 'Settings' },
    { id: 'email', label: 'Email Configuration', icon: 'Mail' },
    { id: 'whatsapp', label: 'WhatsApp Settings', icon: 'MessageCircle' },
    { id: 'payment', label: 'Payment Gateways', icon: 'CreditCard' },
    { id: 'security', label: 'Security & Privacy', icon: 'Shield' }
  ];

  const handleInputChange = (tab, field, value) => {
    setSettings(prev => ({
      ...prev,
      [tab]: {
        ...prev[tab],
        [field]: value
      }
    }));
  };

  const handleSave = () => {
    console.log('Saving settings:', settings);
  };

  const handleTestEmail = () => {
    console.log('Testing email configuration...');
  };

  const handleTestWhatsApp = () => {
    console.log('Testing WhatsApp configuration...');
  };

  const renderPlatformSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Site Name"
          value={settings.platform.siteName}
          onChange={(e) => handleInputChange('platform', 'siteName', e.target.value)}
          description="The name of your platform"
        />
        <Input
          label="Max Events per Organizer"
          type="number"
          value={settings.platform.maxEventsPerOrganizer}
          onChange={(e) => handleInputChange('platform', 'maxEventsPerOrganizer', parseInt(e.target.value))}
          description="Maximum events an organizer can create"
        />
      </div>

      <Input
        label="Site Description"
        value={settings.platform.siteDescription}
        onChange={(e) => handleInputChange('platform', 'siteDescription', e.target.value)}
        description="Brief description of your platform"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Default Event Duration (hours)"
          type="number"
          value={settings.platform.defaultEventDuration}
          onChange={(e) => handleInputChange('platform', 'defaultEventDuration', parseInt(e.target.value))}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Platform Controls</h3>
        <div className="space-y-3">
          <Checkbox
            label="Maintenance Mode"
            description="Temporarily disable the platform for maintenance"
            checked={settings.platform.maintenanceMode}
            onChange={(e) => handleInputChange('platform', 'maintenanceMode', e.target.checked)}
          />
          <Checkbox
            label="User Registration Enabled"
            description="Allow new users to register"
            checked={settings.platform.registrationEnabled}
            onChange={(e) => handleInputChange('platform', 'registrationEnabled', e.target.checked)}
          />
          <Checkbox
            label="Email Verification Required"
            description="Require email verification for new accounts"
            checked={settings.platform.emailVerificationRequired}
            onChange={(e) => handleInputChange('platform', 'emailVerificationRequired', e.target.checked)}
          />
          <Checkbox
            label="Auto-approve Events"
            description="Automatically approve new events without manual review"
            checked={settings.platform.autoApproveEvents}
            onChange={(e) => handleInputChange('platform', 'autoApproveEvents', e.target.checked)}
          />
        </div>
      </div>
    </div>
  );

  const renderEmailSettings = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">SMTP Configuration</h3>
        <Button variant="outline" size="sm" onClick={handleTestEmail}>
          <Icon name="Send" size={16} className="mr-2" />
          Test Connection
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="SMTP Host"
          value={settings.email.smtpHost}
          onChange={(e) => handleInputChange('email', 'smtpHost', e.target.value)}
        />
        <Input
          label="SMTP Port"
          type="number"
          value={settings.email.smtpPort}
          onChange={(e) => handleInputChange('email', 'smtpPort', parseInt(e.target.value))}
        />
        <Input
          label="SMTP Username"
          value={settings.email.smtpUsername}
          onChange={(e) => handleInputChange('email', 'smtpUsername', e.target.value)}
        />
        <Input
          label="SMTP Password"
          type="password"
          value={settings.email.smtpPassword}
          onChange={(e) => handleInputChange('email', 'smtpPassword', e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="From Name"
          value={settings.email.fromName}
          onChange={(e) => handleInputChange('email', 'fromName', e.target.value)}
        />
        <Input
          label="From Email"
          type="email"
          value={settings.email.fromEmail}
          onChange={(e) => handleInputChange('email', 'fromEmail', e.target.value)}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Email Notifications</h3>
        <div className="space-y-3">
          <Checkbox
            label="Welcome Email"
            description="Send welcome email to new users"
            checked={settings.email.enableWelcomeEmail}
            onChange={(e) => handleInputChange('email', 'enableWelcomeEmail', e.target.checked)}
          />
          <Checkbox
            label="Ticket Confirmation"
            description="Send confirmation email after ticket purchase"
            checked={settings.email.enableTicketConfirmation}
            onChange={(e) => handleInputChange('email', 'enableTicketConfirmation', e.target.checked)}
          />
          <Checkbox
            label="Event Reminders"
            description="Send reminder emails before events"
            checked={settings.email.enableEventReminders}
            onChange={(e) => handleInputChange('email', 'enableEventReminders', e.target.checked)}
          />
        </div>
        
        {settings.email.enableEventReminders && (
          <Input
            label="Reminder Hours Before Event"
            type="number"
            value={settings.email.reminderHours}
            onChange={(e) => handleInputChange('email', 'reminderHours', parseInt(e.target.value))}
            className="max-w-xs"
          />
        )}
      </div>
    </div>
  );

  const renderWhatsAppSettings = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">WhatsApp Business API</h3>
        <Button variant="outline" size="sm" onClick={handleTestWhatsApp}>
          <Icon name="MessageCircle" size={16} className="mr-2" />
          Test Connection
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="API Key"
          type="password"
          value={settings.whatsapp.apiKey}
          onChange={(e) => handleInputChange('whatsapp', 'apiKey', e.target.value)}
          description="Your WhatsApp Business API key"
        />
        <Input
          label="Business Phone Number"
          value={settings.whatsapp.businessNumber}
          onChange={(e) => handleInputChange('whatsapp', 'businessNumber', e.target.value)}
          description="Include country code (e.g., +1234567890)"
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">WhatsApp Notifications</h3>
        <div className="space-y-3">
          <Checkbox
            label="Ticket Confirmations"
            description="Send WhatsApp confirmation after ticket purchase"
            checked={settings.whatsapp.enableConfirmations}
            onChange={(e) => handleInputChange('whatsapp', 'enableConfirmations', e.target.checked)}
          />
          <Checkbox
            label="Event Reminders"
            description="Send WhatsApp reminders before events"
            checked={settings.whatsapp.enableReminders}
            onChange={(e) => handleInputChange('whatsapp', 'enableReminders', e.target.checked)}
          />
          <Checkbox
            label="Broadcast Messages"
            description="Allow broadcast messages to ticket holders"
            checked={settings.whatsapp.enableBroadcasts}
            onChange={(e) => handleInputChange('whatsapp', 'enableBroadcasts', e.target.checked)}
          />
        </div>
      </div>
    </div>
  );

  const renderPaymentSettings = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Payment Providers</h3>
        
        {/* Stripe */}
        <div className="glassmorphism-card p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Icon name="CreditCard" size={20} className="text-primary" />
              <h4 className="font-medium text-white">Stripe</h4>
            </div>
            <Checkbox
              checked={settings.payment.enableStripe}
              onChange={(e) => handleInputChange('payment', 'enableStripe', e.target.checked)}
            />
          </div>
          
          {settings.payment.enableStripe && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Publishable Key"
                value={settings.payment.stripePublishableKey}
                onChange={(e) => handleInputChange('payment', 'stripePublishableKey', e.target.value)}
              />
              <Input
                label="Secret Key"
                type="password"
                value={settings.payment.stripeSecretKey}
                onChange={(e) => handleInputChange('payment', 'stripeSecretKey', e.target.value)}
              />
            </div>
          )}
        </div>

        {/* PayPal */}
        <div className="glassmorphism-card p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Icon name="Wallet" size={20} className="text-accent" />
              <h4 className="font-medium text-white">PayPal</h4>
            </div>
            <Checkbox
              checked={settings.payment.enablePaypal}
              onChange={(e) => handleInputChange('payment', 'enablePaypal', e.target.checked)}
            />
          </div>
          
          {settings.payment.enablePaypal && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Client ID"
                value={settings.payment.paypalClientId}
                onChange={(e) => handleInputChange('payment', 'paypalClientId', e.target.value)}
              />
              <Input
                label="Client Secret"
                type="password"
                value={settings.payment.paypalClientSecret}
                onChange={(e) => handleInputChange('payment', 'paypalClientSecret', e.target.value)}
              />
            </div>
          )}
        </div>

        {/* TNG eWallet */}
        <div className="glassmorphism-card p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Icon name="Smartphone" size={20} className="text-success" />
              <h4 className="font-medium text-white">TNG eWallet</h4>
            </div>
            <Checkbox
              checked={settings.payment.enableTNG}
              onChange={(e) => handleInputChange('payment', 'enableTNG', e.target.checked)}
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Fee Configuration</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Input
            label="Processing Fee (%)"
            type="number"
            step="0.1"
            value={settings.payment.processingFee}
            onChange={(e) => handleInputChange('payment', 'processingFee', parseFloat(e.target.value))}
          />
          <Input
            label="Fixed Fee ($)"
            type="number"
            step="0.01"
            value={settings.payment.fixedFee}
            onChange={(e) => handleInputChange('payment', 'fixedFee', parseFloat(e.target.value))}
          />
          <Input
            label="Currency"
            value={settings.payment.currency}
            onChange={(e) => handleInputChange('payment', 'currency', e.target.value)}
          />
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Authentication & Sessions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Input
            label="Session Timeout (minutes)"
            type="number"
            value={settings.security.sessionTimeout}
            onChange={(e) => handleInputChange('security', 'sessionTimeout', parseInt(e.target.value))}
          />
          <Input
            label="Max Login Attempts"
            type="number"
            value={settings.security.maxLoginAttempts}
            onChange={(e) => handleInputChange('security', 'maxLoginAttempts', parseInt(e.target.value))}
          />
          <Input
            label="Lockout Duration (minutes)"
            type="number"
            value={settings.security.lockoutDuration}
            onChange={(e) => handleInputChange('security', 'lockoutDuration', parseInt(e.target.value))}
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Password & Security</h3>
        <div className="space-y-3">
          <Checkbox
            label="Require Strong Passwords"
            description="Enforce minimum 8 characters with mixed case, numbers, and symbols"
            checked={settings.security.requireStrongPasswords}
            onChange={(e) => handleInputChange('security', 'requireStrongPasswords', e.target.checked)}
          />
          <Checkbox
            label="Enable Two-Factor Authentication"
            description="Allow users to enable 2FA for their accounts"
            checked={settings.security.enableTwoFactor}
            onChange={(e) => handleInputChange('security', 'enableTwoFactor', e.target.checked)}
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">File Upload Security</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Allowed File Types"
            value={settings.security.allowedFileTypes}
            onChange={(e) => handleInputChange('security', 'allowedFileTypes', e.target.value)}
            description="Comma-separated list (e.g., jpg,png,pdf)"
          />
          <Input
            label="Max File Size (MB)"
            type="number"
            value={settings.security.maxFileSize}
            onChange={(e) => handleInputChange('security', 'maxFileSize', parseInt(e.target.value))}
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Rate Limiting</h3>
        <div className="flex items-center space-x-4">
          <Checkbox
            label="Enable Rate Limiting"
            checked={settings.security.enableRateLimiting}
            onChange={(e) => handleInputChange('security', 'enableRateLimiting', e.target.checked)}
          />
          {settings.security.enableRateLimiting && (
            <Input
              label="Requests per minute"
              type="number"
              value={settings.security.rateLimit}
              onChange={(e) => handleInputChange('security', 'rateLimit', parseInt(e.target.value))}
              className="max-w-xs"
            />
          )}
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'platform':
        return renderPlatformSettings();
      case 'email':
        return renderEmailSettings();
      case 'whatsapp':
        return renderWhatsAppSettings();
      case 'payment':
        return renderPaymentSettings();
      case 'security':
        return renderSecuritySettings();
      default:
        return renderPlatformSettings();
    }
  };

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="border-b border-purple-500/30">
        <nav className="flex space-x-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-white hover:border-purple-500/50'
              }`}
            >
              <Icon name={tab.icon} size={16} />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="min-h-[600px]">
        {renderTabContent()}
      </div>

      {/* Save Button */}
      <div className="flex justify-end pt-6 border-t border-purple-500/30">
        <Button variant="default" onClick={handleSave}>
          <Icon name="Save" size={16} className="mr-2" />
          Save Configuration
        </Button>
      </div>
    </div>
  );
};

export default SystemConfiguration;