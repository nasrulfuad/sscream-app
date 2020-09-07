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
    notifications: [],
    screams: [],
    openModalScream: false,
    loadingModal: false,
    screamInModal: {},
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
            return {
                ...INITIAL_STORE,
                screams: state.screams,
            };

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

        /* Screams */

        case Types.SET_SCREAMS:
            return {
                ...state,
                screams:[
                    ...state.screams,
                    ...action.payload
                ]
            }

        case Types.UNSET_SCREAMS:
            return {
                ...state,
                screams: []
            }

        case Types.ADD_SCREAM:
            return {
                ...state,
                screams: [
                    action.payload,
                    ...state.screams
                ]
            }

        case Types.DELETE_SCREAM:
            return {
                ...state,
                screams: state.screams.filter(scream => scream.screamId !== action.payload)
            }

        case Types.SHOW_MODAL_SCREAM:
            return {
                ...state,
                openModalScream: true,
                loadingModal: true,
            }

        case Types.HIDE_MODAL_SCREAM:
            return {
                ...state,
                openModalScream: false,
            }

        case Types.SET_LOADING_MODAL_SCREAM:
            return {
                ...state,
                loadingModal: !state.loadingModal,
            }

        case Types.SET_SCREAM_MODAL:
            return {
                ...state,
                loadingModal: false,
                screamInModal: action.payload,
            }

        case Types.SET_COMMENT:
            return {
                ...state,
                screamInModal: {
                    ...state.screamInModal,
                    comments: [action.payload, ...state.screamInModal.comments]
                }
            }

        default:
            break;
    }
}
