import axios from "axios";

const base = "https://asia-southeast2-scream-app-6ff64.cloudfunctions.net/api/";
// const base = "http://localhost:5000/scream-app-6ff64/asia-southeast2/api/";

axios.defaults.baseURL = base;

export class UserApi {
    static async signUp(data) {
        try {
            return (await axios.post("signup", data)).data;
        } catch({ response }) {
            return response.data;
        }
    }

    static async login(userData) {
        try {
            const { data } = await axios.post("login", userData);
            axios.defaults.headers.common['Authorization'] = "Bearer " + data.token;
            return data;
        } catch({ response }) {
            return response.data
        }
    }

    static async getProfile(token = false) {
        try {
            if (token) axios.defaults.headers.common['Authorization'] = "Bearer " + token;

            return (await axios.get("users/profile")).data;
        } catch ({ response }) {
            console.log(response.data);
            return false;
        }
    }

    static async uploadImage(formData) {
        try {
            return (await axios.post("users/image", formData)).data;
        } catch({ response }) {
            return response.data;
        }
    }
}
