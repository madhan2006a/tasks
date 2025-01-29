import React, { useRef, useState } from "react";

const App = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Play the video
  const handlePlay = () => {
    videoRef.current.play();
    setIsPlaying(true);
  };

  // Pause the video
  const handlePause = () => {
    videoRef.current.pause();
    setIsPlaying(false);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>React Video Player</h1>

      {/* Video Player */}
      <video
        ref={videoRef}
        width="100%"
        style={styles.video}
        controls
      >
        <source src="path-to-your-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Play and Pause Buttons */}
      <div style={styles.controls}>
        <button style={styles.button} onClick={handlePlay} disabled={isPlaying}>
          Play
        </button>
        <button style={styles.button} onClick={handlePause} disabled={!isPlaying}>
          Pause
        </button>
      </div>
    </div>
  );
};

// Inline styles for simplicity
const styles = {
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    textAlign: "center",
    padding: "20px",
  },
  heading: {
    fontSize: "2rem",
    marginBottom: "20px",
  },
  video: {
    width: "100%",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  },
  controls: {
    marginTop: "10px",
  },
  button: {
    padding: "10px 20px",
    margin: "5px",
    fontSize: "1rem",
    cursor: "pointer",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#007BFF",
    color: "white",
  },
};

export default App;
