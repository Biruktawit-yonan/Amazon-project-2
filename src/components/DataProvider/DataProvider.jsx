import React, { createContext, useReducer } from "react";


// create new context
export const DataContext=createContext();
export const DataProvider=({ children, reducer, initialState }) => {
  return (
    // useReducer is used to manage complex state logic and handling user action
    // datacontext.provider- makes available to all components
    <DataContext.Provider value={useReducer(reducer,initialState)}>
      {children}
    </DataContext.Provider>
  );
};
