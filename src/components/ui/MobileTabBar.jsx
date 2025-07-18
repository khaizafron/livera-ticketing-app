import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const MobileTabBar = () => {
  const location = useLocation();

  const tabItems = [
    { 
      label: 'Discover', 
      path: '/event-discovery-dashboard', 
      icon: 'Search',
      activeIcon: 'Search'
    },
    { 
      label: 'Tickets', 
      path: '/my-tickets-qr-codes', 
      icon: 'Ticket',
      activeIcon: 'Ticket'
    },
    { 
      label: 'Cart', 
      path: '/shopping-cart-checkout', 
      icon: 'ShoppingCart',
      activeIcon: 'ShoppingCart',
      badge: 2 // Example cart count
    },
    { 
      label: 'Profile', 
      path: '/login-register', 
      icon: 'User',
      activeIcon: 'User'
    },
  ];

  const isActive = (path) => location.pathname === path;

  // Don't show on admin pages
  if (location.pathname.startsWith('/admin-control-panel')) {
    return null;
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden glassmorphism border-t border-purple-500/30">
      <div className="grid grid-cols-4 h-16">
        {tabItems.map((item) => {
          const active = isActive(item.path);
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center space-y-1 transition-all duration-150 ripple-effect ${
                active 
                  ? 'text-primary' :'text-text-secondary hover:text-white'
              }`}
            >
              <div className="relative">
                <div className={`p-1 rounded-lg transition-all duration-150 ${
                  active ? 'bg-primary/10 scale-105' : 'hover:bg-white/5'
                }`}>
                  <Icon 
                    name={active ? item.activeIcon : item.icon} 
                    size={20}
                    strokeWidth={active ? 2.5 : 2}
                  />
                </div>
                
                {/* Badge */}
                {item.badge && item.badge > 0 && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-error rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-white">
                      {item.badge > 9 ? '9+' : item.badge}
                    </span>
                  </div>
                )}
              </div>
              
              <span className={`text-xs font-medium transition-all duration-150 ${
                active ? 'text-primary' : 'text-text-secondary'
              }`}>
                {item.label}
              </span>
              
              {/* Active Indicator */}
              {active && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-primary rounded-full"></div>
              )}
            </Link>
          );
        })}
      </div>
      
      {/* Safe area padding for devices with home indicator */}
      <div className="h-safe-area-inset-bottom bg-background/80"></div>
    </nav>
  );
};

export default MobileTabBar;