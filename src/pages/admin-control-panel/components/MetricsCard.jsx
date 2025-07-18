import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricsCard = ({ title, value, change, changeType, icon, color = 'primary' }) => {
  const getColorClasses = (color) => {
    const colors = {
      primary: 'from-primary to-purple-600',
      success: 'from-success to-emerald-600',
      warning: 'from-warning to-orange-600',
      error: 'from-error to-red-600'
    };
    return colors[color] || colors.primary;
  };

  const getChangeColor = (type) => {
    return type === 'positive' ? 'text-success' : type === 'negative' ? 'text-error' : 'text-text-secondary';
  };

  return (
    <div className="glassmorphism-card p-6 hover:scale-105 transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 bg-gradient-to-br ${getColorClasses(color)} rounded-lg flex items-center justify-center neon-glow`}>
          <Icon name={icon} size={24} color="white" />
        </div>
        {change && (
          <div className={`flex items-center space-x-1 ${getChangeColor(changeType)}`}>
            <Icon 
              name={changeType === 'positive' ? 'TrendingUp' : changeType === 'negative' ? 'TrendingDown' : 'Minus'} 
              size={16} 
            />
            <span className="text-sm font-medium">{change}</span>
          </div>
        )}
      </div>
      
      <div>
        <h3 className="text-2xl font-bold text-white mb-1">{value}</h3>
        <p className="text-text-secondary text-sm">{title}</p>
      </div>
    </div>
  );
};

export default MetricsCard;