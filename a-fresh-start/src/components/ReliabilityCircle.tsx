import React from 'react';

interface ReliabilityCircleProps {
  score: number;
}

const ReliabilityCircle: React.FC<ReliabilityCircleProps> = ({ score }) => {
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center">
      <svg className="w-24 h-24 transform -rotate-90">
        <circle 
          cx="48" 
          cy="48" 
          r={radius} 
          stroke="currentColor" 
          strokeWidth="8" 
          fill="transparent" 
          className="text-nude" 
        />
        <circle 
          cx="48" 
          cy="48" 
          r={radius} 
          stroke="currentColor" 
          strokeWidth="8" 
          fill="transparent" 
          strokeDasharray={circumference} 
          strokeDashoffset={offset} 
          strokeLinecap="round" 
          className="text-moss transition-all duration-1000 ease-out" 
        />
      </svg>
      <span className="absolute text-xl font-bold text-charcoal">{score}%</span>
    </div>
  );
};

export default ReliabilityCircle;
