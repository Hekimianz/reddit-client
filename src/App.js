// import mockData from "./mockData";
import Post from "./components/Post";
import styles from "./css/App.module.css";
import redditLogo from "./assets/reddit-logo.png";

function App() {
  return (
    <div className={styles.appCont}>
      <nav className={styles.nav}>
        <img src={redditLogo} alt="reddit logo" />
        <span className={styles.navTitle}>Reddit Minimal</span>
      </nav>
      <Post />
      <Post />
      <Post />
      <Post />
      <div className={styles.btnsCont}>
        <button className={styles.btn}>Prev Page</button>
        <button className={styles.btn}>Next Page</button>
      </div>
    </div>
  );
}

export default App;
