import { createContext } from 'react';

// Define the shape of the context data
export interface SettingsContextType {
  targetTemperature: number;
  setTargetTemperature: (temp: number) => void;
}

// Create the context with a default value
export const SettingsContext = createContext<SettingsContextType | undefined>(undefined);
