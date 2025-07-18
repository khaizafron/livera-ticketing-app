import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const AuditLog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAction, setFilterAction] = useState('all');
  const [filterUser, setFilterUser] = useState('all');
  const [dateRange, setDateRange] = useState('7days');

  const auditLogs = [
    {
      id: 1,
      timestamp: "2025-01-17T14:30:00Z",
      user: "Emily Davis",
      userRole: "Admin",
      action: "User Suspended",
      target: "Michael Chen",
      targetType: "User",
      details: "Suspended user account due to policy violation",
      ipAddress: "192.168.1.100",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      severity: "high"
    },
    {
      id: 2,
      timestamp: "2025-01-17T13:45:00Z",
      user: "Emily Davis",
      userRole: "Admin",
      action: "Event Approved",
      target: "Summer Music Festival 2025",
      targetType: "Event",
      details: "Approved event after content review",
      ipAddress: "192.168.1.100",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      severity: "medium"
    },
    {
      id: 3,
      timestamp: "2025-01-17T12:20:00Z",
      user: "System",
      userRole: "System",
      action: "Payment Processed",
      target: "TXN-2025-001",
      targetType: "Transaction",
      details: "Automatic payment processing completed successfully",
      ipAddress: "127.0.0.1",
      userAgent: "EventFlow-System/1.0",
      severity: "low"
    },
    {
      id: 4,
      timestamp: "2025-01-17T11:15:00Z",
      user: "Emily Davis",
      userRole: "Admin",
      action: "Settings Updated",
      target: "Platform Settings",
      targetType: "Configuration",
      details: "Updated email notification settings",
      ipAddress: "192.168.1.100",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      severity: "medium"
    },
    {
      id: 5,
      timestamp: "2025-01-17T10:30:00Z",
      user: "John Admin",
      userRole: "Super Admin",
      action: "User Role Changed",
      target: "Sarah Johnson",
      targetType: "User",
      details: "Changed user role from User to Organizer",
      ipAddress: "192.168.1.50",
      userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
      severity: "high"
    },
    {
      id: 6,
      timestamp: "2025-01-17T09:45:00Z",
      user: "System",
      userRole: "System",
      action: "Backup Created",
      target: "Database Backup",
      targetType: "System",
      details: "Automated daily database backup completed",
      ipAddress: "127.0.0.1",
      userAgent: "EventFlow-System/1.0",
      severity: "low"
    },
    {
      id: 7,
      timestamp: "2025-01-17T08:20:00Z",
      user: "Emily Davis",
      userRole: "Admin",
      action: "Event Rejected",
      target: "Unauthorized Party Event",
      targetType: "Event",
      details: "Rejected event due to inappropriate content",
      ipAddress: "192.168.1.100",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      severity: "high"
    },
    {
      id: 8,
      timestamp: "2025-01-16T16:30:00Z",
      user: "John Admin",
      userRole: "Super Admin",
      action: "Refund Processed",
      target: "TXN-2025-004",
      targetType: "Transaction",
      details: "Manual refund processed for cancelled event",
      ipAddress: "192.168.1.50",
      userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
      severity: "medium"
    }
  ];

  const getActionIcon = (action) => {
    const icons = {
      'User Suspended': 'UserX',
      'Event Approved': 'CheckCircle',
      'Payment Processed': 'CreditCard',
      'Settings Updated': 'Settings',
      'User Role Changed': 'UserCheck',
      'Backup Created': 'Database',
      'Event Rejected': 'XCircle',
      'Refund Processed': 'RotateCcw'
    };
    return icons[action] || 'Activity';
  };

  const getSeverityColor = (severity) => {
    const colors = {
      'high': 'bg-error/20 text-error border-error/30',
      'medium': 'bg-warning/20 text-warning border-warning/30',
      'low': 'bg-success/20 text-success border-success/30'
    };
    return colors[severity] || 'bg-muted/20 text-text-secondary border-muted/30';
  };

  const getTargetTypeIcon = (type) => {
    const icons = {
      'User': 'User',
      'Event': 'Calendar',
      'Transaction': 'CreditCard',
      'Configuration': 'Settings',
      'System': 'Server'
    };
    return icons[type] || 'File';
  };

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.target.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.details.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAction = filterAction === 'all' || log.action.toLowerCase().includes(filterAction.toLowerCase());
    const matchesUser = filterUser === 'all' || log.user === filterUser;
    return matchesSearch && matchesAction && matchesUser;
  });

  const uniqueUsers = [...new Set(auditLogs.map(log => log.user))];
  const uniqueActions = [...new Set(auditLogs.map(log => log.action))];

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glassmorphism-card p-4">
          <div className="flex items-center justify-between mb-2">
            <Icon name="Activity" size={20} className="text-primary" />
            <span className="text-xs text-primary">Today</span>
          </div>
          <h3 className="text-2xl font-bold text-white">
            {auditLogs.filter(log => new Date(log.timestamp).toDateString() === new Date().toDateString()).length}
          </h3>
          <p className="text-sm text-text-secondary">Total Actions</p>
        </div>

        <div className="glassmorphism-card p-4">
          <div className="flex items-center justify-between mb-2">
            <Icon name="AlertTriangle" size={20} className="text-error" />
            <span className="text-xs text-error">High Priority</span>
          </div>
          <h3 className="text-2xl font-bold text-white">
            {auditLogs.filter(log => log.severity === 'high').length}
          </h3>
          <p className="text-sm text-text-secondary">Critical Actions</p>
        </div>

        <div className="glassmorphism-card p-4">
          <div className="flex items-center justify-between mb-2">
            <Icon name="Users" size={20} className="text-accent" />
            <span className="text-xs text-accent">Active</span>
          </div>
          <h3 className="text-2xl font-bold text-white">{uniqueUsers.length}</h3>
          <p className="text-sm text-text-secondary">Admin Users</p>
        </div>

        <div className="glassmorphism-card p-4">
          <div className="flex items-center justify-between mb-2">
            <Icon name="Database" size={20} className="text-success" />
            <span className="text-xs text-success">Automated</span>
          </div>
          <h3 className="text-2xl font-bold text-white">
            {auditLogs.filter(log => log.user === 'System').length}
          </h3>
          <p className="text-sm text-text-secondary">System Actions</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
        <div className="flex-1 max-w-md">
          <Input
            type="search"
            placeholder="Search logs by action, target, user, or details..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={filterAction}
            onChange={(e) => setFilterAction(e.target.value)}
            className="px-3 py-2 bg-surface border border-purple-500/30 rounded-lg text-white text-sm focus:outline-none focus:border-primary"
          >
            <option value="all">All Actions</option>
            {uniqueActions.map(action => (
              <option key={action} value={action.toLowerCase()}>{action}</option>
            ))}
          </select>
          
          <select
            value={filterUser}
            onChange={(e) => setFilterUser(e.target.value)}
            className="px-3 py-2 bg-surface border border-purple-500/30 rounded-lg text-white text-sm focus:outline-none focus:border-primary"
          >
            <option value="all">All Users</option>
            {uniqueUsers.map(user => (
              <option key={user} value={user}>{user}</option>
            ))}
          </select>
          
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-2 bg-surface border border-purple-500/30 rounded-lg text-white text-sm focus:outline-none focus:border-primary"
          >
            <option value="7days">Last 7 days</option>
            <option value="30days">Last 30 days</option>
            <option value="90days">Last 90 days</option>
            <option value="1year">Last year</option>
          </select>
          
          <Button variant="outline" size="sm">
            <Icon name="Download" size={16} className="mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="glassmorphism-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-purple-500/30">
              <tr>
                <th className="text-left p-4 text-text-secondary font-medium">Timestamp</th>
                <th className="text-left p-4 text-text-secondary font-medium">User</th>
                <th className="text-left p-4 text-text-secondary font-medium">Action</th>
                <th className="text-left p-4 text-text-secondary font-medium">Target</th>
                <th className="text-left p-4 text-text-secondary font-medium">Details</th>
                <th className="text-left p-4 text-text-secondary font-medium">Severity</th>
                <th className="text-right p-4 text-text-secondary font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log) => (
                <tr key={log.id} className="border-b border-purple-500/10 hover:bg-white/5 transition-colors">
                  <td className="p-4">
                    <div className="text-sm">
                      <p className="text-white font-medium">
                        {new Date(log.timestamp).toLocaleDateString()}
                      </p>
                      <p className="text-text-secondary">
                        {new Date(log.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                        <Icon name="User" size={14} color="white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">{log.user}</p>
                        <p className="text-xs text-text-secondary">{log.userRole}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <Icon name={getActionIcon(log.action)} size={16} className="text-primary" />
                      <span className="text-sm text-white">{log.action}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <Icon name={getTargetTypeIcon(log.targetType)} size={14} className="text-text-secondary" />
                      <div>
                        <p className="text-sm text-white">{log.target}</p>
                        <p className="text-xs text-text-secondary">{log.targetType}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <p className="text-sm text-text-secondary line-clamp-2 max-w-xs">
                      {log.details}
                    </p>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getSeverityColor(log.severity)}`}>
                      {log.severity}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end space-x-2">
                      <Button variant="ghost" size="icon" title="View Details">
                        <Icon name="Eye" size={16} />
                      </Button>
                      <Button variant="ghost" size="icon" title="More Options">
                        <Icon name="MoreHorizontal" size={16} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="flex items-center justify-between p-4 border-t border-purple-500/30">
          <p className="text-sm text-text-secondary">
            Showing 1 to {filteredLogs.length} of {auditLogs.length} log entries
          </p>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" disabled>
              <Icon name="ChevronLeft" size={16} />
            </Button>
            <Button variant="outline" size="sm" className="bg-primary/20 text-primary">
              1
            </Button>
            <Button variant="outline" size="sm" disabled>
              <Icon name="ChevronRight" size={16} />
            </Button>
          </div>
        </div>
      </div>

      {/* Empty State */}
      {filteredLogs.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Search" size={48} className="mx-auto text-text-secondary mb-4" />
          <h3 className="text-lg font-medium text-white mb-2">No audit logs found</h3>
          <p className="text-text-secondary">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default AuditLog;