import React from 'react';
import Icon from '../../../components/AppIcon';

const AuthHeader = ({ mode }) => {
  return (
    <div className="text-center mb-8">
      <div className="flex justify-center mb-6">
        <div className="relative">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center neon-glow">
            <Icon name="Zap" size={32} color="white" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-2xl blur-md opacity-50"></div>
        </div>
      </div>
      
      <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
        {mode === 'login' ? 'Welcome Back' : 'Join Gamon Society'}
      </h1>
      
      <p className="text-text-secondary text-lg max-w-md mx-auto leading-relaxed">
        {mode === 'login' ?'Sign in to access your tickets, manage bookings, and discover amazing events' :'Create your account to start booking tickets and never miss an event again'
        }
      </p>
    </div>
  );
};

export default AuthHeader;