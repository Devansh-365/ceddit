import { configureStore } from '@reduxjs/toolkit';
import postsReducer from "./sortingSlice"

const store = configureStore({
  reducer: {
    posts: postsReducer,
  },
});

export default store;

