const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const rateLimit = require("express-rate-limit");
const app = express();
const port = process.env.PORT || 8000;
const { Configuration, OpenAIApi } = require("openai");

// Set up rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per windowMs
});

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Load API key from environment variable
const apiKey = "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";
const configuration = new Configuration({
  apiKey: apiKey,
});
const openai = new OpenAIApi(configuration);

// Apply rate limiting middleware to all requests
app.use(limiter);

app.post("/", async (req, res) => {
  try {
    const { chats, model } = req.body;

    // Validate the input data
    if (!chats || !model) {
      return res.status(400).json({ error: "Missing required fields: chats and model" });
    }

    // Make the API call to OpenAI
    const response = await openai.createCompletion({
      model: model,
      prompt: chats,
      max_tokens: 1000,
      temperature: 1,
    });

    res.json({ chat: response.data.choices[0].text });
  } catch (error) {
    console.error("Error processing request:", error.message);
    res.status(500).json({ error: "An unexpected error occurred" });
  }
});

app.get("/", async (req, res) => {
  try {
    const response = await openai.listModels();
    res.json({ model: response.data.data });
  } catch (error) {
    console.error("Error fetching models:", error.message);
    res.status(500).json({ error: "An unexpected error occurred" });
  }
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
