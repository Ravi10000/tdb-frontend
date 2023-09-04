import styles from "./user-management.module.scss";
import { fetchUsers } from "#api/users.req";
import { useEffect, useState } from "react";
import CustomButton from "#components/custom-button/custom-button";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import UsersPopup from "#components/users-popup/users-popup";

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  // const [selectedUser, setSelectedUser] = useState(null);
  console.log({ users });
  const limit = 10;
  const [skip, setSkip] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  async function handleFetchUsers() {
    try {
      const response = await fetchUsers(skip);
      if (response.data.status === "success") {
        setUsers(response.data.users);
        console.log({ response });
        setTotalUsers(response.data.totalUsers);
      }
    } catch (error) {
      console.log({ error });
    }
  }

  async function handleFetchPrevUsers() {
    if (skip === 0) return;
    try {
      const res = await fetchUsers(skip - limit);
      if (res.data.status === "success") {
        setSkip(skip - limit);
        setUsers(res.data.users);
      }
    } catch (err) {
      console.log({ err });
    }
  }
  async function handleFetchMoreUsers() {
    if (skip + limit >= totalUsers) return;

    const res = await fetchUsers(skip + limit);
    if (res.data.status === "success") {
      setSkip(skip + limit);
      setUsers(res.data.users);
    }
  }
  useEffect(() => {
    handleFetchUsers();
  }, []);
  return (
    <div className={styles.userManagement}>
      {showPopup && <UsersPopup close={() => setShowPopup(false)} />}
      <div className="_admin_head">
        <h1>Manage Users</h1>
        <CustomButton
          fit
          onClick={() => {
            setShowPopup(true);
          }}
        >
          Add User
        </CustomButton>
      </div>
      <div className={styles.usersContainer}>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>status</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr key={user._id}>
                <td>
                  {user.firstName} {user.lastName}
                </td>
                <td>{user.email}</td>
                <td
                  className={`${user.isVerified ? "__active" : "__inactive"}`}
                >
                  {user.isVerified ? "verified" : "not verfied"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="_pagination">
        <div className="_info">
          <p>
            {skip <= 0 ? 0 : skip}-{skip + users?.length} / {totalUsers}{" "}
          </p>
        </div>
        <div className="_navigation">
          <BiLeftArrowAlt
            className={`_nav_icon ${skip <= 0 ? "_inactive" : ""}`}
            onClick={handleFetchPrevUsers}
          />
          <BiRightArrowAlt
            className={`_nav_icon ${
              totalUsers <= skip + limit ? "_inactive" : ""
            }`}
            onClick={handleFetchMoreUsers}
          />
        </div>
      </div>
    </div>
  );
}

export default UserManagement;
