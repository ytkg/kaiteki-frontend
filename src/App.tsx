import { useState } from 'react';
import './App.css';
import Modal from './components/Modal';
import Remote from './components/Remote';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="App p-4">
      <h1 className="text-2xl font-bold mb-4">ダッシュボード</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border-b">ID</th>
              <th className="px-4 py-2 border-b">名前</th>
              <th className="px-4 py-2 border-b">ステータス</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-gray-50">
              <td className="px-4 py-2 border-b">1</td>
              <td className="px-4 py-2 border-b">アイテムA</td>
              <td className="px-4 py-2 border-b">利用可能</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-4 py-2 border-b">2</td>
              <td className="px-4 py-2 border-b">アイテムB</td>
              <td className="px-4 py-2 border-b">貸出中</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-4 py-2 border-b">3</td>
              <td className="px-4 py-2 border-b">アイテムC</td>
              <td className="px-4 py-2 border-b">利用可能</td>
            </tr>
          </tbody>
        </table>
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
