import React, { useEffect, useState } from "react";
import "./ToggleSwitch.css"; // Import the CSS for styling
import { ReactComponent as ChatIcon } from "../../../Assets/Icons/message-text.svg"; // Import the Chat icon
import { ReactComponent as VoiceIcon } from "../../../Assets/Icons/microphone-2.svg"; // Import the Chat icon

interface ToggleSwitchProps {
  // Define the props for the component
  toggle: () => void; // Boolean to determine if the switch is activated
}

function ToggleSwitch({ toggle }: ToggleSwitchProps) {
  const [isActive, setIsActive] = useState(true); // true for Voice and false for Chat

  useEffect(() => {
    console.log("isActive ", isActive);
    toggle();
  }, [isActive]);

  return (
    <div className="toggle-container">
      <button
        className={`toggle-btn ${isActive ? "active" : ""}`}
        onClick={() => setIsActive(true)}
      >
        <VoiceIcon /> Voice
      </button>
      <button
        className={`toggle-btn ${!isActive ? "active" : ""}`}
        onClick={() => setIsActive(false)}
      >
        <ChatIcon /> Chat
      </button>
    </div>
  );
}

export default ToggleSwitch;
