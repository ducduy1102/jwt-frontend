import { useEffect, useState, useRef } from "react";
import "./Roles.scss";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { createRole } from "../../services/roleService";
import TableRole from "./TableRole";

const Role = () => {
  const childRef = useRef();

  const dataChilDefault = { url: "", description: "", isValidUrl: true };
  const [listChilds, setListChilds] = useState({
    child1: dataChilDefault,
  });

  useEffect(() => {
    Object.entries(listChilds).map(([key, value]) => {
      // console.log(key, value);
    });
  }, []);

  const handleOnChangeInput = (name, value, key) => {
    let _listChilds = _.cloneDeep(listChilds);
    _listChilds[key][name] = value;

    if (value && name === "url") {
      _listChilds[key]["isValidUrl"] = true;
    }

    setListChilds(_listChilds);
    // console.log(_listChilds);
  };

  const handleAddNewInput = () => {
    let _listChilds = _.cloneDeep(listChilds);
    _listChilds[`child-${uuidv4()}`] = dataChilDefault;

    setListChilds(_listChilds);
  };

  const handleDeleteInput = (key) => {
    let _listChilds = _.cloneDeep(listChilds);
    delete _listChilds[key];
    setListChilds(_listChilds);
  };

  const buildDataToPersist = () => {
    let _listChilds = _.cloneDeep(listChilds);
    let result = [];
    Object.entries(_listChilds).map(([key, child], index) => {
      result.push({
        url: child.url,
        description: child.description,
      });
    });
    return result;
  };

  const handleSave = async () => {
    let invalidObj = Object.entries(listChilds).find(([key, child], index) => {
      return child && !child.url;
    });
    if (!invalidObj) {
      // call api
      let data = buildDataToPersist();
      let res = await createRole(data);
      if (res && res.errorCode === 0) {
        toast.success(res.message);
        childRef.current.fetchListRolesAgain();
      }
    } else {
      // Error
      toast.error("Input URL must not be empty...");
      let _listChilds = _.cloneDeep(listChilds);
      const key = invalidObj[0];
      _listChilds[key]["isValidUrl"] = false;
      setListChilds(_listChilds);
    }
  };

  return (
    <div className="role-container">
      <div className="container">
        <div className="mt-3 add-role">
          <div className="title-role ">
            <h4>Add a new role</h4>
            <div className="roles-parents">
              {Object.entries(listChilds).map(([key, child], index) => {
                return (
                  <div className="role-child row" key={`child-${key}`}>
                    <div className={`col-sm-5 form-group ${key}`}>
                      <label>URL</label>
                      <input
                        type="text"
                        className={
                          child.isValidUrl
                            ? "form-control"
                            : "form-control is-invalid"
                        }
                        value={child.url}
                        onChange={(e) =>
                          handleOnChangeInput("url", e.target.value, key)
                        }
                      />
                    </div>
                    <div className="col-sm-5 form-group">
                      <label>Description</label>
                      <input
                        type="text"
                        className="form-control"
                        value={child.description}
                        onChange={(e) =>
                          handleOnChangeInput(
                            "description",
                            e.target.value,
                            key
                          )
                        }
                      />
                    </div>
                    <div className="mt-4 col-sm-2 actions">
                      <i
                        className="fa fa-plus-circle add"
                        onClick={() => handleAddNewInput()}
                      ></i>
                      {index >= 1 && (
                        <i
                          className="fa fa-trash-o delete"
                          onClick={() => handleDeleteInput(key)}
                        ></i>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            <button
              className="mt-3 btn btn-warning"
              onClick={() => handleSave()}
            >
              Save
            </button>
          </div>
        </div>
        <hr />
        <div className="mt-3 table-role">
          <h4>List Current Role</h4>
          <TableRole ref={childRef} />
        </div>
      </div>
    </div>
  );
};

export default Role;
