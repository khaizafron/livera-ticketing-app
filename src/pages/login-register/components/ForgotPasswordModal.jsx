import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ForgotPasswordModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setError('Email address is required');
      return;
    }
    
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSubmitted(true);
    } catch (error) {
      setError('Failed to send reset email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setEmail('');
    setError('');
    setIsSubmitted(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-md glassmorphism-card p-6">
        {/* Close Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={handleClose}
          className="absolute top-4 right-4 text-text-secondary hover:text-white"
        >
          <Icon name="X" size={18} />
        </Button>

        {!isSubmitted ? (
          <>
            {/* Header */}
            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Key" size={24} className="text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Reset Password</h2>
              <p className="text-text-secondary">
                Enter your email address and we'll send you a link to reset your password.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                error={error}
                required
                disabled={isLoading}
              />

              <Button
                type="submit"
                variant="default"
                fullWidth
                loading={isLoading}
                className="mt-6"
              >
                Send Reset Link
              </Button>
            </form>
          </>
        ) : (
          <>
            {/* Success State */}
            <div className="text-center">
              <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="CheckCircle" size={24} className="text-success" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Check Your Email</h2>
              <p className="text-text-secondary mb-6">
                We've sent a password reset link to <strong className="text-white">{email}</strong>
              </p>
              <p className="text-sm text-text-secondary mb-6">
                Didn't receive the email? Check your spam folder or try again.
              </p>
              
              <Button
                variant="outline"
                fullWidth
                onClick={handleClose}
              >
                Back to Sign In
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordModal;