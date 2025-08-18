import { useState, useEffect, useRef } from 'react';

export const useCooldown = (temperature: number) => {
  const [isCoolingDown, setIsCoolingDown] = useState<boolean>(false);
  const [showIndicator, setShowIndicator] = useState<boolean>(false);
  const [cooldownSeconds, setCooldownSeconds] = useState<number>(5);

  const debounceTimerRef = useRef<number | null>(null);
  const cooldownTimerRef = useRef<number | null>(null);
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = window.setTimeout(() => {
      setShowIndicator(true);
      setTimeout(() => setShowIndicator(false), 200);

      setIsCoolingDown(true);
      setCooldownSeconds(5);

      const countdownInterval = setInterval(() => {
        setCooldownSeconds(prev => Math.max(0, prev - 1));
      }, 1000);

      cooldownTimerRef.current = window.setTimeout(() => {
        setIsCoolingDown(false);
        clearInterval(countdownInterval);
      }, 5000);
    }, 600);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
      if (cooldownTimerRef.current) {
        clearTimeout(cooldownTimerRef.current);
      }
    };
  }, [temperature]);

  return { isCoolingDown, showIndicator, cooldownSeconds };
};
