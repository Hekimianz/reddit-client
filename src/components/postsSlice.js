import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loadPosts = createAsyncThunk(
  "posts/loadPosts",
  async (options) => {
    const requestPosts = await fetch(
      `https://www.reddit.com/r/${options.sub}.json`
    );

    const json = await requestPosts.json();
    return {
      resp: json,
      btn: options.btn,
      sub: options.sub,
    };
  }
);

export const postsSlice = createSlice({
  name: "posts",
  initialState: {
    isLoading: true,
    failedToLoad: false,
    posts: [],
    page: 0,
    upTo: 4,
    currSub: "popular",
  },
  reducers: {
    changeCurrSub(state, action) {
      state.currSub = action.payload;
    },
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
        if (action.payload.btn === "prev") {
          state.page = state.page - 2;
          state.upTo = state.upTo - 8;
        } else if (action.payload.btn === "first") {
          state.page = 0;
          state.upTo = 4;
        }
        state.isLoading = false;
        state.failedToLoad = false;
        state.posts = action.payload.resp.data.children
          .slice(state.upTo - 4, state.upTo)
          .map((post) => {
            return {
              subreddit: post.data.subreddit,
              author: post.data.author,
              title: post.data.title,
              numComments: post.data["num_comments"],
              score: post.data.score,
              media: post.data["is_video"] ? null : post.data.url,
              link: post.data.media ? null : post.data.url,
              thumbnail: post.data.media ? null : post.data.thumbnail,
              created: post.data.created,
              isVideo: post.data["is_video"],
              videoUrl: post.data["is_video"]
                ? post.data.media["reddit_video"]["fallback_url"]
                : null,
              hasMedia: post.data.preview ? true : false,
              hasContent: post.data["thumbnail"] === "self" ? false : true,
            };
          });

        state.page = state.page + 1;
        state.upTo = state.upTo + 4;
      });
  },
});

export const selectPosts = (state) => state.posts.posts;
export const isLoadingPosts = (state) => state.posts.isLoading;
export const selectState = (state) => state.posts;
export const selectPage = (state) => state.posts.page;
export const selectCurrSub = (state) => state.posts.currSub;
export const { changeCurrSub } = postsSlice.actions;

export default postsSlice.reducer;
