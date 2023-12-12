// import mockData from "./mockData";
import Post from "./components/Post";
import styles from "./css/App.module.css";
import redditLogo from "./assets/reddit-logo.png";
import spinningWheel from "./assets/rotate-right.png";
import { v4 as uuidv4 } from "uuid";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectPosts,
  selectPage,
  isLoadingPosts,
  loadPosts,
  selectCurrSub,
} from "./components/postsSlice";

function App() {
  const currSub = useSelector(selectCurrSub);
  const dispatch = useDispatch();
  const allPosts = useSelector(selectPosts);
  useEffect(() => {
    dispatch(loadPosts({ btn: "first", sub: currSub }));
  }, [dispatch, currSub]);

  const posts = allPosts.map((post) => {
    return (
      <Post
        title={post.title}
        sub={post.subreddit}
        author={post.author}
        numComments={post.numComments}
        score={post.score}
        media={post.media}
        created={post.created}
        isVideo={post.isVideo}
        hasMedia={post.hasMedia}
        videoUrl={post.videoUrl}
        link={post.link}
        thumbnail={post.thumbnail}
        hasContent={post.hasContent}
        key={uuidv4()}
      />
    );
  });

  return (
    <div className={styles.appCont}>
      <nav className={styles.nav}>
        <img src={redditLogo} alt="reddit logo" />
        <span className={styles.navTitle}>Reddit Minimal</span>
      </nav>
      {useSelector(isLoadingPosts) ? (
        <div className={styles.loadingDiv}>
          <img
            src={spinningWheel}
            className={styles.loadingWheel}
            alt="spinning wheel"
          />
        </div>
      ) : (
        posts
      )}
      <div className={styles.btnsCont}>
        <button
          className={
            useSelector(selectPage) > 1 ? styles.btn : styles.btnDisabled
          }
          onClick={() => dispatch(loadPosts({ btn: "prev", sub: currSub }))}
        >
          Prev Page
        </button>
        <span>Page {useSelector(selectPage)}</span>
        <button
          className={styles.btn}
          onClick={() => dispatch(loadPosts({ btn: "next", sub: currSub }))}
        >
          Next Page
        </button>
      </div>
    </div>
  );
}

export default App;
