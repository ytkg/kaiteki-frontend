import React, { type ReactNode, useState, useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let mountTimer: ReturnType<typeof setTimeout>;
    let activeTimer: ReturnType<typeof setTimeout>;

    if (isOpen) {
      setIsMounted(true);
      // Delay setting active to allow for mounting and initial style application
      mountTimer = setTimeout(() => {
        setIsActive(true);
      }, 10); // Small delay to trigger transition
    } else {
      setIsActive(false);
      // Delay unmounting to allow for exit animation
      activeTimer = setTimeout(() => {
        setIsMounted(false);
      }, 200); // Should match animation duration
    }

    return () => {
      clearTimeout(mountTimer);
      clearTimeout(activeTimer);
    };
  }, [isOpen]);

  if (!isMounted) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex justify-center items-center transition-colors duration-200 ${
        isActive ? 'bg-black bg-opacity-50' : 'bg-transparent'
      }`}
      onClick={onClose}
    >
      <div
        className={`bg-white p-8 rounded-lg shadow-xl relative max-w-sm w-full transition-all duration-200 ease-out ${
          isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
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
