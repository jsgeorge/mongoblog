import {
  GET_CATEGORIES,
  GET_CATEGORY_ID,
  CATEGORY_ADD
} from "../actions/types";

export default function(state = {}, action) {
  switch (action.type) {
    case GET_CATEGORIES:
      return { ...state, byName: action.payload };
    case GET_CATEGORY_ID:
      return { ...state, Name: action.payload };
    case CATEGORY_ADD:
      return { ...state, addSuccess: action.payload };
    default:
      return state;
  }
}
