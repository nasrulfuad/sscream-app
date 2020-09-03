import url from "./Url";

export class User {
    static post(data) {
        return {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        };
    }

    static async signUp(data) {
        return await (await fetch(url.signup, this.post(data))).json();
    }

    static async login(data) {
        return await (await fetch(url.login, this.post(data))).json();
    }
}
