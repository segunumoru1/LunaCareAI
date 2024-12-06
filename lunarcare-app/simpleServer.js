const express = require("express");
const cors = require("cors");
const app = express();
const port = 3001;

// Configure CORS
const corsOptions = {
  origin: "http://localhost:3000", // Allow only the frontend origin to access
  methods: "GET,POST,PUT,DELETE", // Allowable methods
  credentials: true, // Allow cookies and other credentials
  optionsSuccessStatus: 200, // Some legacy browsers choke on 204
};

app.use(cors(corsOptions)); // Use CORS options in middleware setup

app.use(express.json()); // Middleware to parse JSON bodies

app.post("/test", (req, res) => {
  const inputValue = req.body.inputValue; // Ensure you are correctly parsing the inputValue
  console.log("Received:", inputValue); // Optionally log the input value for debugging

  // Create a response object with a 'tip' property
  const response = {
    tip: `Here is a tip based on your input: ${inputValue}`,
  };

  // Return the response object as JSON
  res.json(response);
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
