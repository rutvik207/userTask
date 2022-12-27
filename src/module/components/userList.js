import React from "react";
import { useSelector } from "react-redux";
import "../css/userList.css";
import dummyimage from "../images/sreekar_ogirala_small.png"

const UserList = (aProps) => {
  const user = useSelector((aState) => aState.user.user);
  const mode = useSelector((aState) => aState.user.applicationTheme);

  const renderUserListHeader = () => {
    return (
      <tr>
        <th></th>
        <th>Id</th>
        <th>Name</th>
        <th>Email</th>
      </tr>
    );
  };

  const renderUserList = () => {
    return user.map((aUser, aIndex) => {
      return (
        <tr key={aUser.id}>
          <td><img src={aUser.avatar ? aUser.avatar : dummyimage}></img></td>
          <td>{aIndex + 1}</td>
          <td>{aUser.first_name + " " + aUser.last_name}</td>
          <td>{aUser.email}</td>
        </tr>
      );
    });
  };
  return (
    <div
      className={`userList-wrapper ${
        mode === "dark" ? "darkUserListComponent" : "LightUserListComponent"
      }`}
    >
      <p>{aProps.errorMsg}</p>
      {user.length !== 0 && (
        <div className="userDataTable">
          <table className="tableData">
            <tbody>
              {renderUserListHeader()}
              {renderUserList()}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
export default UserList;
