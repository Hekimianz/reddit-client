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
    created,
    isVideo,
    videoUrl,
    isGallery,
    galleryMedia,

    isImage,
    imageUrl,
    isConversation,
    conversationUrl,
  } = props;

  const createdDate = new Date(0);
  const now = new Date();
  createdDate.setUTCSeconds(created);
  const diff = Math.floor(
    (now.valueOf() - createdDate.valueOf()) / 1000 / 60 / 60
  );

  const checkMediaType = () => {
    if (isVideo) {
      return "video";
    } else if (isGallery) {
      return "gallery";
    } else if (isImage) {
      return "image";
    } else if (isConversation) {
      return "conversation";
    }
  };

  const renderMedia = () => {
    switch (checkMediaType()) {
      case "video":
        return (
          <video
            className={styles.postVideo}
            src={videoUrl}
            controls
            muted={false}
          />
        );
      case "image":
        return (
          <img className={styles.postImage} src={imageUrl} alt="post media" />
        );
      case "conversation":
        return (
          <a href={conversationUrl} target="_blank" rel="noreferrer">
            <button className={styles.conversationBtn}>
              View Conversation
            </button>
          </a>
        );
      case "gallery":
        return (
          <div className={styles.galleryCont}>
            <img
              className={styles.galleryImage}
              src={galleryMedia[0]}
              alt="post media"
            />
          </div>
        );
      default:
        return <span>Oops something went wrong!</span>;
    }
  };

  return (
    <div className={styles.postCont}>
      <div className={styles.votesCont}>
        <img className={styles.voteArrow} src={arrowUp} alt="up vote" />
        <span>{score}</span>
        <img className={styles.voteArrow} src={arrowDown} alt="down vote" />
      </div>
      <div className={styles.innerPostCont}>
        <h1 className={styles.postTitle}>{title}</h1>
        <div className={styles.postMediaCont}>{renderMedia()}</div>

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
          <a
            className={styles.postLink}
            href={conversationUrl}
            target="_blank"
            rel="noreferrer"
          >
            <img src={commentIcon} alt="comments" />
            {numComments}
          </a>
        </p>
      </div>
    </div>
  );
}

export default Post;
