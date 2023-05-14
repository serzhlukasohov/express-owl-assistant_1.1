import "./Modal.scss";

const Modal = ({ children }) => {
  return (
    <div className="app-modal">
      <div className="app-modal-content">{children}</div>
      <div className="app-backdrop"></div>
    </div>
  );
};

export default Modal;
