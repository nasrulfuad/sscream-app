export class Url {
    static #base = "https://asia-southeast2-scream-app-6ff64.cloudfunctions.net/api/";
    // static #base = "http://localhost:5000/scream-app-6ff64/asia-southeast2/api/";

    static signup = this.#base + "signup";
    static login = this.#base + "login";
    static verifyToken = this.#base + "verify";

    /* User Routes */
    static getProfile = this.#base + "users/profile";

    static getScreams(next = false, limit = false) {
        return `${this.#base}screams/${next ? "?next=" + next : ""}${
            limit ? "&limit=" + limit : ""
        }`;
    }
}
