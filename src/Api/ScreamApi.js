import axios from "axios";

export class ScreamApi {
    static async getScreams(next = false) {
        try {
            return (await axios.get(`screams?limit=10${ next ? '&next=' + next : "" }`)).data;
        } catch({ response }) {
            console.log(response.data);
            return response.data;
        }
    }

    static async getScream(screamId) {
        try {
            return (await axios.get(`screams/${screamId}`)).data;
        } catch({ response }) {
            console.log(response.data);
            return response.data;
        }
    }

    static async addScream(data) {
        try {
            return (await axios.post("screams", data)).data;
        } catch({ response }) {
            console.log(response.data);
            return response.data;
        }
    }

    static async commentScream(screamId, body) {
        try {
            return (await axios.post(`screams/${screamId}/comments`, body)).data;
        } catch({ response }) {
            console.log(response.data);
            return response.data;
        }
    }


    static async likeScream(screamId) {
        try {
            return (await axios.post(`screams/${screamId}/like`)).data;
        } catch({ response }) {
            console.log(response.data);
            return response.data;
        }
    }

    static async unLikeScream(screamId) {
        try {
            return (await axios.post(`screams/${screamId}/unlike`)).data;
        } catch({ response }) {
            console.log(response.data);
            return response.data;
        }
    }

    static async deleteScream(screamId) {
        try {
            return (await axios.delete(`screams/${screamId}`)).data;
        } catch({ response }) {
            console.log(response.data);
            return response.data;
        }
    }
}
