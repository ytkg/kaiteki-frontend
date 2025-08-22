import React, { useRef, useEffect } from 'react';

import { useSettings } from '../hooks/useSettings';
import { useTemperature } from '../hooks/useTemperature';
import { useCooldown } from '../hooks/useCooldown';
import { useGauge } from '../hooks/useGauge';

import { CooldownProgress } from './CooldownProgress';
import { Gauge } from './Gauge';
import { ControlButtons } from './ControlButtons';

const RemoteContainer: React.FC = () => {
  const { targetTemperature, setTargetTemperature } = useSettings();
  const {
    temperature,
    previewTemp,
    handlePreviewTempChange,
    commitTemp,
    adjustTemp,
    MIN_TEMP,
    MAX_TEMP,
  } = useTemperature(targetTemperature);

  useEffect(() => {
    setTargetTemperature(temperature);
  }, [temperature, setTargetTemperature]);

  const { isCoolingDown, showIndicator, cooldownSeconds } = useCooldown(temperature);

  const gaugeRef = useRef<HTMLDivElement>(null);
  const { handlePointerDown } = useGauge(
    gaugeRef,
    handlePreviewTempChange,
    commitTemp,
    isCoolingDown,
    MIN_TEMP,
    MAX_TEMP
  );

  const tempPercentage = ((previewTemp - MIN_TEMP) / (MAX_TEMP - MIN_TEMP)) * 100;

  return (
    <div className="relative flex flex-col items-center gap-6">
      <div className="absolute top-0 right-0 w-9 h-9 translate-x-full">
        {isCoolingDown ? (
          <CooldownProgress seconds={cooldownSeconds} />
        ) : (
          showIndicator && <div className="w-4 h-4 rounded-full bg-blue-500 shadow-[0_0_10px_theme(colors.blue.500)]" />
        )}
      </div>
      <div className="text-6xl font-thin text-gray-800">{previewTemp.toFixed(1)}°</div>
      <Gauge
        gaugeRef={gaugeRef}
        handlePointerDown={handlePointerDown}
        isCoolingDown={isCoolingDown}
        tempPercentage={tempPercentage}
      />
      <ControlButtons
        adjustTemp={adjustTemp}
        isCoolingDown={isCoolingDown}
        temperature={previewTemp}
        minTemp={MIN_TEMP}
        maxTemp={MAX_TEMP}
      />
    </div>
  );
};

export default RemoteContainer;
