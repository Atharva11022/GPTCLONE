import { useState } from 'react'
import { Configuration, OpenAIApi } from 'openai';
import './App.css';

function App() {
  console.log(import.meta.env.VITE_OPEN_AI_Key);
  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_OPEN_AI_Key,
  });
  return (
    <div>
      
    </div>
  )
}

export default App
