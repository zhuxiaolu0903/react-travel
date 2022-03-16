import {Middleware} from "redux";

export const actionLog: Middleware = (store) => (next) => (action) => {
  console.log(store.getState());
  console.log(action);
  next(action)
  console.log(store.getState());
}