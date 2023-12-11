// import mockData from "./mockData";
import Post from "./components/Post";
import styles from "./css/App.module.css";
import redditLogo from "./assets/reddit-logo.png";
import spinningWheel from "./assets/rotate-right.png";
import { v4 as uuidv4 } from "uuid";
import { loadPosts } from "./components/postsSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectPosts,
  selectState,
  selectPage,
  isLoadingPosts,
} from "./components/postsSlice";

function App() {
  const dispatch = useDispatch();
  const allPosts = useSelector(selectPosts);
  useEffect(() => {
    dispatch(loadPosts());
  }, [dispatch]);
  console.log(useSelector(selectState));

  const posts = allPosts.map((post) => {
    return (
      <Post
        title={post.title}
        sub={post.subredditNamePrefixed}
        author={post.author}
        numComments={post.numComments}
        score={post.score}
        date={post.date}
        media={
          "https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg"
        }
        isImage={post.isImage}
        isVideo={post.isVideo}
        hasMedia={post.hasMedia}
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
          onClick={() => dispatch(loadPosts("prev"))}
        >
          Prev Page
        </button>
        <span>Page {useSelector(selectPage)}</span>
        <button className={styles.btn} onClick={() => dispatch(loadPosts())}>
          Next Page
        </button>
      </div>
    </div>
  );
}

export default App;
