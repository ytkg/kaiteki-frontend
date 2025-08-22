import React, { useState } from 'react';
import { useSettings } from '../contexts/SettingsContext';
import Modal from './Modal';
import RemoteContainer from './RemoteContainer';

// Define the type for a single data item
interface DataItem {
  d1: number;
  d2: number;
  d3: number;
  d4: number;
  d5: number;
  created: string;
}

interface CurrentStatusProps {
  latestData: DataItem | null;
}

const CurrentStatus: React.FC<CurrentStatusProps> = ({ latestData }) => {
  const { targetTemperature } = useSettings();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!latestData) {
    return null; // Or a loading/error state if you prefer
  }

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className="mb-4">
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">現在の状況</h3>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="p-4 border rounded-lg bg-gray-50">
              <p className="text-sm text-gray-600">室温</p>
              <p className="text-2xl font-bold">{latestData.d1}°C</p>
            </div>
            <div className="p-4 border rounded-lg bg-gray-50">
              <p className="text-sm text-gray-600">体感温度</p>
              <p className="text-2xl font-bold">{latestData.d5}°C</p>
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">設定</h3>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div
              className="p-4 border rounded-lg bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={openModal}
            >
              <p className="text-sm text-gray-600">目標の体感温度</p>
              <p className="text-2xl font-bold">{targetTemperature.toFixed(1)}°C</p>
            </div>
            <div className="p-4 border rounded-lg bg-gray-50">
              <p className="text-sm text-gray-600">エアコンの設定温度</p>
              <p className="text-2xl font-bold">{latestData.d4}°C</p>
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <RemoteContainer />
      </Modal>
    </>
  );
};

export default CurrentStatus;
