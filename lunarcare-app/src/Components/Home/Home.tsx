// Components/Home/Home.tsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTip } from "../../Services/tipsSlice";
import { AppDispatch } from "../../store";
import "./Home.css";
import MarkdownRenderer from "../Common/MarkdownRender";
import { fetchAudio } from "../../Services/textToSpeechSlice";
import { ReactComponent as SendToAIIcon } from "../../Assets/Icons/send-2.svg";

function Home() {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      handleGetTip();
    }
  };

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
    <div className="avatar-container">
      <div className="avatar-header">
        <h1>Hi, Jane</h1>
        <p>Can I help you with anything?</p>
      </div>
      <div className="avatar-input-group">
        <input
          type="text"
          placeholder="Ask whatever you want..."
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleGetTip}>
          <SendToAIIcon className="white-stroke" />
        </button>
      </div>
      <div className="tip-box">
        {loading && <p>Loading...</p>} {/* Display loading state */}
        {error && <p>Error: {error}</p>} {/* Display error message */}{" "}
        {currentTip && currentTip.length > 0 ? (
          <div>
            <h3>Current Tip:</h3>
            <MarkdownRenderer tip={currentTip} />
          </div>
        ) : (
          ""
        )}
      </div>
      {audioUrl && <audio controls src={audioUrl} autoPlay />}
    </div>
  );
}

export default Home;
