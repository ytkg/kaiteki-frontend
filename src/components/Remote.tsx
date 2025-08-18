import React, { useState, useRef, useCallback, useEffect } from 'react';
import './Remote.css';

const CooldownProgress: React.FC<{ seconds: number }> = ({ seconds }) => {
  const radius = 16;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.max(0, (5 - seconds) / 5);
  const offset = circumference - (progress * circumference);

  return (
    <div className="cooldown-container">
      <svg className="cooldown-svg" width="36" height="36" viewBox="0 0 36 36">
        <circle className="cooldown-bg" cx="18" cy="18" r={radius} />
        <circle
          className="cooldown-progress"
          cx="18"
          cy="18"
          r={radius}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="cooldown-text">{seconds > 0 ? seconds : ''}</div>
    </div>
  );
};

const MIN_TEMP = 18.0;
const MAX_TEMP = 30.0;
const TEMP_STEP = 0.2;

const Remote: React.FC = () => {
  const [temperature, setTemperature] = useState<number>(28.0);
  const [isCoolingDown, setIsCoolingDown] = useState<boolean>(false);
  const [showIndicator, setShowIndicator] = useState<boolean>(false);
  const [cooldownSeconds, setCooldownSeconds] = useState<number>(5);
  const gaugeRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const debounceTimerRef = useRef<number | null>(null);
  const cooldownTimerRef = useRef<number | null>(null);

  const handleTemperatureChange = useCallback((newTemp: number) => {
    // Clamp the temperature to the nearest step within the allowed range
    const clampedTemp = Math.max(MIN_TEMP, Math.min(MAX_TEMP, newTemp));
    const steppedTemp = Math.round(clampedTemp / TEMP_STEP) * TEMP_STEP;
    setTemperature(steppedTemp);
  }, []);

  const increaseTemp = () => {
    handleTemperatureChange(temperature + TEMP_STEP);
  };

  const decreaseTemp = () => {
    handleTemperatureChange(temperature - TEMP_STEP);
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
      updateTempFromY(e.touches[0].clientY);
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
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
    if (isCoolingDown || isDraggingRef.current) return;

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    let countdownInterval: number | null = null;

    debounceTimerRef.current = window.setTimeout(() => {
      setShowIndicator(true);
      setTimeout(() => setShowIndicator(false), 200);

      setIsCoolingDown(true);
      setCooldownSeconds(5);

      countdownInterval = setInterval(() => {
        setCooldownSeconds(prev => Math.max(0, prev - 1));
      }, 1000);

      cooldownTimerRef.current = window.setTimeout(() => {
        setIsCoolingDown(false);
        if(countdownInterval) clearInterval(countdownInterval);
      }, 5000);

    }, 600);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
      if (cooldownTimerRef.current) {
        clearTimeout(cooldownTimerRef.current);
      }
      if(countdownInterval) {
        clearInterval(countdownInterval);
      }
    };
  }, [temperature]);


  const tempPercentage = ((temperature - MIN_TEMP) / (MAX_TEMP - MIN_TEMP)) * 100;

  return (
    <div className="remote-container">
      <div className="remote-card">
        <div className="status-indicator-area">
          {isCoolingDown ? (
            <CooldownProgress seconds={cooldownSeconds} />
          ) : (
            showIndicator && <div className="indicator-light on" />
          )}
        </div>
        <div className="main-ui">
          <div
            ref={gaugeRef}
            className={`gauge-container ${isCoolingDown ? 'disabled' : ''}`}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
          >
            <div className="gauge-fill" style={{ height: `${tempPercentage}%` }} />
          </div>
          <div className="right-panel">
            <div className="temperature-display">{temperature.toFixed(1)}°</div>
            <div className="controls">
              <button
                onClick={decreaseTemp}
                disabled={isCoolingDown || temperature <= MIN_TEMP}
                className="control-button"
              >
                -
              </button>
              <button
                onClick={increaseTemp}
                disabled={isCoolingDown || temperature >= MAX_TEMP}
                className="control-button"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Remote;
