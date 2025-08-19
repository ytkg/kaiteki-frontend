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

  const handlePointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (isCoolingDown || !gaugeRef.current) return;
    isDraggingRef.current = true;
    gaugeRef.current.setPointerCapture(e.pointerId);
    updateTempFromY(e.clientY);
  }, [isCoolingDown, updateTempFromY, gaugeRef]);

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (!isDraggingRef.current) return;
      updateTempFromY(e.clientY);
    };

    const handlePointerUp = (e: PointerEvent) => {
      if (!isDraggingRef.current || !gaugeRef.current) return;
      isDraggingRef.current = false;
      if (gaugeRef.current.hasPointerCapture(e.pointerId)) {
        gaugeRef.current.releasePointerCapture(e.pointerId);
      }
      onTempChangeCommit();
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [updateTempFromY, onTempChangeCommit, gaugeRef]);

  return { handlePointerDown };
};
