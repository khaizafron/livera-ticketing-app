import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ShareModal = ({ isOpen, onClose, event }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const eventUrl = `${window.location.origin}/event-details-booking?id=${event.id}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(eventUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const shareOptions = [
    {
      name: 'Facebook',
      icon: 'Facebook',
      color: 'text-blue-500',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(eventUrl)}`
    },
    {
      name: 'Twitter',
      icon: 'Twitter',
      color: 'text-blue-400',
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(eventUrl)}&text=${encodeURIComponent(`Check out this amazing event: ${event.title}`)}`
    },
    {
      name: 'LinkedIn',
      icon: 'Linkedin',
      color: 'text-blue-600',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(eventUrl)}`
    },
    {
      name: 'WhatsApp',
      icon: 'MessageCircle',
      color: 'text-green-500',
      url: `https://wa.me/?text=${encodeURIComponent(`Check out this event: ${event.title} ${eventUrl}`)}`
    },
    {
      name: 'Telegram',
      icon: 'Send',
      color: 'text-blue-500',
      url: `https://t.me/share/url?url=${encodeURIComponent(eventUrl)}&text=${encodeURIComponent(event.title)}`
    },
    {
      name: 'Email',
      icon: 'Mail',
      color: 'text-gray-400',
      url: `mailto:?subject=${encodeURIComponent(event.title)}&body=${encodeURIComponent(`Check out this event: ${event.title}\n\n${eventUrl}`)}`
    }
  ];

  const handleShare = (url) => {
    window.open(url, '_blank', 'width=600,height=400');
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-md glassmorphism-card p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Share Event</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-text-secondary hover:text-white"
          >
            <Icon name="X" size={18} />
          </Button>
        </div>

        {/* Event Preview */}
        <div className="mb-6 p-4 bg-white/5 rounded-lg">
          <h3 className="font-medium text-white mb-1">{event.title}</h3>
          <p className="text-text-secondary text-sm mb-2">
            {new Date(event.date).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
          <p className="text-text-secondary text-sm">{event.venue.name}, {event.venue.city}</p>
        </div>

        {/* Share Options */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {shareOptions.map((option) => (
            <button
              key={option.name}
              onClick={() => handleShare(option.url)}
              className="flex flex-col items-center space-y-2 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors duration-150"
            >
              <Icon name={option.icon} size={24} className={option.color} />
              <span className="text-white text-xs font-medium">{option.name}</span>
            </button>
          ))}
        </div>

        {/* Copy Link */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-white">Event Link</label>
          <div className="flex space-x-2">
            <input
              type="text"
              value={eventUrl}
              readOnly
              className="flex-1 px-3 py-2 bg-surface border border-purple-500/30 rounded-lg text-white text-sm focus:outline-none focus:border-primary"
            />
            <Button
              variant="outline"
              onClick={handleCopyLink}
              iconName={copied ? "Check" : "Copy"}
              className={copied ? "text-success border-success" : ""}
            >
              {copied ? 'Copied!' : 'Copy'}
            </Button>
          </div>
        </div>

        {/* QR Code Option */}
        <div className="mt-6 pt-6 border-t border-purple-500/30">
          <Button
            variant="outline"
            fullWidth
            iconName="QrCode"
            iconPosition="left"
            onClick={() => {
              // Generate QR code functionality would go here
              alert('QR code generation feature coming soon!');
            }}
          >
            Generate QR Code
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;