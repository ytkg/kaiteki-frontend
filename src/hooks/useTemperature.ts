import { useState, useCallback } from 'react';

const MIN_TEMP = 18.0;
const MAX_TEMP = 30.0;
const TEMP_STEP = 0.1;

export const useTemperature = (initialTemp = 28.0) => {
  const [temperature, setTemperature] = useState<number>(initialTemp);

  const handleTemperatureChange = useCallback((newTemp: number) => {
    const clampedTemp = Math.max(MIN_TEMP, Math.min(MAX_TEMP, newTemp));
    const steppedTemp = Math.round(clampedTemp / TEMP_STEP) * TEMP_STEP;
    setTemperature(steppedTemp);
  }, []);

  const adjustTemp = useCallback((amount: number) => {
    setTemperature(prevTemp => {
      const newTemp = prevTemp + amount;
      const clampedTemp = Math.max(MIN_TEMP, Math.min(MAX_TEMP, newTemp));
      return Math.round(clampedTemp / TEMP_STEP) * TEMP_STEP;
    });
  }, []);

  return {
    temperature,
    handleTemperatureChange,
    adjustTemp,
    MIN_TEMP,
    MAX_TEMP
  };
};
