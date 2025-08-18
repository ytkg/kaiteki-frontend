import { useRef, useCallback, useEffect } from 'react';

export const useGauge = (
  gaugeRef: React.RefObject<HTMLDivElement | null>,
  handleTemperatureChange: (newTemp: number) => void,
  isCoolingDown: boolean,
  minTemp: number,
  maxTemp: number
) => {
  const isDraggingRef = useRef(false);

  const updateTempFromY = useCallback((y: number) => {
    if (!gaugeRef.current) return;
    const rect = gaugeRef.current.getBoundingClientRect();
    const percent = 1 - ((y - rect.top) / rect.height);
    const newTemp = percent * (maxTemp - minTemp) + minTemp;
    handleTemperatureChange(newTemp);
  }, [gaugeRef, handleTemperatureChange, minTemp, maxTemp]);

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (isCoolingDown) return;
    isDraggingRef.current = true;
    updateTempFromY(e.clientY);
  }, [isCoolingDown, updateTempFromY]);

  const handleTouchStart = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    if (isCoolingDown) return;
    isDraggingRef.current = true;
    updateTempFromY(e.touches[0].clientY);
  }, [isCoolingDown, updateTempFromY]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      updateTempFromY(e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDraggingRef.current) return;
      e.preventDefault();
      updateTempFromY(e.touches[0].clientY);
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchend', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [updateTempFromY]);

  return { handleMouseDown, handleTouchStart };
};
