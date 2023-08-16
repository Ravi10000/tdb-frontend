import UserActionTypes from "./user.types";
const initialState = {
  currentUser: null,
  isFetching: false,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case UserActionTypes.SET_USER:
      return { ...state, currentUser: action.payload };
    case UserActionTypes.START_FETCHING:
      return { ...state, isFetching: true };
    case UserActionTypes.END_FETCHING:
      return { ...state, isFetching: false };
    default:
      return state;
  }
}
