import mockData from "./mockData";
import Post from "./components/Post";
import styles from "./css/App.module.css";

function App() {
  return (
    <div className={styles.appCont}>
      <Post />
      <Post />
      <Post />
      <Post />
    </div>
  );
}

export default App;
