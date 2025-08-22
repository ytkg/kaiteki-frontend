import { type ReactNode, useState } from 'react';
import { SettingsContext } from './settings';

// Create the provider component
export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [targetTemperature, setTargetTemperature] = useState<number>(28.0); // Default initial temperature

  const value = { targetTemperature, setTargetTemperature };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};
