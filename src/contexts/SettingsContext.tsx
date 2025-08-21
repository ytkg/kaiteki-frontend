import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the shape of the context data
interface SettingsContextType {
  targetTemperature: number;
  setTargetTemperature: (temp: number) => void;
}

// Create the context with a default value
const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

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

// Create a custom hook for easy access
export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
