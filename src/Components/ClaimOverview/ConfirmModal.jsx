import React from 'react';

const ConfirmModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className={`modal-overlay ${isOpen ? "open" : ""}`}>
    <div className="modal" tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Claim Created Successfully</h5>
            <button type="button" className="btn-close" data-dismiss="modal" aria-label="Close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <p>Your claim is sent for approval, our team will be checking on this and will notify with the status of your claim.</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default ConfirmModal;
