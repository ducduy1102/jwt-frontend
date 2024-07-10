import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { createNewUser, fetchGroup } from "../../services/userService";
import { toast } from "react-toastify";
import _ from "lodash";

const ModalUser = (props) => {
  const { action, dataModalUser } = props;

  const defaulUserData = {
    email: "",
    phone: "",
    username: "",
    password: "",
    address: "",
    sex: "",
    group: "",
  };

  const validInputsDefault = {
    email: true,
    phone: true,
    username: true,
    password: true,
    address: true,
    sex: true,
    group: true,
  };
  const [userData, setUserData] = useState(defaulUserData);
  const [validInputs, setValidInputs] = useState(validInputsDefault);

  const [userGroup, setUserGroup] = useState([]);

  useEffect(() => {
    getGroups();
  }, []);

  useEffect(() => {
    if (action === "UPDATE") {
      setUserData({
        ...dataModalUser,
        group: dataModalUser.Group ? dataModalUser.Group.id : "",
      });
    }
  }, [dataModalUser]);

  useEffect(() => {
    if (action === "CREATE") {
      if (userGroup && userGroup.length > 0) {
        setUserData({ ...userData, group: userGroup[0].id });
      }
    }
  }, [action]);

  const getGroups = async () => {
    let res = await fetchGroup();
    if (res && res.data && res.data.errorCode === 0) {
      setUserGroup(res.data.data);
      if (res.data.data && res.data.data.length > 0) {
        let groups = res.data.data;
        setUserData({ ...userData, group: groups[0].id });
      }
    } else {
      toast.error(res.data.message);
    }
  };

  const handleOnChangeInput = (value, name) => {
    let _userData = _.cloneDeep(userData);
    _userData[name] = value;

    setUserData(_userData);
  };

  const checkValidateInputs = () => {
    // Create user
    setValidInputs(validInputsDefault);

    let arr = ["email", "phone", "password", "group"];
    let check = true;
    for (let i = 0; i < arr.length; i++) {
      if (!userData[arr[i]]) {
        // Update state
        let _validInputs = _.cloneDeep(validInputsDefault);
        _validInputs[arr[i]] = false;
        setValidInputs(_validInputs);

        toast.error(`Empty input ${arr[i]}`);
        check = false;
        break;
      }
    }

    return check;
  };

  const handleConfirmUser = async () => {
    // Create user
    let check = checkValidateInputs();
    if (check === true) {
      let res = await createNewUser({
        ...userData,
        groupId: Number(userData["group"]),
      });

      if (res.data && res.data.errorCode === 0) {
        props.onHide();
        setUserData({ ...defaulUserData, group: userGroup[0].id });
      }

      if (res.data && res.data.errorCode !== 0) {
        toast.error(res.data.message);
        let _validInputs = _.cloneDeep(validInputsDefault);
        _validInputs[res.data.data] = false;
        setValidInputs(_validInputs);
      }
    }
  };

  const handleCloseModalUser = () => {
    props.onHide();
    setUserData(defaulUserData);
    setValidInputs(validInputsDefault);
  };

  return (
    <>
      <Modal
        size="lg"
        show={props.show}
        className="modal-user"
        onHide={() => handleCloseModalUser()}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <span>
              {props.action === "CREATE" ? "Create new user" : "Edit a user"}
            </span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="content-body row">
            <div className="mb-3 col-sm-6 form-group">
              <label className="mb-1">
                Email address (<span className="red">*</span>)
              </label>
              <input
                disabled={action === "CREATE" ? false : true}
                type="email"
                className={
                  validInputs.email ? "form-control" : "form-control is-invalid"
                }
                placeholder="Enter your email address..."
                value={userData.email}
                onChange={(e) => handleOnChangeInput(e.target.value, "email")}
              />
            </div>
            <div className="mb-3 col-sm-6 form-group">
              <label className="mb-1">
                Phone number (<span className="red">*</span>)
              </label>
              <input
                disabled={action === "CREATE" ? false : true}
                type="text"
                className={
                  validInputs.phone ? "form-control" : "form-control is-invalid"
                }
                placeholder="Enter your phone number..."
                value={userData.phone}
                onChange={(e) => handleOnChangeInput(e.target.value, "phone")}
              />
            </div>
            <div className="mb-3 col-sm-6 form-group">
              <label className="mb-1">Username</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your username..."
                value={userData.username}
                onChange={(e) =>
                  handleOnChangeInput(e.target.value, "username")
                }
              />
            </div>
            <div className="mb-3 col-sm-6 form-group">
              {action === "CREATE" && (
                <>
                  <label className="mb-1">
                    Password (<span className="red">*</span>)
                  </label>
                  <input
                    type="password"
                    className={
                      validInputs.password
                        ? "form-control"
                        : "form-control is-invalid"
                    }
                    placeholder="Enter your password..."
                    value={userData.password}
                    onChange={(e) =>
                      handleOnChangeInput(e.target.value, "password")
                    }
                  />
                </>
              )}
            </div>
            <div className="mb-3 form-group">
              <label className="mb-1">Address</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your address..."
                value={userData.address}
                onChange={(e) => handleOnChangeInput(e.target.value, "address")}
              />
            </div>
            <div className="mb-3 col-sm-6 form-group">
              <label className="mb-1">Gender</label>
              <select
                className="form-select"
                onChange={(e) => handleOnChangeInput(e.target.value, "sex")}
                value={userData.sex}
              >
                <option defaultValue="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="mb-3 col-sm-6 form-group">
              <label className="mb-1">
                Group (<span className="red">*</span>)
              </label>
              <select
                className={
                  validInputs.group ? "form-select" : "form-select is-invalid"
                }
                onChange={(e) => handleOnChangeInput(e.target.value, "group")}
                value={userData.group}
              >
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
          <Button variant="secondary" onClick={() => handleCloseModalUser()}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleConfirmUser()}>
            {action === "CREATE" ? "Save" : "Update"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalUser;
