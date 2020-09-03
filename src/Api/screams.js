import url from "./Url";

export const getScreams = async (next = null, callback) => {
    const { data } = await (await fetch(url.getScreams(next))).json();
    return callback(data);
};
