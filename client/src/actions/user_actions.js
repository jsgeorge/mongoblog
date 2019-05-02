import axios from "axios";
import {
  USER_LOGIN,
  USER_REGISTER,
  AUTH_USER,
  USER_EDIT,
  USER_LOGOUT
  // USER_ADD_TO_CART,
  // USER_DELETE_FROM_CART,
  // USER_GET_CART_ITEMS,
  // USER_BUY_SUCCESS
} from "./types";
import { USER_SERVER } from "../components/utils/misc";

export function UserLogin(dataToSubmit) {
  const request = axios
    .post(`${USER_SERVER}/login`, dataToSubmit)
    .then(response => response.data);
  return {
    type: USER_LOGIN,
    payload: request
  };
}
export function UserRegister(dataToSubmit) {
  const request = axios
    .post(`${USER_SERVER}/register`, dataToSubmit)
    .then(response => response.data);
  return {
    type: USER_REGISTER,
    payload: request
  };
}
export function UserEdit(dataToSubmit) {
  const request = axios
    .post(`${USER_SERVER}/edit`, dataToSubmit)
    .then(response => response.data);
  return {
    type: USER_EDIT,
    payload: request
  };
}
// export function AddToCart(_id) {
//   const request = axios
//     .post(`${USER_SERVER}/addtocart?prodId=${_id}`)
//     .then(response => response.data);
//   return {
//     type: USER_ADD_TO_CART,
//     payload: request
//   };
// }
// export function DeleteFromCart(id) {
//   const request = axios
//     .get(`${USER_SERVER}/deletefromcart?_id=${id}`)
//     .then(response => {
//       response.data.cart.forEach(item => {
//         response.data.cartDetail.forEach((k, i) => {
//           if (item.id === k._id) {
//             response.data.cartDetail[i].quantity = item.quantity;
//           }
//         });
//       });
//       return response.data;
//     });
//   return {
//     type: USER_DELETE_FROM_CART,
//     payload: request
//   };
// }
// export function GetCartItems(cartItems, userCart) {
//   const request = axios
//     .get(`${PRODUCT_SERVER}/articles_by_id?id=${cartItems}&type=array`)
//     .then(response => {
//       userCart.forEach(item => {
//         response.data.forEach((k, i) => {
//           if (item.id === k._id) {
//             response.data[i].quantity = item.quantity;
//           }
//         });
//       });
//       return response.data;
//     });

//   return {
//     type: USER_GET_CART_ITEMS,
//     payload: request
//   };
// }
export function UserLogout() {
  const request = axios
    .get(`${USER_SERVER}/logout`)
    .then(response => response.data);
  return {
    type: USER_LOGOUT,
    payload: request
  };
}
export function auth() {
  const request = axios
    .get(`${USER_SERVER}/auth`)
    .then(response => response.data);
  return {
    type: AUTH_USER,
    payload: request
  };
}
