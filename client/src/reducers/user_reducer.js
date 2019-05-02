import {
  USER_LOGIN,
  USER_REGISTER,
  USER_EDIT,
  AUTH_USER,
  USER_LOGOUT,
  USER_ADD_TO_FOLLOWING,
  USER_DELETE_FROM_FOLLOWING,
  USER_GET_FOLLOWING_ITEMS
} from "../actions/types";

export default function(state = {}, action) {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        loginSuccess: action.payload
      };
    case USER_REGISTER:
      return {
        ...state,
        regSuccess: action.payload,
        regError: action.payload
      };
    case USER_EDIT:
      return {
        ...state,
        editSuccess: action.payload
      };
    case AUTH_USER:
      return {
        ...state,
        userData: action.payload
      };
    case USER_ADD_TO_FOLLOWING:
      return {
        ...state,
        userData: {
          ...state.userData,
          FOLLOWING: action.payload
        }
      };
    case USER_DELETE_FROM_FOLLOWING:
      return {
        ...state,
        FOLLOWINGDetail: action.payload.FOLLOWINGDetail,
        userData: {
          ...state.userData,
          FOLLOWING: action.payload.FOLLOWING
        }
      };
    case USER_GET_FOLLOWING_ITEMS:
      return {
        ...state,
        FOLLOWINGDetail: action.payload
      };

    case USER_LOGOUT:
      return { ...state };
    default:
      return state;
  }
}
