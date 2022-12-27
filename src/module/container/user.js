import React, { useEffect, useState } from "react";
import UserForm from "../components/userForm";
import UserList from "../components/userList";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "./userStore/userStore";
import "../css/user.css";

const User = (aProps) => {
  const [error, setErrorMsg] = useState();
  const [hideForm, setHideForm] = useState(false);
  const dispatch = useDispatch();
  const mode = useSelector((aState) => aState.user.applicationTheme);
  const users = useSelector((aState) => aState.user.user);
  const api = "https://reqres.in/api/users";

  useEffect(() => {
    if (users.length === 0) {
      fetchUser();
    }
  }, []);

  const fetchUser = async () => {
    const responseUser = await fetch(api);
    const user = await responseUser.json();
    if (!responseUser.ok) {
      setErrorMsg(responseUser.error.message);
      return;
    }
    dispatch(userActions.storeUsers(user.data));
  };

  const fetchNewUser = async (aUser) => {
    const responseUser = await fetch(`${api}`, {
      method: "POST",
      body: JSON.stringify({
        email: aUser.email,
        first_name: aUser.firstName,
        last_name: aUser.lastName,
      }),
    });

    const responseUserId = await responseUser.json();
    if (!responseUser.ok) {
      setErrorMsg(responseUserId.error.message);
      return;
    }
    dispatch(
      userActions.addUser({
        id: responseUserId.id,
        email: aUser.email,
        firstName: aUser.firstName,
        lastName: aUser.lastName,
      })
    );
  };

  const showForm = () => {
    setHideForm(!hideForm);
  };
  return (
    <div id={mode === "dark" ? "darkUserComponent" : "lightUserComponent"}>
      <div className="form-check">
        <input onClick={aProps.toggleMode} type="checkbox" />
        <label className="form-check-label">
          {mode === "dark" ? "Dark Mode" : "Light Mode"}
        </label>
      </div>
      <div className="view-ls">
      <button className="btn-add" onClick={showForm}>
        AddUser
      </button>
      <UserList errorMsg={error} />
      </div>
      {hideForm && <UserForm hideForm={showForm} AddUser={fetchNewUser} />}
    </div>
  );
};
export default User;
