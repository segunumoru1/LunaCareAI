import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTip } from "../../Services/tipsSlice";
import { AppDispatch } from "../../store";

function Home() {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  // need to retrieve the response from the dispatch
  // and display it in the UI
  const currentTip = useSelector((state: any) => state.tips.currentTip);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleGetTip = () => {
    dispatch(fetchTip(inputValue)); // Dispatches the action to update the tip
    setInputValue(""); // Clear the input after dispatching
  };

  return (
    <div>
      <h2>Welcome to Lunar Care</h2>
      <p>
        Helping you navigate through postpartum with care and understanding.
      </p>
      <div>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="What's on your mind?"
        />
        <button onClick={handleGetTip}>Get a Tip</button>
      </div>
      <div>
        {currentTip && currentTip.length > 0 ? (
          <div>
            <h3>Current Tip:</h3>
            <p>{currentTip}</p>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Home;
