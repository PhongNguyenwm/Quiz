import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteUser } from "../../../services/apiService";
import { toast } from "react-toastify";

const ModalDeleteUser = (props) => {
  const { show, setShow, dataUpdate } = props;

  const handleClose = () => setShow(false);

  const hanldeSubmitDeleteUser = async () => {
    let res = await deleteUser(dataUpdate.id);
    console.log(res);
    if (res.data && res.data.EC === 0) {
      toast.success(res.data.EM);
      handleClose();
      await props.fetchListUsers();
    }
    if (res.data && res.data.EC !== 0) {
      toast.error(res.data.EM);
    }
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
