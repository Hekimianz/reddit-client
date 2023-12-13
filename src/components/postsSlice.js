import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loadPosts = createAsyncThunk(
  "posts/loadPosts",
  async (options) => {
    const requestPosts = await fetch(
      `https://www.reddit.com/r/${options.sub}.json?q=raw_json=1`
    );

    const json = await requestPosts.json();
    return {
      resp: json,
      btn: options.btn,
      sub: options.sub,
    };
  }
);

const getUrl = (imgUrl) => {
  const encoded = imgUrl.replace("amp;s", "s");
  const doubleEncoded = encoded.replace("amp;", "");
  const tripleEncoded = doubleEncoded.replace("amp;", "");
  return tripleEncoded;
};

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
    toggleGallery(state) {
      state.test = !state.test;
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
              created: post.data.created,
              isVideo: post.data["is_video"] ? true : false,
              videoUrl: post.data["is_video"]
                ? post.data.media["reddit_video"]["fallback_url"]
                : null,
              isGallery: post.data["is_gallery"] ? true : false,
              hiddenGallery: true,
              galleryMedia: post.data["is_gallery"]
                ? Object.entries(post.data["media_metadata"]).map((entry) => {
                    return getUrl(entry[1].s.u);
                  })
                : null,
              isConversation:
                post.data.preview || post.data["is_gallery"] ? false : true,
              conversationUrl: post.data.url,
              isImage:
                !post.data["is_video"] &&
                !post.data["is_gallery"] &&
                post.data.preview
                  ? true
                  : false,
              imageUrl:
                !post.data["is_video"] &&
                !post.data["is_gallery"] &&
                post.data.preview
                  ? getUrl(post.data.preview.images[0].source.url)
                  : null,
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
