import axios from "axios";
import { Types } from './Types';

export const INITIAL_STORE = {
    authenticated: false,
    credentials: {
        imageUrl: "https://firebasestorage.googleapis.com/v0/b/scream-app-6ff64.appspot.com/o/user-default.png?alt=media",
        handle: "guest",
        bio: "Hello, i'm guest",
        website: "https://nasrulfuad.github.io",
        location: "Jember, Jawa Timur, Indonesia",
        email: "guest@email.com",
        createdAt: "2020-08-31T11:21:28.281Z"
    },
    likes: [],
    notifications: []
};

export function Reducer(state, action) {
    switch (action.type) {
        case Types.SET_AUTHENTICATED:
            localStorage.setItem('token', action.token);
            return {
                ...state,
                ...action.payload,
                authenticated: true
            };

        case Types.SET_UNAUTHENTICATED:
            localStorage.removeItem('token');
            delete axios.defaults.headers.common['Authorization'];
            return INITIAL_STORE;

        case Types.SET_USER:
            return {
                ...state,
                ...action.payload,
                authenticated: true
            }

        case Types.SET_PROFILE:
            return {
                ...state,
                credentials: {
                    ...state.credentials,
                    ...action.data
                }
            }

        case Types.SET_IMAGE_PROFILE:
            return {
                ...state,
                credentials: {
                    ...state.credentials,
                    imageUrl: action.imageUrl,
                }
            }

        default:
            break;
    }
}
