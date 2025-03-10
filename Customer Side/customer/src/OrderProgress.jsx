import React from 'react';
import { Check } from 'lucide-react';

const OrderProgressTracker = ({ statusCode }) => {
  const stages = [
    'Order Placed',
    'Processing',
    'Shipped',
    'Out for Delivery',
    'Delivered'
  ];
  
  return (
    <div className="mt-4">
      <div className="relative h-2 bg-gray-700 rounded">
        <div
          className="absolute h-full bg-blue-600 rounded transition-all duration-300"
          style={{ width: `${(statusCode + 1) * 20}%` }}
        />
        
        {/* Checkpoints */}
        <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-[2px]">
          {stages.map((stage, index) => {
            const isCompleted = index <= statusCode;
            const isCurrent = index === statusCode;
            
            return (
              <div key={stage} className="relative flex flex-col items-center">
                <div
                  className={`w-4 h-4 rounded-full ${
                    isCompleted 
                      ? 'bg-blue-600' 
                      : isCurrent 
                        ? 'bg-blue-400'
                        : 'bg-gray-600'
                  } flex items-center justify-center z-10`}
                >
                  {isCompleted && <Check className="w-3 h-3 text-white" />}
                </div>
                <span className="absolute -bottom-6 text-sm font-semibold text-gray-300 whitespace-nowrap transform -translate-x-1/2 left-1/2">
                  {stage}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="h-6" /> {/* Spacer for labels */}
    </div>
  );
};

export default OrderProgressTracker;