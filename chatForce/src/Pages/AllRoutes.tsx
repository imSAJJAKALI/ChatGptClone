import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from './Home'
import Interview from './Interview'
import ChatBot from './ChatBot'
import InterviewChatGPT from '../components/DigitalInterview'
import InterviewAI from './InterviewWithAI'





export const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/interview' element={<Interview/>} />
        <Route path='/chat-bot' element={<InterviewChatGPT/>} />
        <Route path='/interview-Ai' element={<InterviewAI/>} />
       
      </Routes>
    </div>
  )
}
