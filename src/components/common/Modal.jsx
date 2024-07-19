// components/common/Modal.js
import React, { useEffect } from "react";

const Modal = ({ showModal, setShowModal, children }) => {
  const handleClose = () => {
    setShowModal(false);
  };

  const handleOutsideClick = (e) => {
    if (e.target.id === "modal-container") {
      setShowModal(false);
    }
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setShowModal(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [setShowModal]);

  if (!showModal) return null;

  return (
    <div
      id="modal-container"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleOutsideClick}
    >
      <div className="relative rounded-lg p-4 w-full max-w-md">
        <button
          className="absolute text-white top-6 right-7 text-xl text-gray-700"
          onClick={handleClose}
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
