import React, { useEffect, useState } from "react";
import axios from "axios";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

const InterviewAI = () => {
  const [question, setQuestion] = useState("");
  const [userAnswer, setUserAnswer] = useState("");
  const [score, setScore] = useState("");
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    initApp();
  }, []);

  async function getQuestion() {
    try {
      const response = await fetch("http://localhost:5000/question/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          role: "developer",
          experience: "fresher",
        }),
      });

      if (!response.ok) {
        throw new Error("Error fetching question: " + response.statusText);
      }

      const data = await response.json();
      return data.question;
    } catch (error) {
      console.error("Error fetching question:", error);
      return null;
    }
  }

  async function submitAnswer() {
    try {
      const response = await fetch("http://localhost:5000/question/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userAnswer: userAnswer,
        }),
      });

      if (!response.ok) {
        throw new Error("Error fetching feedback: " + response.statusText);
      }

      const data = await response.json();
      setScore(data.score);
      setFeedback(data.feedback);
    } catch (error) {
      console.error("Error fetching feedback:", error);
    }
  }

  const { transcript, resetTranscript } = useSpeechRecognition();

  function startSpeechToText() {
    SpeechRecognition.startListening();
  }

  function stopSpeechToText() {
    SpeechRecognition.stopListening();
    setUserAnswer(transcript);
    // setSpeechOutput(transcript);
  }

  async function initApp() {
    const question = await getQuestion();
    if (question) {
      setQuestion(question);
    } else {
      setQuestion("Error fetching question. Please try again later.");
    }
  }

  async function startScreenRecording() {
    // Your code for starting screen recording goes here (same as in the original script)
  }

  return (
    <div className="main">
      <h1 className="text-3xl font-bold">Interview AI</h1>
      <div className="question-container">
        <h2 className="text-xl font-semibold">Question:</h2>
        <p id="question" className="text-lg">
          {question}
        </p>
      </div>
      <div className="answer-container">
        <label htmlFor="answer" className="text-lg font-semibold">
          Your Answer:
        </label>
        <textarea
          id="answer"
          className="w-full border border-gray-300 p-2"
          placeholder="Provide your answer here"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
        ></textarea>
        <button
          onClick={submitAnswer}
          className="text-white bg-black border border-gray-300 p-2 cursor-pointer mt-4"
        >
          Submit
        </button>
      </div>
      <div className="speech-to-text">
        <button
          onClick={startSpeechToText}
          className="text-white bg-black border border-gray-300 p-2 cursor-pointer"
        >
          Start Speech-to-Text
        </button>
        <button
          onClick={stopSpeechToText}
          className="text-white bg-black border border-gray-300 p-2 cursor-pointer ml-4"
        >
          Stop Speech-to-Text
        </button>
        <p id="speechOutput" className="text-lg mt-2">
          {transcript}
        </p>
      </div>
      <div className="record-container">
        <button
          onClick={startScreenRecording}
          className="text-white bg-black border border-gray-300 p-2 cursor-pointer"
        >
          Start Screen Recording
        </button>
      </div>
      <div className="response">
        <h3 className="text-xl font-semibold">Interview Feedback</h3>
        <p>
          Score: <span id="score" className="font-bold">{score}</span>
        </p>
        <p>
          Feedback: <span id="feedback">{feedback}</span>
        </p>
      </div>
    </div>
  );
};

export default InterviewAI;
