import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const AdminSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedSections, setExpandedSections] = useState(['dashboard']);
  const location = useLocation();

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const isActive = (path) => location.pathname === path;
  const isSectionExpanded = (sectionId) => expandedSections.includes(sectionId);

  const navigationSections = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: 'LayoutDashboard',
      items: [
        { label: 'Overview', path: '/admin-control-panel', icon: 'BarChart3' },
        { label: 'Analytics', path: '/admin-control-panel/analytics', icon: 'TrendingUp' },
        { label: 'Reports', path: '/admin-control-panel/reports', icon: 'FileText' },
      ]
    },
    {
      id: 'events',
      label: 'Event Management',
      icon: 'Calendar',
      items: [
        { label: 'All Events', path: '/admin-control-panel/events', icon: 'List' },
        { label: 'Create Event', path: '/admin-control-panel/events/create', icon: 'Plus' },
        { label: 'Categories', path: '/admin-control-panel/categories', icon: 'Tag' },
        { label: 'Venues', path: '/admin-control-panel/venues', icon: 'MapPin' },
      ]
    },
    {
      id: 'tickets',
      label: 'Ticket Management',
      icon: 'Ticket',
      items: [
        { label: 'All Tickets', path: '/admin-control-panel/tickets', icon: 'Ticket' },
        { label: 'Pricing', path: '/admin-control-panel/pricing', icon: 'DollarSign' },
        { label: 'Discounts', path: '/admin-control-panel/discounts', icon: 'Percent' },
        { label: 'Check-ins', path: '/admin-control-panel/checkins', icon: 'QrCode' },
      ]
    },
    {
      id: 'users',
      label: 'User Management',
      icon: 'Users',
      items: [
        { label: 'All Users', path: '/admin-control-panel/users', icon: 'Users' },
        { label: 'Organizers', path: '/admin-control-panel/organizers', icon: 'UserCheck' },
        { label: 'Permissions', path: '/admin-control-panel/permissions', icon: 'Shield' },
      ]
    },
    {
      id: 'finance',
      label: 'Financial',
      icon: 'CreditCard',
      items: [
        { label: 'Transactions', path: '/admin-control-panel/transactions', icon: 'Receipt' },
        { label: 'Payouts', path: '/admin-control-panel/payouts', icon: 'Banknote' },
        { label: 'Refunds', path: '/admin-control-panel/refunds', icon: 'RotateCcw' },
      ]
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: 'Settings',
      items: [
        { label: 'Platform Settings', path: '/admin-control-panel/settings', icon: 'Settings' },
        { label: 'Integrations', path: '/admin-control-panel/integrations', icon: 'Plug' },
        { label: 'Security', path: '/admin-control-panel/security', icon: 'Lock' },
      ]
    }
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={`fixed left-0 top-16 bottom-0 z-40 glassmorphism border-r border-purple-500/30 transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-64'
      } hidden lg:block`}>
        <div className="flex flex-col h-full">
          {/* Collapse Toggle */}
          <div className="p-4 border-b border-purple-500/30">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleCollapse}
              className="w-full text-text-secondary hover:text-white hover:bg-white/5"
            >
              <Icon name={isCollapsed ? "ChevronRight" : "ChevronLeft"} size={18} />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-2">
            {navigationSections.map((section) => (
              <div key={section.id} className="space-y-1">
                {/* Section Header */}
                <Button
                  variant="ghost"
                  onClick={() => !isCollapsed && toggleSection(section.id)}
                  className={`w-full justify-start text-text-secondary hover:text-white hover:bg-white/5 ${
                    isCollapsed ? 'px-2' : 'px-3'
                  }`}
                >
                  <Icon name={section.icon} size={18} />
                  {!isCollapsed && (
                    <>
                      <span className="ml-3 font-medium">{section.label}</span>
                      <Icon 
                        name="ChevronDown" 
                        size={16} 
                        className={`ml-auto transition-transform duration-150 ${
                          isSectionExpanded(section.id) ? 'rotate-180' : ''
                        }`}
                      />
                    </>
                  )}
                </Button>

                {/* Section Items */}
                {(!isCollapsed && isSectionExpanded(section.id)) && (
                  <div className="ml-6 space-y-1">
                    {section.items.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-150 hover:scale-102 ${
                          isActive(item.path)
                            ? 'text-primary bg-primary/10 border border-primary/30 neon-glow' :'text-text-secondary hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <Icon name={item.icon} size={16} />
                        <span className="text-sm font-medium">{item.label}</span>
                      </Link>
                    ))}
                  </div>
                )}

                {/* Collapsed Tooltip Items */}
                {isCollapsed && (
                  <div className="relative group">
                    <div className="absolute left-full top-0 ml-2 w-48 glassmorphism-card p-2 space-y-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      <div className="px-3 py-1 text-xs font-semibold text-primary border-b border-purple-500/30 mb-2">
                        {section.label}
                      </div>
                      {section.items.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-150 ${
                            isActive(item.path)
                              ? 'text-primary bg-primary/10' :'text-text-secondary hover:text-white hover:bg-white/5'
                          }`}
                        >
                          <Icon name={item.icon} size={14} />
                          <span className="text-sm">{item.label}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t border-purple-500/30">
            <div className={`flex items-center space-x-3 ${isCollapsed ? 'justify-center' : ''}`}>
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                <Icon name="User" size={16} color="white" />
              </div>
              {!isCollapsed && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">Admin User</p>
                  <p className="text-xs text-text-secondary truncate">admin@eventflow.com</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      <div className="lg:hidden">
        {/* Mobile sidebar would be implemented as a drawer/modal overlay */}
        {/* This would typically be controlled by a global state or context */}
      </div>
    </>
  );
};

export default AdminSidebar;