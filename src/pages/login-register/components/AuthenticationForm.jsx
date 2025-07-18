import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const AuthenticationForm = ({ mode, onModeChange, onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    rememberMe: false,
    acceptTerms: false
  });
  const [errors, setErrors] = useState({});

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
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (mode === 'register') {
      if (!formData.firstName.trim()) {
        newErrors.firstName = 'First name is required';
      }
      if (!formData.lastName.trim()) {
        newErrors.lastName = 'Last name is required';
      }
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
      if (!formData.acceptTerms) {
        newErrors.acceptTerms = 'You must accept the terms and conditions';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    // Mock credentials for testing
    const mockCredentials = {
      login: { email: 'user@eventflow.com', password: 'password123' },
      admin: { email: 'admin@eventflow.com', password: 'admin123' }
    };
    
    if (mode === 'login') {
      const isValidUser = formData.email === mockCredentials.login.email && 
                         formData.password === mockCredentials.login.password;
      const isValidAdmin = formData.email === mockCredentials.admin.email && 
                          formData.password === mockCredentials.admin.password;
      
      if (!isValidUser && !isValidAdmin) {
        setErrors({ 
          submit: `Invalid credentials. Try: ${mockCredentials.login.email} / ${mockCredentials.login.password} or ${mockCredentials.admin.email} / ${mockCredentials.admin.password}` 
        });
        return;
      }
    }
    
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {mode === 'register' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="First Name"
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            placeholder="Enter your first name"
            error={errors.firstName}
            required
            disabled={isLoading}
          />
          <Input
            label="Last Name"
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            placeholder="Enter your last name"
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
        placeholder="Enter your email address"
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
        placeholder="Enter your password"
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
          placeholder="Confirm your password"
          error={errors.confirmPassword}
          required
          disabled={isLoading}
        />
      )}

      {mode === 'login' && (
        <div className="flex items-center justify-between">
          <Checkbox
            label="Remember me"
            name="rememberMe"
            checked={formData.rememberMe}
            onChange={handleInputChange}
            disabled={isLoading}
          />
          <button
            type="button"
            className="text-sm text-primary hover:text-primary/80 transition-colors duration-150"
            disabled={isLoading}
          >
            Forgot password?
          </button>
        </div>
      )}

      {mode === 'register' && (
        <Checkbox
          label={
            <span className="text-sm">
              I agree to the{' '}
              <a href="#" className="text-primary hover:text-primary/80 underline">
                Terms of Service
              </a>
              {' '}and{' '}
              <a href="#" className="text-primary hover:text-primary/80 underline">
                Privacy Policy
              </a>
            </span>
          }
          name="acceptTerms"
          checked={formData.acceptTerms}
          onChange={handleInputChange}
          error={errors.acceptTerms}
          required
          disabled={isLoading}
        />
      )}

      {errors.submit && (
        <div className="p-4 bg-error/10 border border-error/30 rounded-lg">
          <div className="flex items-start space-x-3">
            <Icon name="AlertCircle" size={20} className="text-error mt-0.5 flex-shrink-0" />
            <p className="text-error text-sm leading-relaxed">{errors.submit}</p>
          </div>
        </div>
      )}

      <Button
        type="submit"
        variant="default"
        fullWidth
        loading={isLoading}
        className="mt-8"
      >
        {mode === 'login' ? 'Sign In to EventFlow' : 'Create Your Account'}
      </Button>

      <div className="text-center">
        <p className="text-text-secondary text-sm">
          {mode === 'login' ? "Don't have an account?" : "Already have an account?"}
          {' '}
          <button
            type="button"
            onClick={onModeChange}
            className="text-primary hover:text-primary/80 font-medium transition-colors duration-150"
            disabled={isLoading}
          >
            {mode === 'login' ? 'Sign up for free' : 'Sign in instead'}
          </button>
        </p>
      </div>
    </form>
  );
};

export default AuthenticationForm;