import axios from "axios";

export class ScreamApi {
    static async getScreams(next = false) {
        try {
            return (await axios.get(`screams${ next ? '?next=' + next : "" }`)).data;
        } catch({ response }) {
            console.log(response.data);
            return response.data;
        }
    }
}
