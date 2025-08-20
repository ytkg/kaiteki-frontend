import { useState } from 'react';
import './App.css';
import Modal from './components/Modal';
import Remote from './components/Remote';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="App">
      <button
        onClick={openModal}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
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
