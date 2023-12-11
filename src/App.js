// import mockData from "./mockData";
import Post from "./components/Post";
import styles from "./css/App.module.css";
import redditLogo from "./assets/reddit-logo.png";
import { v4 as uuidv4 } from "uuid";
import { loadPosts } from "./components/postsSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectPosts } from "./components/postsSlice";

function App() {
  const dispatch = useDispatch();
  const allPosts = useSelector(selectPosts);
  useEffect(() => {
    dispatch(loadPosts());
  }, [dispatch]);

  const posts = allPosts.map((post) => {
    return (
      <Post
        title={post.title}
        sub={post.subredditNamePrefixed}
        author={post.author}
        numComments={post.numComments}
        score={post.score}
        date={post.date}
        media={post.media}
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
      {posts}
      <div className={styles.btnsCont}>
        <button className={styles.btn}>Prev Page</button>
        <button className={styles.btn} onClick={() => console.log(allPosts)}>
          Next Page
        </button>
      </div>
    </div>
  );
}

export default App;
