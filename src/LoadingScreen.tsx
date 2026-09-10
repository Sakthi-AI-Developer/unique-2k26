import { useEffect, useRef, useState } from "react";
import "./LoadingScreen.css";

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [hide, setHide] = useState(false);
  const fadeTimerRef = useRef<number | undefined>(undefined);
  const removeTimerRef = useRef<number | undefined>(undefined);

  const finishLoading = () => {
    if (hide) return;

    setHide(true);
    removeTimerRef.current = window.setTimeout(() => {
      setLoading(false);
    }, 200);
  };

  useEffect(() => {
    fadeTimerRef.current = window.setTimeout(finishLoading, 2000);

    return () => {
      if (fadeTimerRef.current !== undefined) window.clearTimeout(fadeTimerRef.current);
      if (removeTimerRef.current !== undefined) window.clearTimeout(removeTimerRef.current);
    };
  }, []);

  if (!loading) return null;

  return (
    <div className={`loading-screen ${hide ? "loading-hide" : ""}`} onClick={finishLoading}>
      <div className="loading-content">

        <div className="loading-logo-wrapper">
          <img
            src="/images/unique-loader.png"
            alt="UNIQUE 2K26"
            className="loading-logo"
          />
        </div>

        {/* Loading bar */}
        <div className="loading-bar">
          <div className="loading-progress" />
        </div>

        {/* Loading text */}
        <div className="loading-text">
          <span>L</span>
          <span>O</span>
          <span>A</span>
          <span>D</span>
          <span>I</span>
          <span>N</span>
          <span>G</span>
          <span className="dots">...</span>
        </div>

        <div className="loading-subtitle">
          NATIONAL LEVEL TECHNICAL SYMPOSIUM
        </div>

      </div>
    </div>
  );
}