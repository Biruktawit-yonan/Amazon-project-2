import React, { useContext, useEffect } from "react";
import "./App.css";
import Router from "./Router";
import { auth } from "./Utility/firebase";
import { DataContext } from "./components/DataProvider/DataProvider";
import { Type } from "./Utility/Action.type";

function App() {
  const [{ user }, dispatch] = useContext(DataContext);
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: Type.SET_USER,
          user: authUser,
        });
      } else {
        dispatch({
          type: Type.SET_USER,
          user: null,
        });
      }
    });
  }, []);

  return (
    <>
      <Router />
    </>
  );
}

export default App;
