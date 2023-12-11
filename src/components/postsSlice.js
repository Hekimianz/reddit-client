import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loadPosts = createAsyncThunk("posts/loadPosts", async () => {
  const requestPosts = await fetch("https://www.reddit.com/r/popular.json");
  const json = await requestPosts.json();
  return json;
});

export const postsSlice = createSlice({
  name: "posts",
  initialState: {
    isLoading: true,
    failedToLoad: false,
    posts: [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadPosts.pending, (state) => {
        state.isLoading = true;
        state.failedToLoad = false;
      })
      .addCase(loadPosts.rejected, (state) => {
        state.isLoading = false;
        state.failedToLoad = true;
      })
      .addCase(loadPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.failedToLoad = false;
        state.posts = action.payload.data.children.slice(0, 4).map((post) => {
          return {
            subreddit: post.data.subreddit,
            author: post.data.author,
            title: post.data.title,
            numComments: post.data["num_comments"],
            score: post.data.score,
            media:
              "https://th-thumbnailer.cdn-si-edu.com/bgmkh2ypz03IkiRR50I-UMaqUQc=/1000x750/filters:no_upscale():focal(1061x707:1062x708)/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer_public/55/95/55958815-3a8a-4032-ac7a-ff8c8ec8898a/gettyimages-1067956982.jpg",
            date: "4 hours ago",
            isImage: true,
            isVideo: false,
            hasMedia: true,
          };
        });
      });
  },
});

export const selectPosts = (state) => state.posts.posts;
export const isLoadingPosts = (state) => state.posts.isLoading;

export default postsSlice.reducer;
