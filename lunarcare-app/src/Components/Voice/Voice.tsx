// create a react component that has an avatar and with a header Voice Mode
// the avatar should have a toggle switch to switch between voice and chat mode

import React, { useEffect, useState } from "react";
import "./Voice.css";
import AvatarImage from "../../Assets/Images/avatar.png";
import ToggleSwitch from "../Common/ToggleSwitch/ToggleSwitch"; // Import the ToggleSwitch component
import exp from "constants";

function Voice() {
  return (
    <div className="avatar-container">
      <div className="block-center-align">
        <div className="avatar-header">
          <h1>Voice Mode</h1>
        </div>
      </div>
      <div className="avatar-input-group">
        <img src={AvatarImage} />
      </div>
    </div>
  );
}

export default Voice;
