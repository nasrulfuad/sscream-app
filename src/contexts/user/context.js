import React, { createContext, useReducer } from "react";
import { UserReducer } from "./reducer";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
    const [user, dispatch] = useReducer(UserReducer.reducer, {}, () => {
        const token = localStorage.getItem("token");
        const uid = localStorage.getItem("uid");
        const data = JSON.parse(localStorage.getItem("data"));

        if (token && uid && data) {
            return {
                isLoggedIn: true,
                token,
                uid,
                data,
            };
        }
        return { isLoggedIn: false };
    });

    return (
        <UserContext.Provider value={{ user, dispatch }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;
