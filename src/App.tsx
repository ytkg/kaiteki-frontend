import { useState } from 'react';
import './App.css';
import EnvironmentDataTable from './components/EnvironmentDataTable';
import Modal from './components/Modal';
import Remote from './components/Remote';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="flex-grow p-4 pb-20">
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
      </main>
      <Footer />
    </div>
  );
}

export default App;
