import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { FcPlus } from "react-icons/fc";
import { toast } from "react-toastify";
import { postCreateNewUser } from "../../../services/apiService";

const ModalCreateUser = (props) => {
  const { show, setShow } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("USER");
  const [img, setImg] = useState("");
  const [previewImg, setPreviewImg] = useState("");

  const handleClose = () => {
    setShow(false);
    setEmail("");
    setPassword("");
    setUsername("");
    setRole("USER");
    setImg("");
    setPreviewImg("");
  };

  const handleUploadImg = (e) => {
    if (e.target && e.target.files[0]) {
      setPreviewImg(URL.createObjectURL(e.target.files[0]));
      setImg(e.target.files[0]);
    }
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleSubmitCreateUser = async () => {
    // validate
    const isValidEmail = validateEmail(email);
    if (!isValidEmail) {
      toast.error("Invalid email");
      return;
    }
    if (!password) {
      toast.error("Password is required");
      return;
    }

    let res = await postCreateNewUser(email, password, username, role, img);
    if (res && res.data.EC === 0) {
      toast.success(res.data.EM);
      handleClose();
      await props.fetchListUsers();
    }
    if (res && res.data.EC !== 0) {
      toast.error(res.data.EM);
    }
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        size="xl"
        backdrop={"static"}
        className="modal-add-user"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add new user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="mb-3">
              <Form.Group className="col-md-6" as={Col}>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="col-md-6" as={Col}>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="col-md-6 my-3" as={Col}>
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="col-md-4 my-3" as={Col}>
                <Form.Label>Role</Form.Label>
                <Form.Select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value={"USER"}>USER</option>
                  <option value={"ADMIN"}>ADMIN</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="col-md-12" as={Col}>
                <Form.Label className="label-upload" htmlFor="labelUpload">
                  <FcPlus />
                  Upload file image
                </Form.Label>
                <Form.Control
                  type="file"
                  hidden
                  id="labelUpload"
                  onChange={(e) => handleUploadImg(e)}
                />
              </Form.Group>
              <div className="col-md-12 img-preview">
                {previewImg ? (
                  <img src={previewImg} alt="avatar user" />
                ) : (
                  <span>Preview Image</span>
                )}
              </div>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSubmitCreateUser()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ModalCreateUser;
