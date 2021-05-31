import {createSelector} from "reselect";

const userState = (state) => state.userReducer;

export const makeSelectUser = createSelector(userState, userReducer => userReducer.user)
export const makeSelectAuthenticated = createSelector(userState, userReducer => userReducer.isAuthenticated)
