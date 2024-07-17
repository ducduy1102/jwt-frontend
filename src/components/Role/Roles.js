import React, { useEffect, useState } from "react";
import "./Roles.scss";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";

const Roles = () => {
  const [listChilds, setListChilds] = useState({
    child1: { url: "", description: "" },
  });

  useEffect(() => {
    Object.entries(listChilds).map(([key, value]) => {
      console.log(key, value);
    });
  }, []);

  const handleOnChangeInput = (name, value, key) => {
    let _listChilds = _.cloneDeep(listChilds);

    _listChilds[key][name] = value;
    setListChilds(_listChilds);
    // console.log(_listChilds);
  };

  const handleAddnewInput = () => {
    let _listChilds = _.cloneDeep(listChilds);
    _listChilds[`child-${uuidv4()}`] = {
      url: "",
      description: "",
    };
    setListChilds(_listChilds);
  };

  const handleDeleteInput = (key) => {
    let _listChilds = _.cloneDeep(listChilds);
    delete _listChilds[key];
    setListChilds(_listChilds);
    // console.log(key);
  };

  return (
    <div className="role-container">
      <div className="container">
        <div className="mt-3">
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
                        className="form-control"
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
                        onClick={() => handleAddnewInput()}
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
            <button className="mt-3 btn btn-warning">Save</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Roles;
