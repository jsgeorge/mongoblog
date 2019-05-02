import React from "react";
import ReactDOM from "react-dom";
import "./Resources/css/styles2.css";
import { BrowserRouter } from "react-router-dom";

import Routes from "./routes";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import promiseMiddleware from "redux-promise";
import ReduxThunk from "redux-thunk";

import Reducer from "./reducers";

const createStoreWithMiddeware = applyMiddleware(promiseMiddleware, ReduxThunk)(
  createStore
);
//import App from './App';

const App = () => {
  return (
    <Provider
      store={createStoreWithMiddeware(
        Reducer,
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
          window.__REDUX_DEVTOOLS_EXTENSIONS__()
      )}
    >
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </Provider>
  );
};
ReactDOM.render(<App />, document.getElementById("root"));
