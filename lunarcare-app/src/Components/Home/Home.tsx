import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTip } from "../../Services/tipsSlice";
import { AppDispatch } from "../../store";
import "./Home.css";
import MarkdownRenderer from "../Common/MarkdownRender";
import { fetchAudio } from "../../Services/textToSpeechSlice";
import { ReactComponent as SendToAIIcon } from "../../Assets/Icons/send-2.svg";
import ToggleSwitch from "../Common/ToggleSwitch/ToggleSwitch";
import Voice from "../Voice/Voice";

// Define SpeechRecognition and SpeechRecognitionEvent
type SpeechRecognition = typeof window.webkitSpeechRecognition;
interface SpeechRecognitionEvent extends Event {
  readonly results: SpeechRecognitionResultList;
}

function Home() {
  const [voiceMode, setVoiceMode] = useState(false); // State to determine if the voice mode is activated

  const onToggle = () => {
    setVoiceMode(!voiceMode);
  };

  const [inputValue, setInputValue] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const { currentTip, loading, error } = useSelector(
    (state: any) => state.tips
  );
  const ttsAudioUrl = useSelector((state: any) => state.textToSpeech.audioUrl);

  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleGetTip();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleGetTip = () => {
    dispatch(fetchTip(inputValue));
    setInputValue("");
  };

  const startRecording = () => {
    const SpeechRecognition =
      window.webkitSpeechRecognition || window.SpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US"; // Set language
    recognition.interimResults = false; // Only process final results
    recognition.continuous = false; // Stop automatically when speech ends
    recognitionRef.current = recognition;

    recognition.onstart = () => {
      setIsRecording(true);
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript; // Get the spoken text
      setInputValue(transcript); // Update the input field with the text

      // Automatically send the message
      dispatch(fetchTip(transcript));
    };

    recognition.onerror = (error: Event) => {
      console.error("Speech recognition error:", error);
      setIsRecording(false);
      setIsProcessing(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
      setIsProcessing(false);
      console.log("Speech recognition ended.");
    };

    setIsProcessing(true);
    recognition.start();
  };

  useEffect(() => {
    // Dispatch fetchAudio only if not in voiceMode
    if (currentTip && !voiceMode) {
      dispatch(fetchAudio(currentTip));
    }
  }, [currentTip, dispatch, voiceMode]);

  return (
    <div className="outer-container">
      <ToggleSwitch toggle={onToggle} />
      {voiceMode ? (
        <Voice />
      ) : (
        <div className="avatar-container-home">
          <div className="block-center-align">
            <div className="avatar-header">
              <h1>Hi, Jane</h1>
              <p>Can I help you with anything?</p>
            </div>
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
          {/* {audioUrl && <audio controls src={audioUrl} autoPlay />} */}
        </div>
      )}
    </div>
  );
}

export default Home;
