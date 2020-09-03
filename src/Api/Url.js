const BASE = "https://asia-southeast2-scream-app-6ff64.cloudfunctions.net/api";
// const BASE = "http://localhost:5000/scream-app-6ff64/asia-southeast2/api";

const signup = BASE + "/signup";

const login = BASE + "/login";

const getScreams = (next, limit) =>
    BASE + `/screams?next${next}&limit=${limit}`;

export default {
    signup,
    login,
    getScreams,
};
