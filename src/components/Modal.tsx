import React, { type ReactNode, useState, useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const [isRendering, setIsRendering] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsRendering(true);
    } else {
      const timer = setTimeout(() => setIsRendering(false), 200); // Animation duration
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isRendering) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex justify-center items-center transition-colors duration-200 ${
        isOpen ? 'bg-black bg-opacity-50' : 'bg-transparent'
      }`}
      onClick={onClose}
    >
      <div
        className={`bg-white p-8 rounded-lg shadow-xl relative max-w-sm w-full transition-all duration-200 ease-out ${
          isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
        onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          aria-label="閉じる"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
