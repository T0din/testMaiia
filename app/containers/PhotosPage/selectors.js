/**
 * PhotosPage selectors
 */

import { createSelector } from "reselect";
import { initialState } from "./reducer";

const selectPhotos = (state) => state.photos || initialState;

const makeSelectCart = () =>
  createSelector(
    selectPhotos,
    (photosState) => photosState.cart
  );

export { selectPhotos, makeSelectCart };
