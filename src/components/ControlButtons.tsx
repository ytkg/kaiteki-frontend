import React from 'react';

interface ControlButtonsProps {
  adjustTemp: (amount: number) => void;
  isCoolingDown: boolean;
  temperature: number;
  minTemp: number;
  maxTemp: number;
}

export const ControlButtons: React.FC<ControlButtonsProps> = ({
  adjustTemp,
  isCoolingDown,
  temperature,
  minTemp,
  maxTemp,
}) => {
  const buttonClasses = "w-12 h-12 rounded-full bg-white text-gray-700 text-lg flex items-center justify-center transition-colors duration-200 shadow-md disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed hover:enabled:bg-gray-50";

  return (
    <div className="flex justify-center items-center gap-2">
      <button onClick={() => adjustTemp(-1.0)} disabled={isCoolingDown || temperature < minTemp + 1.0} className={buttonClasses}>-1</button>
      <button onClick={() => adjustTemp(-0.1)} disabled={isCoolingDown || temperature <= minTemp} className={buttonClasses}>-0.1</button>
      <button onClick={() => adjustTemp(0.1)} disabled={isCoolingDown || temperature >= maxTemp} className={buttonClasses}>+0.1</button>
      <button onClick={() => adjustTemp(1.0)} disabled={isCoolingDown || temperature > maxTemp - 1.0} className={buttonClasses}>+1</button>
    </div>
  );
};
