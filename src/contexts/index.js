import { UserContext } from "./user/context";
import { UserReducer } from "./user/reducer";

import { GlobalContext } from "./global/context";
import { GlobalReducer } from "./global/reducer";

export const user = {
    context: UserContext,
    types: UserReducer.types,
};

export const global = {
    context: GlobalContext,
    types: GlobalReducer.types,
};
