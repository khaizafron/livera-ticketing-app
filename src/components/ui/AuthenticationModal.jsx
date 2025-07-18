import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';
import Input from './Input';

const AuthenticationModal = ({ isOpen, onClose, defaultMode = 'login' }) => {
  const [mode, setMode] = useState(defaultMode);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    acceptTerms: false
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (mode === 'register') {
      if (!formData.firstName) {
        newErrors.firstName = 'First name is required';
      }
      if (!formData.lastName) {
        newErrors.lastName = 'Last name is required';
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
      if (!formData.acceptTerms) {
        newErrors.acceptTerms = 'Please accept the terms and conditions';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Handle successful authentication
      console.log(`${mode} successful:`, formData);
      onClose();
    } catch (error) {
      setErrors({ submit: 'Authentication failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialAuth = async (provider) => {
    setIsLoading(true);
    
    try {
      // Simulate social auth
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log(`${provider} authentication successful`);
      onClose();
    } catch (error) {
      setErrors({ submit: `${provider} authentication failed` });
    } finally {
      setIsLoading(false);
    }
  };

  const switchMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
    setErrors({});
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      acceptTerms: false
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-md glassmorphism-card p-6 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute top-4 right-4 text-text-secondary hover:text-white"
        >
          <Icon name="X" size={18} />
        </Button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center neon-glow">
              <Icon name="Zap" size={24} color="white" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            {mode === 'login' ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-text-secondary">
            {mode === 'login' ?'Sign in to access your tickets and events' :'Join EventFlow to discover amazing events'
            }
          </p>
        </div>

        {/* Social Authentication */}
        <div className="space-y-3 mb-6">
          <Button
            variant="outline"
            fullWidth
            onClick={() => handleSocialAuth('Google')}
            disabled={isLoading}
            className="justify-center"
          >
            <Icon name="Chrome" size={18} className="mr-2" />
            Continue with Google
          </Button>
          <Button
            variant="outline"
            fullWidth
            onClick={() => handleSocialAuth('Facebook')}
            disabled={isLoading}
            className="justify-center"
          >
            <Icon name="Facebook" size={18} className="mr-2" />
            Continue with Facebook
          </Button>
        </div>

        {/* Divider */}
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-purple-500/30"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-card text-text-secondary">Or continue with email</span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                error={errors.firstName}
                required
                disabled={isLoading}
              />
              <Input
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                error={errors.lastName}
                required
                disabled={isLoading}
              />
            </div>
          )}

          <Input
            label="Email Address"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            error={errors.email}
            required
            disabled={isLoading}
          />

          <Input
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            error={errors.password}
            required
            disabled={isLoading}
          />

          {mode === 'register' && (
            <Input
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              error={errors.confirmPassword}
              required
              disabled={isLoading}
            />
          )}

          {mode === 'register' && (
            <div className="flex items-start space-x-2">
              <input
                type="checkbox"
                id="acceptTerms"
                name="acceptTerms"
                checked={formData.acceptTerms}
                onChange={handleInputChange}
                className="mt-1 w-4 h-4 text-primary bg-surface border-purple-500/30 rounded focus:ring-primary focus:ring-2"
                disabled={isLoading}
              />
              <label htmlFor="acceptTerms" className="text-sm text-text-secondary">
                I agree to the{' '}
                <a href="#" className="text-primary hover:underline">Terms of Service</a>
                {' '}and{' '}
                <a href="#" className="text-primary hover:underline">Privacy Policy</a>
              </label>
            </div>
          )}

          {errors.acceptTerms && (
            <p className="text-error text-sm">{errors.acceptTerms}</p>
          )}

          {errors.submit && (
            <div className="p-3 bg-error/10 border border-error/30 rounded-lg">
              <p className="text-error text-sm">{errors.submit}</p>
            </div>
          )}

          <Button
            type="submit"
            variant="default"
            fullWidth
            loading={isLoading}
            className="mt-6"
          >
            {mode === 'login' ? 'Sign In' : 'Create Account'}
          </Button>
        </form>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-text-secondary">
            {mode === 'login' ? "Don't have an account?" : "Already have an account?"}
            {' '}
            <button
              type="button"
              onClick={switchMode}
              className="text-primary hover:underline font-medium"
              disabled={isLoading}
            >
              {mode === 'login' ? 'Sign up' : 'Sign in'}
            </button>
          </p>
          
          {mode === 'login' && (
            <button
              type="button"
              className="text-primary hover:underline text-sm mt-2"
              disabled={isLoading}
            >
              Forgot your password?
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthenticationModal;