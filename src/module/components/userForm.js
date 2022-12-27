import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import "../css/userForm.css";

const UserForm = (aProps) => {
  const email = useRef();
  const firstName = useRef();
  const lastName = useRef();
  const mode = useSelector((aState) => aState.user.applicationTheme);
  const [errorMsg, setErrorMsg] = useState({
    emailError: "",
    firstNameError: "",
    lastNameError: "",
  });

  const onSubmit = () => {
    const enteredEmail = email.current.value;
    const enteredFirsetName = firstName.current.value;
    const enteredLastName = lastName.current.value;

    if (!isFormValid(enteredEmail, enteredFirsetName, enteredLastName)) {
      return;
    }

    const user = {
      email: enteredEmail,
      firstName: enteredFirsetName,
      lastName: enteredLastName,
    };

    aProps.AddUser(user);
    aProps.hideForm();
  };

  const isFormValid = (enteredEmail, enteredFirsetName, enteredLastName) => {
    const emailError = isEmailValid(enteredEmail);
    const firstNameError = isNameValid(enteredFirsetName);
    const lastNameError = isNameValid(enteredLastName);

    setErrorMsg({
      emailError: emailError,
      firstNameError: firstNameError,
      lastNameError: lastNameError,
    });

    if ((emailError || firstNameError || lastNameError) === "") {
      return true;
    }
  };

  const isEmailValid = (aUserInput) => {
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return !aUserInput
      ? "Email is required"
      : aUserInput.match(regex)
      ? ""
      : "Email invalid!";
  };

  const isNameValid = (aUserInput) => {
    return !aUserInput ? "Name is required" : "";
  };

  return (
    <div
      className="model-form"
      id={mode === "dark" ? "darkUserFormComponent" : "lightUserFormComponent"}
    >
      <h1 className="heading">User Form</h1>
      <div className="wrapper">
        <div className="inner-form">
          <input
            className="inputfeild"
            placeholder="email"
            type="email"
            ref={email}
          />
          <p>{errorMsg.emailError}</p>
          <input
            className="inputfeild"
            placeholder="FirstName"
            type="text"
            ref={firstName}
          />
          <p>{errorMsg.firstNameError}</p>
          <input
            className="inputfeild"
            placeholder="LastName"
            type="text"
            ref={lastName}
          />
          <p>{errorMsg.lastNameError}</p>
        </div>
        <div className="btn-ls">
          <button onClick={onSubmit} className="">
            Submit
          </button>
          <button onClick={aProps.hideForm} className="">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
export default UserForm;
