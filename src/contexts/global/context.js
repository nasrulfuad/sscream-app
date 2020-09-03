import React, { createContext, useReducer } from "react";
import { GlobalReducer } from "./reducer";

export const GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => {
    const [global, dispatch] = useReducer(GlobalReducer.reducer, {
        isShowMessage: false,
    });

    return (
        <GlobalContext.Provider value={{ global, dispatch }}>
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalContextProvider;
