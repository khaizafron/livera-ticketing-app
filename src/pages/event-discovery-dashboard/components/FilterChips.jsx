import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FilterChips = ({ activeFilters, onRemoveFilter, onClearAll }) => {
  if (!activeFilters || activeFilters.length === 0) return null;

  return (
    <div className="flex items-center gap-2 px-4 py-3 bg-surface/50 border-b border-purple-500/20 overflow-x-auto">
      <div className="flex items-center gap-2 min-w-0 flex-1">
        <span className="text-sm text-text-secondary whitespace-nowrap">Active filters:</span>
        <div className="flex items-center gap-2">
          {activeFilters.map((filter, index) => (
            <div
              key={index}
              className="flex items-center gap-1 px-3 py-1 bg-primary/10 border border-primary/30 rounded-full text-sm text-primary whitespace-nowrap"
            >
              <span>{filter.label}</span>
              <button
                onClick={() => onRemoveFilter(filter)}
                className="ml-1 hover:bg-primary/20 rounded-full p-0.5 transition-colors duration-150"
              >
                <Icon name="X" size={12} />
              </button>
            </div>
          ))}
        </div>
      </div>
      
      {activeFilters.length > 1 && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearAll}
          className="text-text-secondary hover:text-white whitespace-nowrap"
        >
          Clear all
        </Button>
      )}
    </div>
  );
};

export default FilterChips;