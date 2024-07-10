import { useEffect, useState } from "react";
import "./Users.scss";
import { fetchAllUser, deleteUser } from "../../services/userService";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import ModalDelete from "./ModalDelete";
import ModalUser from "./ModalUser";

const Users = (props) => {
  const [listUsers, setListUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(7);
  const [totalPages, setTotalPages] = useState(0);

  // Modal Delete
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [dataModal, setDataModel] = useState({});

  // Modal update/create user
  const [isShowModalUser, setIsShowModalUser] = useState(false);
  const [actionModalUser, setActionModalUser] = useState("CREATE");
  const [dataModalUser, setDataModalUser] = useState({});

  useEffect(() => {
    fetchUsers();
  }, [currentPage]);

  const fetchUsers = async () => {
    let response = await fetchAllUser(currentPage, currentLimit);
    // console.log(response);
    if (response && response.data && response.data.errorCode === 0) {
      // console.log(response.data.data);
      setTotalPages(response.data.data.totalPages);
      setListUsers(response.data.data.users);
    }
    // console.log(currentPage);
    // console.log("Total pages: ", totalPages, "List users: ", listUsers);
  };

  const handlePageClick = async (event) => {
    setCurrentPage(Number(event.selected) + 1);
    // console.log("CurrentPage after click: ", currentPage);
    // console.log("check data click", event.selected + 1);
  };

  const handleDeleteUser = async (user) => {
    setDataModel(user);
    setIsShowModalDelete(true);
  };

  const handleClose = () => {
    setIsShowModalDelete(false);
    setDataModel({});
  };

  const confirmDeleteUser = async () => {
    let response = await deleteUser(dataModal);
    if (response && response.data.errorCode === 0) {
      toast.success(response.data.message);
      await fetchUsers();
    } else {
      toast.error(response.data.message);
    }
    setIsShowModalDelete(false);
  };

  const onHideModalUser = async () => {
    setIsShowModalUser(false);
    setDataModalUser({});
    await fetchUsers();
  };

  const handleEditUser = (user) => {
    setActionModalUser("UPDATE");
    setDataModalUser(user);
    setIsShowModalUser(true);
  };

  return (
    <>
      <div className="container">
        <div className="manage-users-container">
          <div className="user-header">
            <div className="title">
              <h3>Table Users</h3>
            </div>
            <div className="actions">
              <button className="btn btn-success">Refresh</button>
              <button
                className="btn btn-primary"
                onClick={() => {
                  setIsShowModalUser(true);
                  setActionModalUser("CREATE");
                }}
              >
                Add new user
              </button>
            </div>
          </div>
          <div className="user-body">
            <table className="table table-hover table-bordered">
              <thead>
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Id</th>
                  <th scope="col">Email</th>
                  <th scope="col">Username</th>
                  <th scope="col">Group</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {listUsers && listUsers.length > 0 ? (
                  <>
                    {listUsers.map((item, index) => {
                      return (
                        <tr key={`row-${index}`}>
                          <th>
                            {(currentPage - 1) * currentLimit + index + 1}
                          </th>
                          <td>{item.id}</td>
                          <td>{item.email}</td>
                          <td>{item.username}</td>
                          <td>{item.Group ? item.Group.name : ""}</td>
                          <td>
                            <button
                              className="mx-3 btn btn-warning"
                              onClick={() => {
                                handleEditUser(item);
                              }}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-danger"
                              onClick={() => {
                                handleDeleteUser(item);
                              }}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </>
                ) : (
                  <>
                    <tr>
                      <td>Not found users</td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>
          {totalPages > 0 && (
            <div className="user-footer">
              <ReactPaginate
                nextLabel="&raquo;"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={4}
                pageCount={totalPages}
                previousLabel="&laquo;"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                renderOnZeroPageCount={null}
              />
            </div>
          )}
        </div>
      </div>
      <ModalDelete
        show={isShowModalDelete}
        handleClose={handleClose}
        confirmDeleteUser={confirmDeleteUser}
        dataModal={dataModal}
      />

      <ModalUser
        onHide={onHideModalUser}
        show={isShowModalUser}
        action={actionModalUser}
        dataModalUser={dataModalUser}
      />
    </>
  );
};

export default Users;
