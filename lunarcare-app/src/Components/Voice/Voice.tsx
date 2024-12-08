// create a react component that has an avatar and with a header Voice Mode
// the avatar should have a toggle switch to switch between voice and chat mode

import React, { useEffect, useRef, useState } from "react";
import "./Voice.css";
import AvatarImage from "../../Assets/Images/avatar.png";
import ToggleSwitch from "../Common/ToggleSwitch/ToggleSwitch"; // Import the ToggleSwitch component
import exp from "constants";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";
import { fetchTip } from "../../Services/tipsSlice";
import { ReactComponent as MicrophoneIcon } from "../../Assets/Icons/microphone-2.svg";

import {
  fetchAudio,
  TextToSpeechState,
} from "../../Services/textToSpeechSlice";

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

  const dispatch = useDispatch<AppDispatch>();

  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [editableAudioUrl, setEditableAudioUrl] = useState("");

  useEffect(() => {
    if (currentTip) {
      dispatch(fetchAudio(currentTip));
    }
  }, [currentTip, dispatch]);

  useEffect(() => {
    setEditableAudioUrl(audioUrl);
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const clearInput = () => {
    setInputValue("");
    setEditableAudioUrl("");
    audioRef.current?.pause();
  };

  useEffect(() => {
    if (editableAudioUrl && !isRecording) {
      if (audioRef.current) {
        audioRef.current.pause(); // Pause the current audio
        audioRef.current.currentTime = 0; // Reset playback
      }
      audioRef.current = new Audio(editableAudioUrl); // Create a new audio instance
      audioRef.current.play(); // Play the new audio
    }
  }, [editableAudioUrl]);

  return (
    <div className="avatar-container">
      <div className="block-center-align">
        <div className="avatar-header">
          <h1>Voice Mode</h1>
        </div>
      </div>
      <div className="avatar-input-group">
        <img src={AvatarImage} width={100} height={100} />
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
      <div>
        {!editableAudioUrl || editableAudioUrl.length == 0 ? "Thinking..." : ""}
      </div>
    </div>
  );
}

export default Voice;
