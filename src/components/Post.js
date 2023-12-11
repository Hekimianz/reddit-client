import styles from "../css/Post.module.css";
import arrowDown from "../assets/arrow-down.svg";
import arrowUp from "../assets/arrow-up.svg";
import commentIcon from "../assets/comment.svg";
function Post(props) {
  const {
    title,
    sub,
    author,
    numComments,
    score,
    date,
    media,
    isImage,
    isVideo,
  } = props;
  return (
    <div className={styles.postCont}>
      <div className={styles.votesCont}>
        <img className={styles.voteArrow} src={arrowUp} alt="up vote" />
        <span>{score}</span>
        <img className={styles.voteArrow} src={arrowDown} alt="down vote" />
      </div>
      <div className={styles.innerPostCont}>
        <h1 className={styles.postTitle}>{title}</h1>
        {isImage ? (
          <img className={styles.postImage} src={media} alt="post media" />
        ) : isVideo ? (
          <video src={media} controls className={styles.postVideo}>
            this is a video
          </video>
        ) : null}
        <span className={styles.postSub}>{sub}</span>
      </div>
      <div className={styles.postDetailsCont}>
        <p className={styles.postDetail}>
          Posted by{" "}
          <a target="_blank" rel="noreferrer" href="https://www.google.com">
            {author}
          </a>
        </p>
        <p className={styles.postDetail}>Posted {date}</p>
        <p className={styles.postDetail}>
          <img src={commentIcon} alt="comments" />
          {numComments}
        </p>
      </div>
    </div>
  );
}

export default Post;
