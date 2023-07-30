import React, { useState } from 'react';
import styles from "./DigitalIntervie.module.css";

const InterviewChatGPT = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [response, setResponse] = useState('');

  const handleStart = () => {
    fetch("http://localhost:4500/api/get/Question", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setQuestion(data.question);
        setResponse("")
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleAnswerSubmit = (event) => {
    event.preventDefault();
    const payload = {
      userAnswer: answer
    };

    fetch("http://localhost:4500/api/trial", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    })
      .then((res) => res.json())
      .then((data) => {
        // Construct the HTML content to display the response data
        const htmlContent = `
          <h3>Question: ${data.Question}</h3>
          <p>User Answer: ${data.UserAnswer}</p>
          <p>Required Answer: ${data.RequiredAns}</p>
          <h3>Score: ${data.Score}</h3>
          <h3>Feedback: ${data.Feedback}</h3>
        `;
        // Update the response state with the HTML content
        setResponse(htmlContent);
        setAnswer("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
    <div className={styles.main}>
      <button onClick={handleStart}>Start The Interview</button>
      <button onClick={handleStart}>Next</button>
    </div>
    <div className={styles.main_t}>
      <div id={styles.child}></div>
      <h2 id={styles.question}>{question}</h2>
      <input
        type="text"
        placeholder="Provide your answer here"
        id={styles.answer}
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />
      <button onClick={handleAnswerSubmit}>Submit</button>
    </div>
    <div id={styles.response} dangerouslySetInnerHTML={{ __html: response }}></div>
    </div>
  );
};

export default InterviewChatGPT;
