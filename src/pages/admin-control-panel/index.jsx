import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import AdminSidebar from '../../components/ui/AdminSidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import MetricsCard from './components/MetricsCard';
import UserManagementTable from './components/UserManagementTable';
import EventOversightPanel from './components/EventOversightPanel';
import PaymentAdministration from './components/PaymentAdministration';
import SystemConfiguration from './components/SystemConfiguration';
import AuditLog from './components/AuditLog';

const AdminControlPanel = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every minute
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'BarChart3' },
    { id: 'users', label: 'Users', icon: 'Users' },
    { id: 'events', label: 'Events', icon: 'Calendar' },
    { id: 'payments', label: 'Payments', icon: 'CreditCard' },
    { id: 'system', label: 'System', icon: 'Settings' },
    { id: 'audit', label: 'Audit Log', icon: 'FileText' }
  ];

  const systemMetrics = [
    {
      title: 'Total Users',
      value: '12,847',
      change: '+8.2%',
      changeType: 'positive',
      icon: 'Users',
      color: 'primary'
    },
    {
      title: 'Active Events',
      value: '234',
      change: '+12.5%',
      changeType: 'positive',
      icon: 'Calendar',
      color: 'success'
    },
    {
      title: 'Total Revenue',
      value: '$847,293',
      change: '+15.3%',
      changeType: 'positive',
      icon: 'DollarSign',
      color: 'warning'
    },
    {
      title: 'System Health',
      value: '99.8%',
      change: '-0.1%',
      changeType: 'negative',
      icon: 'Activity',
      color: 'error'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'user_registration',
      message: 'New user registered: john.doe@email.com',
      timestamp: '2 minutes ago',
      icon: 'UserPlus',
      color: 'success'
    },
    {
      id: 2,
      type: 'event_created',
      message: 'Event "Summer Music Festival" created by Sarah Johnson',
      timestamp: '5 minutes ago',
      icon: 'Calendar',
      color: 'primary'
    },
    {
      id: 3,
      type: 'payment_processed',
      message: 'Payment of $150.00 processed successfully',
      timestamp: '8 minutes ago',
      icon: 'CreditCard',
      color: 'warning'
    },
    {
      id: 4,
      type: 'user_suspended',
      message: 'User account suspended: michael.chen@email.com',
      timestamp: '12 minutes ago',
      icon: 'UserX',
      color: 'error'
    },
    {
      id: 5,
      type: 'system_backup',
      message: 'Automated system backup completed',
      timestamp: '1 hour ago',
      icon: 'Database',
      color: 'success'
    }
  ];

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="glassmorphism-card p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Welcome back, Admin</h1>
            <p className="text-text-secondary">
              Here's what's happening with your platform today - {currentTime.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
          <div className="flex items-center space-x-2 mt-4 md:mt-0">
            <Button variant="outline" size="sm">
              <Icon name="Download" size={16} className="mr-2" />
              Export Report
            </Button>
            <Button variant="default" size="sm">
              <Icon name="Plus" size={16} className="mr-2" />
              Quick Action
            </Button>
          </div>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {systemMetrics.map((metric, index) => (
          <MetricsCard
            key={index}
            title={metric.title}
            value={metric.value}
            change={metric.change}
            changeType={metric.changeType}
            icon={metric.icon}
            color={metric.color}
          />
        ))}
      </div>

      {/* Dashboard Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <div className="glassmorphism-card p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">Recent Activity</h2>
              <Button variant="ghost" size="sm">
                <Icon name="MoreHorizontal" size={16} />
              </Button>
            </div>
            
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-white/5 transition-colors">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    activity.color === 'success' ? 'bg-success/20' :
                    activity.color === 'primary' ? 'bg-primary/20' :
                    activity.color === 'warning' ? 'bg-warning/20' :
                    activity.color === 'error' ? 'bg-error/20' : 'bg-muted/20'
                  }`}>
                    <Icon 
                      name={activity.icon} 
                      size={16} 
                      className={
                        activity.color === 'success' ? 'text-success' :
                        activity.color === 'primary' ? 'text-primary' :
                        activity.color === 'warning' ? 'text-warning' :
                        activity.color === 'error' ? 'text-error' : 'text-text-secondary'
                      }
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white">{activity.message}</p>
                    <p className="text-xs text-text-secondary mt-1">{activity.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-4 border-t border-purple-500/30">
              <Button variant="ghost" size="sm" fullWidth>
                View All Activities
                <Icon name="ArrowRight" size={16} className="ml-2" />
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="space-y-6">
          {/* System Status */}
          <div className="glassmorphism-card p-6">
            <h3 className="text-lg font-semibold text-white mb-4">System Status</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">Server Uptime</span>
                <span className="text-sm text-success">99.8%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">Database</span>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span className="text-sm text-success">Healthy</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">Payment Gateway</span>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span className="text-sm text-success">Online</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">Email Service</span>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-warning rounded-full"></div>
                  <span className="text-sm text-warning">Degraded</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="glassmorphism-card p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <Button variant="ghost" size="sm" fullWidth className="justify-start">
                <Icon name="UserPlus" size={16} className="mr-2" />
                Add New User
              </Button>
              <Button variant="ghost" size="sm" fullWidth className="justify-start">
                <Icon name="Calendar" size={16} className="mr-2" />
                Review Pending Events
              </Button>
              <Button variant="ghost" size="sm" fullWidth className="justify-start">
                <Icon name="AlertTriangle" size={16} className="mr-2" />
                View Flagged Content
              </Button>
              <Button variant="ghost" size="sm" fullWidth className="justify-start">
                <Icon name="Database" size={16} className="mr-2" />
                System Backup
              </Button>
            </div>
          </div>

          {/* Pending Tasks */}
          <div className="glassmorphism-card p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Pending Tasks</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-2 bg-warning/10 rounded-lg">
                <span className="text-sm text-white">Event Approvals</span>
                <span className="text-xs bg-warning/20 text-warning px-2 py-1 rounded-full">3</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-error/10 rounded-lg">
                <span className="text-sm text-white">User Reports</span>
                <span className="text-xs bg-error/20 text-error px-2 py-1 rounded-full">7</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-primary/10 rounded-lg">
                <span className="text-sm text-white">Payment Disputes</span>
                <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">2</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'users':
        return <UserManagementTable />;
      case 'events':
        return <EventOversightPanel />;
      case 'payments':
        return <PaymentAdministration />;
      case 'system':
        return <SystemConfiguration />;
      case 'audit':
        return <AuditLog />;
      default:
        return renderOverview();
    }
  };

  return (
    <>
      <Helmet>
        <title>Admin Control Panel - Gamon Society</title>
        <meta name="description" content="Comprehensive administrative interface for Gamon Society platform management" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <AdminSidebar />
        
        {/* Main Content */}
        <div className="lg:ml-64 pt-16">
          <div className="p-6">
            {/* Tab Navigation */}
            <div className="mb-8">
              <div className="border-b border-purple-500/30">
                <nav className="flex space-x-8 overflow-x-auto">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                        activeTab === tab.id
                          ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-white hover:border-purple-500/50'
                      }`}
                    >
                      <Icon name={tab.icon} size={16} />
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Tab Content */}
            <div className="min-h-[calc(100vh-200px)]">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminControlPanel;