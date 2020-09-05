export class LocalStorage {
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

    static getItem() {
        const data = {};
        for (let propery of this.#properties) {
            data[propery] = localStorage.getItem(propery);
        }
        return data;
    }

    static removeItem() {
        this.process();
    }

    static setItem(data) {
        this.process(data);
    }
}
