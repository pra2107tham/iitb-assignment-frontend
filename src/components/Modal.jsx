import React from 'react';

const Modal = ({ title, content, onClose }) => {
  return (
    <dialog id="details_modal" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg">{title}</h3>
        <pre className="py-4 overflow-auto">{content}</pre>
        <div className="modal-action">
          <button className="btn" onClick={onClose}>Close</button>
        </div>
      </div>
    </dialog>
  );
};

export default Modal;
