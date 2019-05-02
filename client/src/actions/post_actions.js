import axios from "axios";
import {
  GET_POSTS,
  GET_POSTS_BY_ID,
  POST_ADD,
  COMMENT_ADD,
  CLEAR_POSTS_BY_ID
} from "./types";

import { POST_SERVER } from "../components/utils/misc";

export function getPosts(skip, limit, filters = [], previousState = []) {
  const data = {
    limit,
    skip,
    filters
  };
  const request = axios.post(`${POST_SERVER}/view`, data).then(response => {
    let newState = [...previousState, ...response.data.articles];

    return {
      size: response.data.size,
      articles: newState
    };
  });
  return {
    type: GET_POSTS,
    payload: request
  };
}
export function getPostsbyId(id, type) {
  const request = axios
    .get(`${POST_SERVER}/articles_by_id?type=${type}&id=${id}`)
    .then(response => response.data);
  return {
    type: GET_POSTS_BY_ID,
    payload: request
  };
}
export function clearPostById() {
  return {
    type: CLEAR_POSTS_BY_ID,
    payload: ""
  };
}
export function PostAdd(dataToSubmit) {
  const request = axios
    .post(`${POST_SERVER}/article`, dataToSubmit)
    .then(response => response.data);
  return {
    type: POST_ADD,
    payload: request
  };
}
export function commentAdd(id, dataToSubmit) {
  const request = axios
    .post(`${POST_SERVER}/comment?id=${id}`, dataToSubmit)
    .then(response => response.data);
  return {
    type: COMMENT_ADD,
    payload: request
  };
}
