import React, { useState } from "react"; // Always ensure to import React when using JSX
import "./VoiceDropdown.css"; // Import the CSS for styling

// If using any custom hooks or components, import them
import useWebStorage from "../../../Hooks/useWebStorage"; // Adjust path as necessary
interface VoiceDropdownProps {
  // Define the props for the component
  setSelected: (voice: string) => void; // Function to set the selected voice
}

const VoiceDropdown = ({ setSelected }: VoiceDropdownProps) => {
  const [selectedVoice, setSelectedVoice] = useWebStorage("selectedVoice", "");

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedVoice(event.target.value);
    setSelected(event.target.value);
  };

  return (
    <select
      value={selectedVoice}
      onChange={handleChange}
      className="voice-dropdown"
    >
      <option value="">Select a voice</option>
      <option value="nova">nova</option>
      <option value="alloy">alloy</option>
      <option value="echo">echo</option>
      <option value="shimmer">shimmer</option>
      <option value="onyx">onyx</option>
      <option value="fable">fable</option>
    </select>
  );
};

export default VoiceDropdown;
