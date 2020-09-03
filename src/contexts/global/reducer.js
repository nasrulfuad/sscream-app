import { Reducer } from "../AbstractReducer";

export class GlobalReducer extends Reducer {
    static types = {
        show: "SHOW_MESSAGE",
        hide: "HIDE_MESSAGE",
    };

    static reducer = (state, action) => {
        switch (action.type) {
            case this.types.show:
                return {
                    isShowMessage: true,
                    message: action.message,
                };

            case this.types.hide:
                return {
                    isShowMessage: false,
                };
            default:
                break;
        }
    };
}
