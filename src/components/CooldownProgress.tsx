import React from 'react';

export const CooldownProgress: React.FC<{ seconds: number }> = ({ seconds }) => {
  const radius = 16;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.max(0, seconds / 5);
  const offset = circumference - (progress * circumference);

  return (
    <div className="relative w-9 h-9">
      <svg className="transform -rotate-90" width="36" height="36" viewBox="0 0 36 36">
        <circle className="text-gray-600" strokeWidth="3" stroke="currentColor" fill="transparent" r={radius} cx="18" cy="18" />
        <circle
          className="text-blue-500"
          strokeWidth="3"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="18"
          cy="18"
        />
      </svg>
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-gray-700 text-xs font-bold">
        {seconds > 0 ? seconds : ''}
      </div>
    </div>
  );
};
