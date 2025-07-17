import { createStore } from 'redux';

// Initial state
const initialState = {
    token: null,
    userId: null,
    role: null,
};

// Action types
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

// Action creators
export const login = (token, userId, role) => ({
    type: LOGIN,
    payload: { token, userId, role },
});

export const logout = () => ({
    type: LOGOUT,
});

// Reducer
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                token: action.payload.token,
                userId: action.payload.userId,
                role: action.payload.role,
            };
        case LOGOUT:
            return initialState;
        default:
            return state;
    }
};

// Create store
const store = createStore(authReducer);

export default store;