import ACTIONS from "./actions";

const defaultState = {
    loggedIn : false
};

const authReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ACTIONS.Types.LOGIN: {
            console.log(action);
            return state;
        }

        case ACTIONS.Types.LOGOUT: {
            console.log(action);
            return state;
        }

        default:
            return state;
    }
};

export default authReducer;
