import UserActionTypes from "./user.types";

export function setUser(user) {
  return {
    type: UserActionTypes.SET_USER,
    payload: user,
  };
}

export function startFetching() {
  return {
    type: UserActionTypes.START_FETCHING,
  };
}
export function endFetching() {
  return {
    type: UserActionTypes.END_FETCHING,
  };
}
