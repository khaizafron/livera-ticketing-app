import React from 'react';

const LoadingSkeleton = () => {
  return (
    <div className="w-full max-w-md mx-auto glassmorphism-card p-8 animate-pulse">
      {/* Header Skeleton */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gray-700 rounded-2xl mx-auto mb-6"></div>
        <div className="h-8 bg-gray-700 rounded-lg mb-3 w-3/4 mx-auto"></div>
        <div className="h-4 bg-gray-700 rounded-lg w-full mx-auto"></div>
        <div className="h-4 bg-gray-700 rounded-lg w-2/3 mx-auto mt-2"></div>
      </div>

      {/* Toggle Skeleton */}
      <div className="h-12 bg-gray-700 rounded-lg mb-8"></div>

      {/* Form Skeleton */}
      <div className="space-y-6">
        <div>
          <div className="h-4 bg-gray-700 rounded w-1/4 mb-2"></div>
          <div className="h-12 bg-gray-700 rounded-lg"></div>
        </div>
        <div>
          <div className="h-4 bg-gray-700 rounded w-1/3 mb-2"></div>
          <div className="h-12 bg-gray-700 rounded-lg"></div>
        </div>
        <div className="h-12 bg-gray-700 rounded-lg"></div>
      </div>

      {/* Social Buttons Skeleton */}
      <div className="mt-8 space-y-3">
        <div className="h-4 bg-gray-700 rounded w-1/2 mx-auto mb-4"></div>
        <div className="h-12 bg-gray-700 rounded-lg"></div>
        <div className="h-12 bg-gray-700 rounded-lg"></div>
        <div className="h-12 bg-gray-700 rounded-lg"></div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;