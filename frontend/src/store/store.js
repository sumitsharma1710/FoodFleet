import { createStore } from "vuex";
import auth from "./module/auth";

const store = createStore({
    modules: {
        auth
    }
})

export default store;