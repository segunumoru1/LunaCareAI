import React, { useEffect, useState } from "react";
import axios from "axios";

const Messages = () => {
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/") 
      .then((response) => {
        setMessages(response.data.map((item: { message: string }) => item.message));
      })
      .catch((error) => console.error("Error fetching messages:", error));
  }, []);

  return (
    <div>
      <h2>Messages</h2>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    </div>
  );
};

export default Messages;

