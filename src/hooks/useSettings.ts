import { useContext } from 'react';
import { SettingsContext } from '../contexts/SettingsContextObject';

// Create a custom hook for easy access
export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
