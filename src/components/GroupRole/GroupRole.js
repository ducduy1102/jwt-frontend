import { useEffect, useState } from "react";
import "./GroupRole.scss";
import { fetchGroup } from "../../services/userService";
import { toast } from "react-toastify";
import {
  assignRoleToGroup,
  fetchAllRole,
  fetchRolesByGroup,
} from "../../services/roleService";
import _ from "lodash";

const GroupRole = () => {
  const [userGroup, setUserGroup] = useState([]);
  const [selectGroup, setSelectGroup] = useState("");
  const [listRoles, setListRoles] = useState([]);

  const [assignRolesByGroup, setAssignRolesByGroup] = useState([]);

  useEffect(() => {
    getGroups();
    getAllRoles();
  }, []);

  const getGroups = async () => {
    let res = await fetchGroup();
    if (res && res.errorCode === 0) {
      setUserGroup(res.data);
    } else {
      toast.error(res.message);
    }
  };

  const getAllRoles = async () => {
    let data = await fetchAllRole();
    if (data && +data.errorCode === 0) {
      setListRoles(data.data);
    }
  };

  const buildDataRolesByGroup = (groupRoles, allRoles) => {
    let results = [];
    if (allRoles && allRoles.length > 0) {
      allRoles.map((role) => {
        let obj = {};
        obj.url = role.url;
        obj.id = role.id;
        obj.description = role.description;
        obj.isAssigned = false;

        if (groupRoles && groupRoles.length > 0) {
          obj.isAssigned = groupRoles.some(
            (item) => item.Roles.url === obj.url
          );
        }
        results.push(obj);
      });
    }
    return results;
  };

  const handleOnChangeGroup = async (value) => {
    setSelectGroup(value);

    if (value) {
      let data = await fetchRolesByGroup(value);

      if (data && +data.errorCode === 0) {
        let result = buildDataRolesByGroup(data.data, listRoles);
        setAssignRolesByGroup(result);
      }
    }
  };

  const handleSelectRole = (value) => {
    const _assignRolesByGroup = _.cloneDeep(assignRolesByGroup);
    let foundIndex = _assignRolesByGroup.findIndex(
      (item) => +item.id === +value
    );

    if (foundIndex > -1) {
      _assignRolesByGroup[foundIndex].isAssigned =
        !_assignRolesByGroup[foundIndex].isAssigned;
    }
    setAssignRolesByGroup(_assignRolesByGroup);
  };

  const buildDataToSave = () => {
    // data = {groupId: 4, groupRoles: [{groupId:4, roleId: 1}, {groupId:4, roleId: 2}, {},..] }

    let result = {};
    const _assignRolesByGroup = _.cloneDeep(assignRolesByGroup);
    result.groupId = selectGroup;
    let groupRolesFilter = _assignRolesByGroup.filter(
      (item) => item.isAssigned === true
    );
    let finalGroupRoles = groupRolesFilter.map((item) => {
      let data = { groupId: +selectGroup, roleId: +item.id };
      return data;
    });
    result.groupRoles = finalGroupRoles;

    return result;
  };

  const handleSave = async () => {
    let data = buildDataToSave();
    let res = await assignRoleToGroup(data);
    if (res && res.errorCode === 0) {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  };

  return (
    <div className="group-role-container">
      <div className="container">
        <div className="container mt-3">
          <h4>Group Role</h4>
          <div className="assign-group-role">
            <div className="mb-3 col-sm-6 form-group">
              <label className="mb-1">
                Select Group (<span className="red">*</span>)
              </label>
              <select
                className={"form-select"}
                onChange={(e) => handleOnChangeGroup(e.target.value)}
              >
                <option value="">Please select your group</option>
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
            <hr />
            {selectGroup && (
              <div className="list-roles">
                <h5>Assign Roles</h5>
                {assignRolesByGroup &&
                  assignRolesByGroup.length > 0 &&
                  assignRolesByGroup.map((item, index) => {
                    return (
                      <div className="form-check" key={`list-role-${index}`}>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value={item.id}
                          id={`list-role-${index}`}
                          checked={item.isAssigned}
                          onChange={(e) => handleSelectRole(e.target.value)}
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`list-role-${index}`}
                        >
                          {item.url}
                        </label>
                      </div>
                    );
                  })}
                <div className="mt-3">
                  <button
                    className="btn btn-warning"
                    onClick={() => handleSave()}
                  >
                    Save
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupRole;
