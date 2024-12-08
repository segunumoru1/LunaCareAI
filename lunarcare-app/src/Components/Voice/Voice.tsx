import React, { useEffect, useRef, useState } from "react";
import "./Voice.css";
import AvatarImage from "../../Assets/Images/avatar.png";
import ToggleSwitch from "../Common/ToggleSwitch/ToggleSwitch"; // Import the ToggleSwitch component
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";
import { fetchTip } from "../../Services/tipsSlice";
import { ReactComponent as MicrophoneIcon } from "../../Assets/Icons/microphone-2.svg";
import {
  fetchAudio,
  TextToSpeechState,
} from "../../Services/textToSpeechSlice";
import { debounce } from "lodash"; // Import debounce if implementing debouncing

function Voice() {
  type SpeechRecognition = typeof window.webkitSpeechRecognition;
  interface SpeechRecognitionEvent extends Event {
    readonly results: SpeechRecognitionResultList;
  }

  const { currentTip, loading, error } = useSelector(
    (state: any) => state.tips
  );

  const { audioUrl, loading: audioLoading } = useSelector(
    (state: any) => state.textToSpeech as TextToSpeechState
  );

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isPlayingRef = useRef(false);
  const lastAudioUrlRef = useRef<string | null>(null);

  const dispatch = useDispatch<AppDispatch>();

  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [editableAudioUrl, setEditableAudioUrl] = useState("");

  // Debounced fetchAudio to prevent multiple dispatches
  const debouncedFetchAudio = useRef(
    debounce((tip: string) => { // Explicitly type 'tip' as string
      console.log("Debounced fetchAudio for tip:", tip);
      dispatch(fetchAudio(tip));
    }, 300)
  ).current;

  useEffect(() => {
    if (currentTip) {
      debouncedFetchAudio(currentTip);
    }
  }, [currentTip, debouncedFetchAudio]);

  useEffect(() => {
    console.log("audioUrl updated:", audioUrl);
    if (audioUrl && audioUrl !== lastAudioUrlRef.current) {
      setEditableAudioUrl(audioUrl);
      lastAudioUrlRef.current = audioUrl;
    }
  }, [audioUrl]);

  const startRecording = () => {
    clearInput();
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
      console.log("Speech recognition started.");
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript; // Get the spoken text
      setInputValue(transcript); // Update the input field with the text
      console.log("Speech recognized:", transcript);

      // Automatically send the message
      dispatch(fetchTip(transcript));
    };

    recognition.onerror = (error: any) => { // Changed type to any for better logging
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const clearInput = () => {
    setInputValue("");
    setEditableAudioUrl("");
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
      isPlayingRef.current = false;
    }
  };

  useEffect(() => {
    if (editableAudioUrl && !isRecording && !isPlayingRef.current) {
      console.log("Attempting to play audio:", editableAudioUrl);

      if (audioRef.current) {
        console.log("Pausing existing audio.");
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }

      const newAudio = new Audio(editableAudioUrl);
      audioRef.current = newAudio;
      isPlayingRef.current = true;

      newAudio.play().then(() => {
        console.log("Audio playback started.");
      }).catch((error) => {
        console.error("Error playing audio:", error);
        isPlayingRef.current = false;
      });

      newAudio.onended = () => {
        console.log("Audio playback ended.");
        setEditableAudioUrl("");
        isPlayingRef.current = false;
      };
    }

    return () => {
      if (audioRef.current) {
        console.log("Cleaning up audio.");
        audioRef.current.pause();
        audioRef.current = null;
        isPlayingRef.current = false;
      }
    };
  }, [editableAudioUrl, isRecording]);

  return (
    <div className="avatar-container">
      <div className="block-center-align">
        <div className="avatar-header">
          <h1>Voice Mode</h1>
        </div>
      </div>
      <div className="avatar-input-group">
        <img src={AvatarImage} width={100} height={100} alt="Avatar" />
        {/* Add the ToggleSwitch component if needed */}
      </div>
      <input
        type="text"
        placeholder="Ask whatever you want..."
        value={inputValue}
        onChange={handleInputChange}
      />
      <button
        onClick={startRecording}
        className={`record-button ${isRecording ? "recording" : ""}`}
        disabled={isProcessing}
      >
        <MicrophoneIcon />
      </button>
      <div>{isRecording && <p>Listening...</p>}</div>
     
      {/* Optional: Display loading state */}
      {audioLoading && <p>Thinking...</p>}
    </div>
  );
}

export default Voice;
