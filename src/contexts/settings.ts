import { createContext, useContext } from 'react';

// Define the shape of the context data
export interface SettingsContextType {
  targetTemperature: number;
  setTargetTemperature: (temp: number) => void;
}

// Create the context with a default value
export const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

// Create a custom hook for easy access
export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
