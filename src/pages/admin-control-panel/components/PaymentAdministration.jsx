import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const PaymentAdministration = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [dateRange, setDateRange] = useState('7days');

  const transactions = [
    {
      id: "TXN-2025-001",
      user: "John Smith",
      userEmail: "john.smith@email.com",
      event: "Summer Music Festival 2025",
      amount: 150.00,
      status: "Completed",
      paymentMethod: "Credit Card",
      provider: "Stripe",
      date: "2025-01-17T10:30:00Z",
      refundable: true,
      disputed: false
    },
    {
      id: "TXN-2025-002",
      user: "Sarah Johnson",
      userEmail: "sarah.johnson@email.com",
      event: "Tech Conference 2025",
      amount: 299.99,
      status: "Pending",
      paymentMethod: "PayPal",
      provider: "PayPal",
      date: "2025-01-17T09:15:00Z",
      refundable: false,
      disputed: false
    },
    {
      id: "TXN-2025-003",
      user: "Michael Chen",
      userEmail: "michael.chen@email.com",
      event: "Food & Wine Festival",
      amount: 75.50,
      status: "Failed",
      paymentMethod: "Credit Card",
      provider: "Stripe",
      date: "2025-01-17T08:45:00Z",
      refundable: false,
      disputed: false
    },
    {
      id: "TXN-2025-004",
      user: "Emily Davis",
      userEmail: "emily.davis@email.com",
      event: "Art Gallery Opening",
      amount: 45.00,
      status: "Refunded",
      paymentMethod: "TNG eWallet",
      provider: "TNG",
      date: "2025-01-16T16:20:00Z",
      refundable: false,
      disputed: false
    },
    {
      id: "TXN-2025-005",
      user: "David Wilson",
      userEmail: "david.wilson@email.com",
      event: "Marathon Championship",
      amount: 89.99,
      status: "Disputed",
      paymentMethod: "Credit Card",
      provider: "Stripe",
      date: "2025-01-16T14:10:00Z",
      refundable: true,
      disputed: true
    }
  ];

  const getStatusColor = (status) => {
    const colors = {
      'Completed': 'bg-success/20 text-success border-success/30',
      'Pending': 'bg-warning/20 text-warning border-warning/30',
      'Failed': 'bg-error/20 text-error border-error/30',
      'Refunded': 'bg-muted/20 text-text-secondary border-muted/30',
      'Disputed': 'bg-error/20 text-error border-error/30'
    };
    return colors[status] || 'bg-muted/20 text-text-secondary border-muted/30';
  };

  const getProviderIcon = (provider) => {
    const icons = {
      'Stripe': 'CreditCard',
      'PayPal': 'Wallet',
      'TNG': 'Smartphone'
    };
    return icons[provider] || 'CreditCard';
  };

  const handleRefund = (transactionId) => {
    console.log('Processing refund for:', transactionId);
  };

  const handleDispute = (transactionId) => {
    console.log('Handling dispute for:', transactionId);
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.event.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || transaction.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const totalRevenue = transactions
    .filter(t => t.status === 'Completed')
    .reduce((sum, t) => sum + t.amount, 0);

  const pendingAmount = transactions
    .filter(t => t.status === 'Pending')
    .reduce((sum, t) => sum + t.amount, 0);

  const refundedAmount = transactions
    .filter(t => t.status === 'Refunded')
    .reduce((sum, t) => sum + t.amount, 0);

  const disputedCount = transactions.filter(t => t.disputed).length;

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glassmorphism-card p-4">
          <div className="flex items-center justify-between mb-2">
            <Icon name="DollarSign" size={20} className="text-success" />
            <span className="text-xs text-success">+12.5%</span>
          </div>
          <h3 className="text-2xl font-bold text-white">${totalRevenue.toLocaleString()}</h3>
          <p className="text-sm text-text-secondary">Total Revenue</p>
        </div>

        <div className="glassmorphism-card p-4">
          <div className="flex items-center justify-between mb-2">
            <Icon name="Clock" size={20} className="text-warning" />
            <span className="text-xs text-warning">5 pending</span>
          </div>
          <h3 className="text-2xl font-bold text-white">${pendingAmount.toLocaleString()}</h3>
          <p className="text-sm text-text-secondary">Pending Payments</p>
        </div>

        <div className="glassmorphism-card p-4">
          <div className="flex items-center justify-between mb-2">
            <Icon name="RotateCcw" size={20} className="text-muted" />
            <span className="text-xs text-text-secondary">This month</span>
          </div>
          <h3 className="text-2xl font-bold text-white">${refundedAmount.toLocaleString()}</h3>
          <p className="text-sm text-text-secondary">Refunds Processed</p>
        </div>

        <div className="glassmorphism-card p-4">
          <div className="flex items-center justify-between mb-2">
            <Icon name="AlertTriangle" size={20} className="text-error" />
            <span className="text-xs text-error">Needs attention</span>
          </div>
          <h3 className="text-2xl font-bold text-white">{disputedCount}</h3>
          <p className="text-sm text-text-secondary">Active Disputes</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="flex-1 max-w-md">
          <Input
            type="search"
            placeholder="Search by transaction ID, user, or event..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 bg-surface border border-purple-500/30 rounded-lg text-white text-sm focus:outline-none focus:border-primary"
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
            <option value="refunded">Refunded</option>
            <option value="disputed">Disputed</option>
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

      {/* Transactions Table */}
      <div className="glassmorphism-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-purple-500/30">
              <tr>
                <th className="text-left p-4 text-text-secondary font-medium">Transaction</th>
                <th className="text-left p-4 text-text-secondary font-medium">User</th>
                <th className="text-left p-4 text-text-secondary font-medium">Event</th>
                <th className="text-left p-4 text-text-secondary font-medium">Amount</th>
                <th className="text-left p-4 text-text-secondary font-medium">Payment Method</th>
                <th className="text-left p-4 text-text-secondary font-medium">Status</th>
                <th className="text-left p-4 text-text-secondary font-medium">Date</th>
                <th className="text-right p-4 text-text-secondary font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="border-b border-purple-500/10 hover:bg-white/5 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-sm text-white">{transaction.id}</span>
                      {transaction.disputed && (
                        <Icon name="AlertTriangle" size={16} className="text-error" />
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <div>
                      <p className="font-medium text-white">{transaction.user}</p>
                      <p className="text-sm text-text-secondary">{transaction.userEmail}</p>
                    </div>
                  </td>
                  <td className="p-4">
                    <p className="text-sm text-white line-clamp-2">{transaction.event}</p>
                  </td>
                  <td className="p-4">
                    <p className="font-semibold text-white">${transaction.amount.toFixed(2)}</p>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <Icon name={getProviderIcon(transaction.provider)} size={16} className="text-text-secondary" />
                      <span className="text-sm text-white">{transaction.paymentMethod}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(transaction.status)}`}>
                      {transaction.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <p className="text-sm text-white">
                      {new Date(transaction.date).toLocaleDateString()}
                    </p>
                    <p className="text-xs text-text-secondary">
                      {new Date(transaction.date).toLocaleTimeString()}
                    </p>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end space-x-2">
                      <Button variant="ghost" size="icon">
                        <Icon name="Eye" size={16} />
                      </Button>
                      
                      {transaction.refundable && transaction.status === 'Completed' && (
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleRefund(transaction.id)}
                          className="text-warning hover:text-warning"
                        >
                          <Icon name="RotateCcw" size={16} />
                        </Button>
                      )}
                      
                      {transaction.disputed && (
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleDispute(transaction.id)}
                          className="text-error hover:text-error"
                        >
                          <Icon name="AlertTriangle" size={16} />
                        </Button>
                      )}
                      
                      <Button variant="ghost" size="icon">
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
            Showing 1 to {filteredTransactions.length} of {transactions.length} transactions
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
    </div>
  );
};

export default PaymentAdministration;