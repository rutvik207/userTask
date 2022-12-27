import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import User from "./module/container/user";
import { userActions } from "./module/container/userStore/userStore";

function App() {
  const mode = useSelector((aState) => aState.user.applicationTheme);
  const dispatch = useDispatch();

  const toggleMode = () => {
    if (mode === "dark") {
      dispatch(userActions.changeTheme("light"));
    } else {
      dispatch(userActions.changeTheme("dark"));
    }
  };

  return (
    <div
      className="App"
      id={mode === "dark" ? "darkComponentWrapper" : "lightComponentWrapper"}
    >
      <User mode={mode} toggleMode={toggleMode} />
    </div>
  );
}

export default App;
