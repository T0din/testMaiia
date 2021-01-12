import produce from "immer";
import { ADD_ITEM, REMOVE_ITEM } from "./constants";

// The initial state of the App
export const initialState = {
  cart: [],
};

/* eslint-disable default-case, no-param-reassign */
const photosReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case ADD_ITEM:
        return {
          ...state,
          cart: state.cart.concat(action.item),
        };
      case REMOVE_ITEM:
        return {
          ...state,
          cart: state.cart.filter((item, index) => index !== action.item),
        };
    }
  });

export default photosReducer;
