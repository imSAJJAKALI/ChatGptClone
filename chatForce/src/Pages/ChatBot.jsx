import React, { useState } from 'react';

const ChatBot = () => {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([
    { text: 'Hi there! How can I assist you?', isBot: true },
  ]);

  const handleSendMessage = (text) => {
    setMessages((prevMessages) => [...prevMessages, { text, isBot: false }]);
    fetchChatGPTResponse(text);
  };

  const fetchChatGPTResponse = (message) => {
    const payload = {
      message,
    };

    // Replace 'YOUR_API_KEY' with your actual API key from OpenAI
    const apiKey = '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';

    fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo', // Use the model of your choice
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant.',
          },
          {
            role: 'user',
            content: message,
          },
        ],
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        const botReply = data?.choices?.[0]?.message?.content;
        if (botReply) {
          setMessages((prevMessages) => [
            ...prevMessages,
            { text: `Bot: ${botReply}`, isBot: true },
          ]);
        } else {
          setMessages((prevMessages) => [
            ...prevMessages,
            { text: 'Bot: Oops! Something went wrong. Please try again.', isBot: true },
          ]);
        }
      })
      .catch((error) => {
        console.log(error);
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: 'Bot: Oops! Something went wrong. Please try again.', isBot: true },
        ]);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputValue.trim() !== '') {
      handleSendMessage(inputValue);
      setInputValue('');
    }
  };

  return (
    <div className="flex flex-col justify-between h-screen">
      <div className="flex-grow p-4 overflow-y-auto">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`p-2 rounded-lg my-2 max-w-xs ${
              message.isBot ? 'bg-blue-500 text-white self-start' : 'bg-gray-300 self-end'
            }`}
          >
            {message.text}
          </div>
        ))}
      </div>
      <div className="p-4 bg-gray-200">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="w-full p-2 rounded-lg"
            placeholder="Type your message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default ChatBot;
