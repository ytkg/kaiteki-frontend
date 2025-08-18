import React, { useState, useRef, useCallback, useEffect } from 'react';

const CooldownProgress: React.FC<{ seconds: number }> = ({ seconds }) => {
  const radius = 16;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.max(0, seconds / 5);
  const offset = circumference - (progress * circumference);

  return (
    <div className="relative w-9 h-9">
      <svg className="transform -rotate-90" width="36" height="36" viewBox="0 0 36 36">
        <circle className="text-gray-600" strokeWidth="3" stroke="currentColor" fill="transparent" r={radius} cx="18" cy="18" />
        <circle
          className="text-blue-500"
          strokeWidth="3"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="18"
          cy="18"
        />
      </svg>
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-gray-700 text-xs font-bold">
        {seconds > 0 ? seconds : ''}
      </div>
    </div>
  );
};

const MIN_TEMP = 18.0;
const MAX_TEMP = 30.0;
const TEMP_STEP = 0.1;

const Remote: React.FC = () => {
  const [temperature, setTemperature] = useState<number>(28.0);
  const [isCoolingDown, setIsCoolingDown] = useState<boolean>(false);
  const [showIndicator, setShowIndicator] = useState<boolean>(false);
  const [cooldownSeconds, setCooldownSeconds] = useState<number>(5);
  const gaugeRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const debounceTimerRef = useRef<number | null>(null);
  const cooldownTimerRef = useRef<number | null>(null);
  const isInitialMount = useRef(true);

  const handleTemperatureChange = useCallback((newTemp: number) => {
    // Clamp the temperature to the nearest step within the allowed range
    const clampedTemp = Math.max(MIN_TEMP, Math.min(MAX_TEMP, newTemp));
    const steppedTemp = Math.round(clampedTemp / TEMP_STEP) * TEMP_STEP;
    setTemperature(steppedTemp);
  }, []);

  const adjustTemp = (amount: number) => {
    setTemperature(prevTemp => {
      const newTemp = prevTemp + amount;
      const clampedTemp = Math.max(MIN_TEMP, Math.min(MAX_TEMP, newTemp));
      return Math.round(clampedTemp / TEMP_STEP) * TEMP_STEP;
    });
  };

  const updateTempFromY = useCallback((y: number) => {
    if (!gaugeRef.current) return;
    const rect = gaugeRef.current.getBoundingClientRect();
    const percent = 1 - ((y - rect.top) / rect.height);
    const newTemp = percent * (MAX_TEMP - MIN_TEMP) + MIN_TEMP;
    handleTemperatureChange(newTemp);
  }, [handleTemperatureChange]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isCoolingDown) return;
    isDraggingRef.current = true;
    updateTempFromY(e.clientY);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (isCoolingDown) return;
    isDraggingRef.current = true;
    updateTempFromY(e.touches[0].clientY);
  };

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

  // Debounce and Cooldown Logic
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


  const tempPercentage = ((temperature - MIN_TEMP) / (MAX_TEMP - MIN_TEMP)) * 100;

  const gaugeClasses = `relative w-20 h-52 bg-gray-200 rounded-lg overflow-hidden border-2 border-gray-300 flex flex-col-reverse ${
    isCoolingDown ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'
  }`;

  const buttonClasses = "w-12 h-12 rounded-full bg-white text-gray-700 text-lg flex items-center justify-center transition-colors duration-200 shadow-md disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed hover:enabled:bg-gray-50";

  return (
    <div className="flex justify-center items-center w-full min-h-screen">
      <div className="bg-white rounded-2xl p-8 shadow-lg relative w-[320px]">
        <div className="absolute top-4 right-4 w-9 h-9">
          {isCoolingDown ? (
            <CooldownProgress seconds={cooldownSeconds} />
          ) : (
            showIndicator && <div className="w-4 h-4 rounded-full bg-blue-500 shadow-[0_0_10px_theme(colors.blue.500)]" />
          )}
        </div>
        <div className="flex flex-col items-center gap-6">
          <div className="text-6xl font-thin text-gray-800">{temperature.toFixed(1)}°</div>
          <div
            ref={gaugeRef}
            className={gaugeClasses}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
          >
            <div className="bg-blue-500 w-full rounded-md" style={{ height: `${tempPercentage}%` }} />
          </div>
          <div className="flex justify-center items-center gap-2">
              <button onClick={() => adjustTemp(-1.0)} disabled={isCoolingDown || temperature < MIN_TEMP + 1.0} className={buttonClasses}>-1</button>
              <button onClick={() => adjustTemp(-0.1)} disabled={isCoolingDown || temperature <= MIN_TEMP} className={buttonClasses}>-0.1</button>
              <button onClick={() => adjustTemp(0.1)} disabled={isCoolingDown || temperature >= MAX_TEMP} className={buttonClasses}>+0.1</button>
              <button onClick={() => adjustTemp(1.0)} disabled={isCoolingDown || temperature > MAX_TEMP - 1.0} className={buttonClasses}>+1</button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Remote;
