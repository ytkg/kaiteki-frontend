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

  const dummyButtonClasses = "w-full rounded-md bg-gray-300 text-gray-600 text-sm py-2 disabled:opacity-70 cursor-not-allowed";

  return (
    <div className="flex justify-center items-center w-full min-h-screen">
      <div className="bg-gray-200 rounded-lg p-8 shadow-md border border-gray-300 relative w-[320px]">
        <div className="absolute top-4 right-4 w-9 h-9">
          {isCoolingDown ? (
            <CooldownProgress seconds={cooldownSeconds} />
          ) : (
            showIndicator && <div className="w-4 h-4 rounded-full bg-blue-500 shadow-[0_0_10px_theme(colors.blue.500)]" />
          )}
        </div>
        <div className="flex flex-col items-center gap-4">
          <div className="bg-gray-800 text-green-400 rounded-md px-4 py-2 font-mono">
            <div className="text-6xl font-thin">{previewTemp.toFixed(1)}°</div>
          </div>
          <Gauge
            gaugeRef={gaugeRef}
            handlePointerDown={handlePointerDown}
            isCoolingDown={isCoolingDown}
            tempPercentage={tempPercentage}
          />
          <div className="flex flex-col items-center gap-4 w-full">
            <div className="grid grid-cols-3 gap-2 w-full">
              <button className={dummyButtonClasses} disabled>モード</button>
              <button className={dummyButtonClasses} disabled>風量</button>
              <button className={dummyButtonClasses} disabled>タイマー</button>
            </div>
            <ControlButtons
              adjustTemp={adjustTemp}
              isCoolingDown={isCoolingDown}
              temperature={previewTemp}
              minTemp={MIN_TEMP}
              maxTemp={MAX_TEMP}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Remote;
