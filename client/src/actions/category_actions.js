import axios from "axios";
import { GET_CATEGORIES, GET_CATEGORY_ID, CATEGORY_ADD } from "./types";
import { POST_SERVER, CATEGORY_SERVER } from "../components/utils/misc";

export function getCategories() {
  const request = axios
    .get(`${CATEGORY_SERVER}?sortBy=name`)
    .then(response => response.data);
  return {
    type: GET_CATEGORIES,
    payload: request
  };
}
export function getCategoryId(category) {
  const request = axios
    .get(`${CATEGORY_SERVER}/id?category=${category}`)
    .then(response => response.data);
  return {
    type: GET_CATEGORY_ID,
    payload: request
  };
}
export function CategoryAdd(dataToSubmit) {
  const request = axios
    .post(`${POST_SERVER}/category`, dataToSubmit)
    .then(response => response.data);
  return {
    type: CATEGORY_ADD,
    payload: request
  };
}
