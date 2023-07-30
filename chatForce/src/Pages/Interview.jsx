import React from 'react';
import ChatBot from './ChatBot';

const Interview = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white w-full max-w-md shadow-md rounded-lg p-8">
        <h1 className="text-2xl font-bold mb-4">Chat with our Bot</h1>
        <ChatBot />
      </div>
    </div>
  );
};

export default Interview;
