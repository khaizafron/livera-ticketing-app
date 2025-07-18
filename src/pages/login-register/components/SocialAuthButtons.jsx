import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SocialAuthButtons = ({ onSocialAuth, isLoading }) => {
  const socialProviders = [
    {
      name: 'Google',
      icon: 'Chrome',
      color: 'text-white',
      bgColor: 'hover:bg-white/5'
    },
    {
      name: 'Apple',
      icon: 'Apple',
      color: 'text-white',
      bgColor: 'hover:bg-white/5'
    },
    {
      name: 'Facebook',
      icon: 'Facebook',
      color: 'text-white',
      bgColor: 'hover:bg-white/5'
    }
  ];

  return (
    <div className="space-y-3">
      {socialProviders.map((provider) => (
        <Button
          key={provider.name}
          variant="outline"
          fullWidth
          onClick={() => onSocialAuth(provider.name)}
          disabled={isLoading}
          className={`justify-center ${provider.bgColor} border-purple-500/30 hover:border-primary/50 transition-all duration-150`}
        >
          <Icon name={provider.icon} size={18} className={`mr-3 ${provider.color}`} />
          <span className="text-white">Continue with {provider.name}</span>
        </Button>
      ))}
    </div>
  );
};

export default SocialAuthButtons;