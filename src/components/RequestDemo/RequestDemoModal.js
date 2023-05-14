import Button from "../Button/Button";
import Input from "../Input/Input";
import Modal from "../Modal/Modal";
import "./RequestDemoModal.scss";

const RequestDemoModal = ({ onClose = () => {} }) => {
  return (
    <Modal>
      <div className="request-demo">
        <h1 className="request-demo-heading">Request a demo</h1>
        <div className="request-demo-content">
          <div className="flex">
            <div className="request-demo-content">
              <div className="request-demo-content-input">
                <label>Full Name:</label>
                <Input className="input" />
              </div>
              <div className="request-demo-content-input">
                <label>Email:</label>
                <Input className="input" />
              </div>
            </div>
          </div>
          <div className="request-demo-content-right">
            <textarea placeholder="Please describe your idea" />
          </div>

          <div className="request-demo-action margin-top-l">
            <Button
              primary={false}
              onClick={onClose}
              className="request-demo-cancel margin-right-l"
            >
              Cancel
            </Button>
            <Button onClick={onClose}>Submit</Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default RequestDemoModal;
