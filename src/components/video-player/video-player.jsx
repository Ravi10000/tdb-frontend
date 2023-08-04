import styles from "./video-player.module.scss";

function VideoPlayer({ src, children, type = "video/mp4" }) {
  return (
    <div className={styles.container}>
      <video loop autoPlay muted className={styles.videoPlayer}>
        <source src={src} type={type} />
      </video>
      <div className={styles.contentContainer}>{children}</div>
    </div>
  );
}

export default VideoPlayer;
