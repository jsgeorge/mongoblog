import {
  GET_POSTS,
  GET_POSTS_BY_ID,
  CLEAR_POSTS_BY_ID,
  COMMENT_ADD,
  POST_ADD
} from "../actions/types";

export default function(state = {}, action) {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        toView: action.payload.articles,
        toViewSize: action.payload.size
      };
    case GET_POSTS_BY_ID:
      return {
        ...state,
        byId: action.payload
      };
    case CLEAR_POSTS_BY_ID:
      return { ...state, prodDetail: action.payload };

    case POST_ADD:
      return { ...state, addSuccess: action.payload };
    case COMMENT_ADD:
      return { ...state, addSuccess: action.payload };

    default:
      return state;
  }
}
