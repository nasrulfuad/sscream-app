import React, { createContext, useReducer, useEffect } from "react";
import jwtDecode from "jwt-decode";
import { UserApi } from "../Api/UserApi";
import { Reducer, INITIAL_STORE } from "./Reducer";
import { Types } from "./Types";

const Context = createContext();

const ContextProvider = ({ children }) => {
    const [store, dispatch] = useReducer(Reducer, INITIAL_STORE);

    const checkIsAuthenticated = () => {
        const token = localStorage.token;
        if (token) {
            if (jwtDecode(token).exp * 1000 < Date.now())
                return localStorage.removeItem('token');
            fetchProfile(token);
        }
    }


    const fetchProfile = async token => {
        const { data } = await UserApi.getProfile(token);
        dispatch({
            type: Types.SET_AUTHENTICATED,
            payload: data,
            token
        });
    }

    useEffect(checkIsAuthenticated, []);

    return <Context.Provider value={{ store, dispatch }}>{children}</Context.Provider>;
};

export { ContextProvider, Context };
