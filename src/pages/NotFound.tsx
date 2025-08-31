import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import "../components/styles/NotFound.css";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="not-found-page">
      <div className="notfound-container">
        <div className="ufo-scene">
          <div className="ufo">
            <div className="ufo-top">
              <div className="ufo-dome"></div>
            </div>
            <div className="ufo-bottom">
              <div className="ufo-center-ring"></div>
              <div className="ufo-lights">
                <div className="light"></div>
                <div className="light"></div>
                <div className="light"></div>
                <div className="light"></div>
                <div className="light"></div>
              </div>
            </div>
          </div>
          <div className="tractor-beam"></div>
          <div className="desert">
            <div className="cactus cactus-1"></div>
            <div className="cactus cactus-2"></div>
            <div className="cactus cactus-3"></div>
            <div className="rocks">
              <div className="rock rock-1"></div>
              <div className="rock rock-2"></div>
              <div className="rock rock-3"></div>
            </div>
          </div>
        </div>

        <h1>It looks like you are lost</h1>
        <p className="subtitle">Well, that's not the one you are searching for.</p>
        <p className="subtitle">Let&apos;s try it again.</p>
      </div>
    </div>
  );
};

export default NotFound;