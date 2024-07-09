import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { fetchGroup } from "../../services/userService";
import { toast } from "react-toastify";

const ModalUser = (props) => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [sex, setSex] = useState("");
  const [group, setGroup] = useState("");

  const [userGroup, setUserGroup] = useState([]);

  useEffect(() => {
    getGroups();
  }, []);
  const getGroups = async () => {
    let res = await fetchGroup();
    if (res && res.data && res.data.errorCode === 0) {
      setUserGroup(res.data.data);
    } else {
      toast.error(res.data.message);
    }
  };

  return (
    <>
      <Modal size="lg" show className="modal-user">
        <Modal.Header closeButton>
          <Modal.Title>
            <span>{props.title}</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="content-body row">
            <div className="mb-3 col-sm-6 form-group">
              <label className="mb-1">
                Email address (<span className="red">*</span>)
              </label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email address..."
              />
            </div>
            <div className="mb-3 col-sm-6 form-group">
              <label className="mb-1">
                Phone number (<span className="red">*</span>)
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your phone number..."
              />
            </div>
            <div className="mb-3 col-sm-6 form-group">
              <label className="mb-1">Username</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your username..."
              />
            </div>
            <div className="mb-3 col-sm-6 form-group">
              <label className="mb-1">
                Password (<span className="red">*</span>)
              </label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter your password..."
              />
            </div>
            <div className="mb-3 form-group">
              <label className="mb-1">Address</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your address..."
              />
            </div>
            <div className="mb-3 col-sm-6 form-group">
              <label className="mb-1">Gender</label>
              <select className="form-select">
                <option defaultValue="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="mb-3 col-sm-6 form-group">
              <label className="mb-1">
                Group (<span className="red">*</span>)
              </label>
              <select className="form-select">
                {userGroup.length > 0 &&
                  userGroup.map((item, index) => {
                    return (
                      <option key={`group-${index}`} value={item.id}>
                        {item.name}
                      </option>
                    );
                  })}
              </select>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={props.confirm}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalUser;
