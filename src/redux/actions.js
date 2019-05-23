import { Types } from "./types";

const login = (task) => ({
    type: Types.LOGIN,
    payload: task
});

const logout = (task) => ({
    type: Types.LOGOUT,
    payload: task
});

export default {
    login,
    logout,
    Types
}
