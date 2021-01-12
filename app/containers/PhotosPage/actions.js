import { ADD_ITEM, REMOVE_ITEM } from "./constants";

/**
 * Add item to shopping cart
 *
 * @param  {string} item The new item added to Cart
 *
 * @return {object} An action object with a type of ADD_ITEM
 */
export function addItemToCart(item) {
  return {
    type: ADD_ITEM,
    item,
  };
}

/**
 * Remove item from shopping cart
 *
 * @param  {string} item The item removed from Cart
 *
 * @return {object} An action object with a type of REMOVE_ITEM
 */
export function removeItemFromCart(item) {
  return {
    type: REMOVE_ITEM,
    item,
  };
}
