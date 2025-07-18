import React from 'react';

const AuthModeToggle = ({ mode, onModeChange, isLoading }) => {
  return (
    <div className="flex bg-surface rounded-lg p-1 mb-8">
      <button
        type="button"
        onClick={() => onModeChange('login')}
        disabled={isLoading}
        className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-all duration-150 ${
          mode === 'login' ?'bg-primary text-white shadow-lg shadow-primary/20' :'text-text-secondary hover:text-white hover:bg-white/5'
        }`}
      >
        Sign In
      </button>
      <button
        type="button"
        onClick={() => onModeChange('register')}
        disabled={isLoading}
        className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-all duration-150 ${
          mode === 'register' ?'bg-primary text-white shadow-lg shadow-primary/20' :'text-text-secondary hover:text-white hover:bg-white/5'
        }`}
      >
        Sign Up
      </button>
    </div>
  );
};

export default AuthModeToggle;