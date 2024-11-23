import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ModalDeleteUser = (props) => {
  const { show, setShow, dataUpdate } = props;

  const handleClose = () => setShow(false);

  const hanldeSubmitDeleteUser = () => {
    alert("run");
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop={"static"}>
        <Modal.Header closeButton>
          <Modal.Title>Delete user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure to delete this user? email={" "}
          <b>{dataUpdate && dataUpdate.email ? dataUpdate.email : ""}</b>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => hanldeSubmitDeleteUser()}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDeleteUser;
