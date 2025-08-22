import React, { useState } from 'react';
import { useSettings } from '../hooks/useSettings';
import Modal from './Modal';
import RemoteContainer from './RemoteContainer';
import HistoryChart from './HistoryChart';

// Define the type for a single data item
interface DataItem {
  d1: number;
  d2: number;
  d3: number;
  d4: number;
  d5: number;
  created: string;
}

type ModalContentType = 'd1' | 'd5' | 'd4' | 'remote' | null;

interface CurrentStatusProps {
  latestData: DataItem | null;
  historyData: DataItem[];
}

const CurrentStatus: React.FC<CurrentStatusProps> = ({ latestData, historyData }) => {
  const { targetTemperature } = useSettings();
  const [modalContent, setModalContent] = useState<ModalContentType>(null);

  if (!latestData) {
    return null; // Or a loading/error state if you prefer
  }

  const openModal = (content: ModalContentType) => setModalContent(content);
  const closeModal = () => setModalContent(null);

  const modalTitles = {
    d1: '室温の履歴',
    d5: '体感温度の履歴',
    d4: 'エアコン設定温度の履歴',
    remote: '目標の体感温度設定',
  };

  return (
    <>
      <div className="mb-4">
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">現在の状況</h3>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div
              className="p-4 border rounded-lg bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={() => openModal('d1')}
            >
              <p className="text-sm text-gray-600">室温</p>
              <p className="text-2xl font-bold">{latestData.d1}°C</p>
            </div>
            <div
              className="p-4 border rounded-lg bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={() => openModal('d5')}
            >
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
              onClick={() => openModal('remote')}
            >
              <p className="text-sm text-gray-600">目標の体感温度</p>
              <p className="text-2xl font-bold">{targetTemperature.toFixed(1)}°C</p>
            </div>
            <div
              className="p-4 border rounded-lg bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={() => openModal('d4')}
            >
              <p className="text-sm text-gray-600">エアコンの設定温度</p>
              <p className="text-2xl font-bold">{latestData.d4}°C</p>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={modalContent !== null}
        onClose={closeModal}
        title={modalContent ? modalTitles[modalContent] : ''}
      >
        {modalContent === 'remote' && <RemoteContainer />}
        {(modalContent === 'd1' || modalContent === 'd5' || modalContent === 'd4') && (
          <HistoryChart data={historyData} targetDataKeys={[modalContent]} />
        )}
      </Modal>
    </>
  );
};

export default CurrentStatus;
