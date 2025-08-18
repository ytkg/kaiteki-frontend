import { useState, useCallback } from 'react';

const MIN_TEMP = 18.0;
const MAX_TEMP = 30.0;
const TEMP_STEP = 0.1;

export const useTemperature = (initialTemp = 28.0) => {
  const [temperature, setTemperature] = useState<number>(initialTemp);
  const [previewTemp, setPreviewTemp] = useState<number>(initialTemp);

  const handlePreviewTempChange = useCallback((newTemp: number) => {
    const clampedTemp = Math.max(MIN_TEMP, Math.min(MAX_TEMP, newTemp));
    const steppedTemp = Math.round(clampedTemp / TEMP_STEP) * TEMP_STEP;
    setPreviewTemp(steppedTemp);
  }, []);

  const commitTemp = useCallback(() => {
    setTemperature(previewTemp);
  }, [previewTemp]);

  const adjustTemp = useCallback((amount: number) => {
    const newTemp = previewTemp + amount;
    const clampedTemp = Math.max(MIN_TEMP, Math.min(MAX_TEMP, newTemp));
    const steppedTemp = Math.round(clampedTemp / TEMP_STEP) * TEMP_STEP;
    setPreviewTemp(steppedTemp);
    setTemperature(steppedTemp);
  }, [previewTemp]);

  return {
    temperature,
    previewTemp,
    handlePreviewTempChange,
    commitTemp,
    adjustTemp,
    MIN_TEMP,
    MAX_TEMP
  };
};
