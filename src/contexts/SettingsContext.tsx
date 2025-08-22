import { type ReactNode, useState } from 'react';

import { SettingsContext } from './SettingsContextObject';

// Create the provider component
export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [targetTemperature, setTargetTemperature] = useState<number>(23.8); // Default initial temperature

  const value = { targetTemperature, setTargetTemperature };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

// The useSettings hook is now in src/hooks/useSettings.ts
