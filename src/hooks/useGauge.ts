import { useRef, useCallback, useEffect } from 'react';

export const useGauge = (
  gaugeRef: React.RefObject<HTMLDivElement | null>,
  onTempChange: (newTemp: number) => void,
  onTempChangeCommit: () => void,
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
    onTempChange(newTemp);
  }, [gaugeRef, onTempChange, minTemp, maxTemp]);

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
      if (!isDraggingRef.current) return;
      isDraggingRef.current = false;
      onTempChangeCommit();
    };

    const handleTouchEnd = () => {
      if (!isDraggingRef.current) return;
      isDraggingRef.current = false;
      onTempChangeCommit();
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [updateTempFromY, onTempChangeCommit]);

  return { handleMouseDown, handleTouchStart };
};
