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
import VoiceDropdown from "../Common/VoiceDropdown/VoiceDropdown";
import useWebStorage from "../../Hooks/useWebStorage";

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

  const [selectedVoice, setSelectedVoice] = useWebStorage("selectedVoice", "");

  useEffect(() => {
    if (selectedVoice) {
      console.log("Selected voice:", selectedVoice);
      console.log("Selected language:", selectedLanguage);
      setSelectedLanguage(selectedVoice);
    }
  }, [selectedVoice]);

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isPlayingRef = useRef(false);
  const lastAudioUrlRef = useRef<string | null>(null);

  const dispatch = useDispatch<AppDispatch>();

  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [editableAudioUrl, setEditableAudioUrl] = useState("");

  // Create the ref
  const debouncedFetchAudioRef = useRef<ReturnType<typeof debounce> | null>(
    null
  );

  // Update the ref each time `selectedVoice` changes
  useEffect(() => {
    debouncedFetchAudioRef.current = debounce((tip) => {
      console.log("Debounced fetchAudio for tip:", tip);
      dispatch(fetchAudio({ text: tip, voiceType: selectedVoice }));
    }, 300);
  }, [selectedVoice]); // Dependency on `selectedVoice`

  useEffect(() => {
    if (currentTip) {
      debouncedFetchAudioRef.current &&
        debouncedFetchAudioRef.current(currentTip);
    }
  }, [currentTip]);

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

    recognition.onerror = (error: any) => {
      // Changed type to any for better logging
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

      newAudio
        .play()
        .then(() => {
          console.log("Audio playback started.");
        })
        .catch((error) => {
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

  const [selectedLanguage, setSelectedLanguage] = useState<string>("nova");

  useEffect(() => {
    console.log("Selected voice:", selectedVoice);
    console.log("selected language:", selectedLanguage);
  }, [selectedVoice, selectedLanguage]);

  const selectLanguage = (voice: string): void => {
    setSelectedLanguage(voice);
    setSelectedVoice(voice);
    console.log("Selected voice in parent:", voice);
  };

  return (
    <div className="avatar-container">
      <div className="block-center-align">
        <div className="avatar-header">
          <h1>Voice Mode</h1>
          <div className="voice-dropdown">
            <VoiceDropdown setSelected={selectLanguage} />
          </div>
        </div>
      </div>
      <div className="avatar-input-group">
        <img
          className="avatar-shell"
          src={AvatarImage}
          width={100}
          height={100}
          alt="Avatar"
        />
        {/* Add the ToggleSwitch component if needed */}
      </div>
      <input
        className="voice-input"
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
        <div>
          <MicrophoneIcon />
        </div>
      </button>
      <div className="voice-status">
        {isRecording && <p>Listening...</p>}
        {audioLoading && <p>Thinking...</p>}
      </div>
    </div>
  );
}

export default Voice;
