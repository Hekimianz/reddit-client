import styles from "../css/Post.module.css";
import arrowDown from "../assets/arrow-down.svg";
import arrowUp from "../assets/arrow-up.svg";
import commentIcon from "../assets/comment.svg";
import { useDispatch } from "react-redux";
import { loadPosts, changeCurrSub } from "./postsSlice";

function Post(props) {
  const dispatch = useDispatch();
  const {
    title,
    sub,
    author,
    numComments,
    score,
    media,
    created,
    isVideo,
    videoUrl,
    link,
    thumbnail,
    hasMedia,
    hasContent,
  } = props;

  const createdDate = new Date(0);
  const now = new Date();
  createdDate.setUTCSeconds(created);
  const diff = Math.floor(
    (now.valueOf() - createdDate.valueOf()) / 1000 / 60 / 60
  );

  return (
    <div className={styles.postCont}>
      <div className={styles.votesCont}>
        <img className={styles.voteArrow} src={arrowUp} alt="up vote" />
        <span>{score}</span>
        <img className={styles.voteArrow} src={arrowDown} alt="down vote" />
      </div>
      <div className={styles.innerPostCont}>
        <h1 className={styles.postTitle}>{title}</h1>
        {hasMedia ? (
          isVideo ? (
            <video src={videoUrl} controls className={styles.postVideo}>
              this is a video
            </video>
          ) : (
            <img className={styles.postImage} src={media} alt="post media" />
          )
        ) : (
          <a target="_blank" href={link} rel="noreferrer">
            {hasContent ? (
              <img className={styles.postImage} src={thumbnail} alt="link" />
            ) : (
              <button className={styles.conversationBtn}>
                View Conversation
              </button>
            )}
          </a>
        )}

        <span
          className={styles.postSub}
          onClick={() => {
            dispatch(loadPosts({ btn: "first", sub: `${sub}` }));
            dispatch(changeCurrSub(sub));
          }}
        >
          r/{sub}
        </span>
      </div>
      <div className={styles.postDetailsCont}>
        <p className={styles.postDetail}>
          Posted by{" "}
          <a
            target="_blank"
            rel="noreferrer"
            href={`https://www.reddit.com/u/${author}`}
          >
            {author}
          </a>
        </p>
        <p className={styles.postDetail}>Posted {diff} hours ago</p>
        <p className={styles.postDetail}>
          <img src={commentIcon} alt="comments" />
          {numComments}
        </p>
      </div>
    </div>
  );
}

export default Post;
