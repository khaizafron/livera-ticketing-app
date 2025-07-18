import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const UserManagementTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });

  const users = [
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@email.com",
      role: "User",
      status: "Active",
      joinDate: "2024-01-15",
      lastLogin: "2025-01-16",
      eventsCreated: 3,
      ticketsPurchased: 12,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      role: "Organizer",
      status: "Active",
      joinDate: "2024-02-20",
      lastLogin: "2025-01-17",
      eventsCreated: 8,
      ticketsPurchased: 5,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Michael Chen",
      email: "michael.chen@email.com",
      role: "User",
      status: "Suspended",
      joinDate: "2024-03-10",
      lastLogin: "2025-01-10",
      eventsCreated: 0,
      ticketsPurchased: 25,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily.davis@email.com",
      role: "Admin",
      status: "Active",
      joinDate: "2023-12-05",
      lastLogin: "2025-01-17",
      eventsCreated: 15,
      ticketsPurchased: 8,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 5,
      name: "David Wilson",
      email: "david.wilson@email.com",
      role: "Organizer",
      status: "Pending",
      joinDate: "2025-01-12",
      lastLogin: "2025-01-16",
      eventsCreated: 1,
      ticketsPurchased: 2,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face"
    }
  ];

  const getStatusColor = (status) => {
    const colors = {
      'Active': 'bg-success/20 text-success border-success/30',
      'Suspended': 'bg-error/20 text-error border-error/30',
      'Pending': 'bg-warning/20 text-warning border-warning/30'
    };
    return colors[status] || 'bg-muted/20 text-text-secondary border-muted/30';
  };

  const getRoleColor = (role) => {
    const colors = {
      'Admin': 'bg-primary/20 text-primary border-primary/30',
      'Organizer': 'bg-accent/20 text-accent border-accent/30',
      'User': 'bg-muted/20 text-text-secondary border-muted/30'
    };
    return colors[role] || 'bg-muted/20 text-text-secondary border-muted/30';
  };

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc'
    });
  };

  const handleSelectUser = (userId) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSelectAll = () => {
    setSelectedUsers(selectedUsers.length === users.length ? [] : users.map(u => u.id));
  };

  const handleBulkAction = (action) => {
    console.log(`Bulk action: ${action} for users:`, selectedUsers);
    setSelectedUsers([]);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Search and Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="flex-1 max-w-md">
          <Input
            type="search"
            placeholder="Search users by name, email, or role..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        
        <div className="flex items-center space-x-2">
          {selectedUsers.length > 0 && (
            <div className="flex items-center space-x-2 mr-4">
              <span className="text-sm text-text-secondary">
                {selectedUsers.length} selected
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleBulkAction('activate')}
              >
                <Icon name="CheckCircle" size={16} className="mr-1" />
                Activate
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleBulkAction('suspend')}
              >
                <Icon name="XCircle" size={16} className="mr-1" />
                Suspend
              </Button>
            </div>
          )}
          
          <Button variant="default" size="sm">
            <Icon name="UserPlus" size={16} className="mr-2" />
            Add User
          </Button>
          
          <Button variant="outline" size="sm">
            <Icon name="Download" size={16} className="mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="glassmorphism-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-purple-500/30">
              <tr>
                <th className="text-left p-4">
                  <Checkbox
                    checked={selectedUsers.length === users.length}
                    onChange={handleSelectAll}
                  />
                </th>
                <th className="text-left p-4 text-text-secondary font-medium">User</th>
                <th 
                  className="text-left p-4 text-text-secondary font-medium cursor-pointer hover:text-white transition-colors"
                  onClick={() => handleSort('role')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Role</span>
                    <Icon name="ArrowUpDown" size={14} />
                  </div>
                </th>
                <th 
                  className="text-left p-4 text-text-secondary font-medium cursor-pointer hover:text-white transition-colors"
                  onClick={() => handleSort('status')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Status</span>
                    <Icon name="ArrowUpDown" size={14} />
                  </div>
                </th>
                <th className="text-left p-4 text-text-secondary font-medium">Activity</th>
                <th 
                  className="text-left p-4 text-text-secondary font-medium cursor-pointer hover:text-white transition-colors"
                  onClick={() => handleSort('joinDate')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Join Date</span>
                    <Icon name="ArrowUpDown" size={14} />
                  </div>
                </th>
                <th className="text-right p-4 text-text-secondary font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-purple-500/10 hover:bg-white/5 transition-colors">
                  <td className="p-4">
                    <Checkbox
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => handleSelectUser(user.id)}
                    />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-muted">
                        <img 
                          src={user.avatar} 
                          alt={user.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-white">{user.name}</p>
                        <p className="text-sm text-text-secondary">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getRoleColor(user.role)}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(user.status)}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="text-sm">
                      <p className="text-white">{user.eventsCreated} events</p>
                      <p className="text-text-secondary">{user.ticketsPurchased} tickets</p>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm">
                      <p className="text-white">{new Date(user.joinDate).toLocaleDateString()}</p>
                      <p className="text-text-secondary">Last: {new Date(user.lastLogin).toLocaleDateString()}</p>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end space-x-2">
                      <Button variant="ghost" size="icon">
                        <Icon name="Eye" size={16} />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Icon name="Edit" size={16} />
                      </Button>
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
            Showing 1 to {filteredUsers.length} of {users.length} users
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

export default UserManagementTable;