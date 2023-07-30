import React, { useState } from 'react';
import styles from "./Chat.module.css";

const ChatGPT = () => {
  const [inputValue, setInputValue] = useState('');
  const [outputText, setOutputText] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const payload = {
      question: inputValue
    };

    fetch("http://localhost:4500/api/chat/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setOutputText(data.answer);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="main">
      <div className={styles.main_t}>
        <h3 id={styles.Output}>{outputText}</h3>
      </div>
        <div>
          <input type="text" placeholder="Type Here" id={styles.search} value={inputValue} onChange={(e) => setInputValue(e.target.value)}/>
          <button onClick={handleSubmit}>→</button></div>
      
      
    </div>
  );
};

export default ChatGPT;
