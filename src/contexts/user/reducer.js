import { Reducer } from "../AbstractReducer";

export class UserReducer extends Reducer {
    static types = {
        login: "LOGIN",
        logout: "LOGOUT",
    };

    static reducer = (state, action) => {
        switch (action.type) {
            case this.types.login:
                LocalStorage.setItem({
                    token: action.token,
                    uid: action.user.userId,
                    data: JSON.stringify(action.user),
                });
                return {
                    data: action.user,
                    isLoggedIn: true,
                    token: action.token,
                };

            case this.types.logout:
                LocalStorage.removeItem();
                return {
                    isLoggedIn: false,
                };

            default:
                break;
        }
    };
}

class LocalStorage {
    static #properties = ["token", "uid", "data"];

    static process(data = false) {
        for (let property of this.#properties) {
            data
                ? localStorage.setItem(property, data[property])
                : localStorage.removeItem(property);
        }
    }

    static setProperty(array) {
        this.#properties = [...array, ...this.#properties];
        return this;
    }

    static removeItem() {
        this.process();
    }

    static setItem(data) {
        this.process(data);
    }
}
