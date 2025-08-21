import { useState } from 'react';
import './App.css';
import EnvironmentDataTable from './components/EnvironmentDataTable';
import Modal from './components/Modal';
import Remote from './components/Remote';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="App p-4">
      <h1 className="text-2xl font-bold mb-4">ダッシュボード</h1>
      <div className="my-4">
        <EnvironmentDataTable />
      </div>
      <button
        onClick={openModal}
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        リモコンを表示
      </button>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <Remote />
      </Modal>
    </div>
  );
}

export default App;
