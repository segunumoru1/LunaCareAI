// Components/Home/Home.tsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTip } from "../../Services/tipsSlice";
import { AppDispatch } from "../../store";
import "./Home.css";
import MarkdownRenderer from "../Common/MarkdownRender";
import { fetchAudio } from "../../Services/textToSpeechSlice";

function Home() {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  // Get current tip from the Redux state
  const { currentTip, loading, error } = useSelector(
    (state: any) => state.tips
  );

  const audioUrl = useSelector((state: any) => state.textToSpeech.audioUrl); // Access the audio URL from Redux store
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleGetTip = () => {
    dispatch(fetchTip(inputValue)); // Dispatches the action to get OpenAI response
    setInputValue(""); // Clear the input after dispatching
  };

  useEffect(() => {
    console.log("Dispatched fetchAudio ", audioUrl);
  }, [audioUrl]);

  useEffect(() => {
    const fetchAudioAsync = async () => {
      if (currentTip) {
        dispatch(fetchAudio(currentTip)); // Dispatch action to convert text to speech
      }
    };
    fetchAudioAsync();
  }, [currentTip]);

  return (
    <div>
      <h2>Welcome to Lunar Care</h2>
      <div className="tip-container">
        <p>
          Helping you navigate through postpartum with care and understanding.
        </p>
        <div>
          <input
            className="tip-input"
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="What's on your mind?"
          />
          <button className="tip-button" onClick={handleGetTip}>
            Get a Tip
          </button>
        </div>
        <div className="tip-box">
          {loading && <p>Loading...</p>} {/* Display loading state */}
          {error && <p>Error: {error}</p>} {/* Display error message */}
          {currentTip && currentTip.length > 0 ? (
            <div>
              <h3>Current Tip:</h3>
              <MarkdownRenderer tip={currentTip} />
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      {audioUrl && <audio controls src={audioUrl} autoPlay />}
      {/* Render audio element if URL is available */}
    </div>
  );
}

export default Home;
