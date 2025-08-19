import React from 'react';

interface GaugeProps {
  gaugeRef: React.RefObject<HTMLDivElement | null>;
  handlePointerDown: (e: React.PointerEvent<HTMLDivElement>) => void;
  isCoolingDown: boolean;
  tempPercentage: number;
}

export const Gauge: React.FC<GaugeProps> = ({
  gaugeRef,
  handlePointerDown,
  isCoolingDown,
  tempPercentage,
}) => {
  const gaugeClasses = `relative w-20 h-52 bg-gray-200 rounded-lg overflow-hidden border-2 border-gray-300 flex flex-col-reverse touch-none ${
    isCoolingDown ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'
  }`;

  return (
    <div
      ref={gaugeRef}
      className={gaugeClasses}
      onPointerDown={handlePointerDown}
    >
      <div
        className="bg-blue-500 w-full rounded-md"
        style={{ height: `${tempPercentage}%` }}
      />
    </div>
  );
};
