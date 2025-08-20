import React, { useRef } from 'react';

import { useTemperature } from '../hooks/useTemperature';
import { useCooldown } from '../hooks/useCooldown';
import { useGauge } from '../hooks/useGauge';

import { CooldownProgress } from './CooldownProgress';
import { Gauge } from './Gauge';
import { ControlButtons } from './ControlButtons';

export const Remote: React.FC = () => {
  const {
    temperature,
    previewTemp,
    handlePreviewTempChange,
    commitTemp,
    adjustTemp,
    MIN_TEMP,
    MAX_TEMP,
  } = useTemperature(28.0);

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
    <>
      <div className="absolute top-4 right-4 w-9 h-9">
        {isCoolingDown ? (
          <CooldownProgress seconds={cooldownSeconds} />
        ) : (
          showIndicator && <div className="w-4 h-4 rounded-full bg-blue-500 shadow-[0_0_10px_theme(colors.blue.500)]" />
        )}
      </div>
      <div className="flex flex-col items-center gap-6">
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
    </>
  );
};

export default Remote;
