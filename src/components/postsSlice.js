import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loadPosts = createAsyncThunk(
  "posts/loadPosts",
  async (btn = "next") => {
    const requestPosts = await fetch("https://www.reddit.com/r/popular.json");
    const json = await requestPosts.json();
    return {
      resp: json,
      btn: btn,
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
              media:
                "https://th-thumbnailer.cdn-si-edu.com/bgmkh2ypz03IkiRR50I-UMaqUQc=/1000x750/filters:no_upscale():focal(1061x707:1062x708)/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer_public/55/95/55958815-3a8a-4032-ac7a-ff8c8ec8898a/gettyimages-1067956982.jpg",
              date: "4 hours ago",
              isImage: true,
              isVideo: false,
              hasMedia: true,
            };
          });
        if (action.payload.btn === "next") {
          state.page = state.page + 1;
          state.upTo = state.upTo + 4;
        } else {
          state.page = state.page + 1;
          state.upTo = state.upTo + 4;
        }
      });
  },
});

export const selectPosts = (state) => state.posts.posts;
export const isLoadingPosts = (state) => state.posts.isLoading;
export const selectState = (state) => state.posts;
export const selectPage = (state) => state.posts.page;

export default postsSlice.reducer;
