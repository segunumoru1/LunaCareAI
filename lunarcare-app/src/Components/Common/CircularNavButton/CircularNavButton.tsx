import React from "react";
import { useNavigate } from "react-router-dom";
import "./CircularNavButton.css";

interface CircularNavButtonProps {
  icon: React.ElementType; // Now expecting a React component type for the icon
  text: string;
  showText: boolean;
  selected: boolean;
  to: string;
  onClick?: () => void;
}

const CircularNavButton: React.FC<CircularNavButtonProps> = ({
  icon: Icon,
  text,
  showText,
  selected,
  to,
  onClick,
}) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(to); // Navigate to the route
    onClick && onClick(); // Call the onClick handler if it exists
  };

  return (
    <button
      className={selected ? "circular-button-selected" : "circular-button"}
      onClick={handleNavigate}
      aria-label="Navigate"
    >
      <div className="row-align">
        <div>
          <Icon className="button-icon" />
        </div>
        <div>{showText && <p>{text}</p>}</div>
      </div>
    </button>
  );
};

export default CircularNavButton;
