import { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { deleteRole, fetchAllRole } from "../../services/roleService";
import { toast } from "react-toastify";

const TableRole = forwardRef((props, ref) => {
  const [listRoles, setListRoles] = useState([]);

  useEffect(() => {
    getAllRoles();
  }, []);

  useImperativeHandle(ref, () => ({
    fetchListRolesAgain() {
      getAllRoles();
    },
  }));

  const getAllRoles = async () => {
    let data = await fetchAllRole();
    if (data && +data.errorCode === 0) {
      setListRoles(data.data);
    }
  };

  const handleDeleteRole = async (role) => {
    let data = await deleteRole(role);
    if (data && data.errorCode === 0) {
      toast.success(data.message);
      await getAllRoles();
    }
  };

  return (
    <>
      <table className="table table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">URL</th>
            <th scope="col">Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {listRoles && listRoles.length > 0 ? (
            <>
              {listRoles.map((item, index) => {
                return (
                  <tr key={`row-${index}`}>
                    <td>{item.id}</td>
                    <td>{item.url}</td>
                    <td>{item.description}</td>
                    <td>
                      <span
                        title="Delete"
                        className="delete"
                        onClick={() => {
                          handleDeleteRole(item);
                        }}
                      >
                        <i className="fa fa-trash-o"></i>
                      </span>
                    </td>
                  </tr>
                );
              })}
            </>
          ) : (
            <>
              <tr>
                <td colSpan={4}>Not found roles</td>
              </tr>
            </>
          )}
        </tbody>
      </table>
    </>
  );
});

export default TableRole;
