import { combineReducers } from "redux";
import user from "./user_reducer";
import posts from "./post_reducer";
import categories from "./category_reducer";
const rootReducer = combineReducers({
  user,
  posts,
  categories
});
export default rootReducer;
