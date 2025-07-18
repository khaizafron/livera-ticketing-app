import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import AuthHeader from './components/AuthHeader';
import AuthModeToggle from './components/AuthModeToggle';
import AuthenticationForm from './components/AuthenticationForm';
import SocialAuthButtons from './components/SocialAuthButtons';
import ForgotPasswordModal from './components/ForgotPasswordModal';
import LoadingSkeleton from './components/LoadingSkeleton';

const LoginRegister = () => {
  const [mode, setMode] = useState('login');
  const [isLoading, setIsLoading] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate initial page load
    const timer = setTimeout(() => {
      setIsPageLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const handleModeChange = (newMode) => {
    if (newMode) {
      setMode(newMode);
    } else {
      setMode(mode === 'login' ? 'register' : 'login');
    }
  };

  const handleFormSubmit = async (formData) => {
    setIsLoading(true);
    
    try {
      // Simulate authentication API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Check if admin credentials
      if (formData.email === 'admin@eventflow.com') {
        navigate('/admin-control-panel');
      } else {
        navigate('/event-discovery-dashboard');
      }
    } catch (error) {
      console.error('Authentication failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialAuth = async (provider) => {
    setIsLoading(true);
    
    try {
      // Simulate social authentication
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log(`${provider} authentication successful`);
      navigate('/event-discovery-dashboard');
    } catch (error) {
      console.error(`${provider} authentication failed:`, error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isPageLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <LoadingSkeleton />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{mode === 'login' ? 'Sign In' : 'Create Account'} - EventFlow</title>
        <meta name="description" content={mode === 'login' ? 'Sign in to your EventFlow account to access tickets and manage bookings' : 'Create your EventFlow account to start booking tickets for amazing events'} />
      </Helmet>

      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Header */}
          <AuthHeader mode={mode} />

          {/* Main Authentication Card */}
          <div className="glassmorphism-card p-8">
            {/* Mode Toggle */}
            <AuthModeToggle 
              mode={mode} 
              onModeChange={handleModeChange} 
              isLoading={isLoading} 
            />

            {/* Authentication Form */}
            <AuthenticationForm
              mode={mode}
              onModeChange={handleModeChange}
              onSubmit={handleFormSubmit}
              isLoading={isLoading}
            />

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-purple-500/30"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-card text-text-secondary">Or continue with</span>
              </div>
            </div>

            {/* Social Authentication */}
            <SocialAuthButtons 
              onSocialAuth={handleSocialAuth} 
              isLoading={isLoading} 
            />
          </div>

          {/* Additional Links */}
          <div className="text-center mt-6 space-y-2">
            <p className="text-text-secondary text-sm">
              By continuing, you agree to our{' '}
              <a href="#" className="text-primary hover:text-primary/80 underline">
                Terms of Service
              </a>
              {' '}and{' '}
              <a href="#" className="text-primary hover:text-primary/80 underline">
                Privacy Policy
              </a>
            </p>
            
            {mode === 'login' && (
              <button
                type="button"
                onClick={() => setShowForgotPassword(true)}
                className="text-primary hover:text-primary/80 text-sm transition-colors duration-150"
                disabled={isLoading}
              >
                Forgot your password?
              </button>
            )}
          </div>
        </div>

        {/* Forgot Password Modal */}
        <ForgotPasswordModal
          isOpen={showForgotPassword}
          onClose={() => setShowForgotPassword(false)}
        />
      </div>
    </>
  );
};

export default LoginRegister;