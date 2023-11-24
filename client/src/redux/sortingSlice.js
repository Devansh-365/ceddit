import { createAsyncThunk } from '@reduxjs/toolkit';
import { getPost } from '../api/posts';
import { createSlice } from '@reduxjs/toolkit';

// An example async action to fetch posts from an API
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    try {
      const response = await getPost();
      return response.data; // Assuming your API response has a 'data' property
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }
  });



const postsSlice = createSlice({
  name: 'posts',
  initialState: [],
  reducers: {
    sortByLikes: (state) => {
      return [...state].sort((a, b) => b.likes - a.likes);
    },
    sortByComments: (state) => {
      return [...state].sort((a, b) => b.comments - a.comments);
    },
    sortByLatest: (state) => {
      return [...state].sort((a, b) => b.timestamp - a.timestamp);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      // Assuming that the fetched data is an array of posts
      return action.payload;
    });
  },
});

export const { sortByLikes, sortByComments, sortByLatest } = postsSlice.actions;

export default postsSlice.reducer;