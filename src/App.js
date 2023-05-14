import React, { useState, useEffect } from 'react'

function App() {
  const [inputValue, setInputValue] = useState('');
  const [message, setMessage] = useState('');
  const [isWaitingPromtResult, setIsWaitingPromtResult] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  const onDownloadRepository = async () => {
    const response = await fetch(`/downloadRepository?param=${inputValue}`);
    const data = await response.json();
    console.log("Data:", data);
  }
const [test, setTest] = useState('');
  const handleSubmit = async () => {
    const response = await fetch('/processInput', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ input: message || 'What is the purposes of the project?', gitName: inputValue })
    });

    const data = await response.json();

    console.log('Response:', JSON.parse(data.response).choices[0].message.content);
    setTest(JSON.parse(data.response).choices[0].message.content);
    setIsWaitingPromtResult(true);
  };

  const handlePromtResponse = async () => {
    const response = await fetch(`/getPromtResult`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ git: inputValue, prompt: message })
    });
    const data = await response.json();
    console.log("Data:", data);

    if (data.success) {
      setIsWaitingPromtResult(false);
    }
  }

  useEffect(() => {
    if (isWaitingPromtResult) {
      const id = setInterval(handlePromtResponse, 3000);
      setIntervalId(id);
    } else {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  }, [isWaitingPromtResult])

  return (
    <div>
       <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={onDownloadRepository}>Prepare files</button>
      <input
        type="text"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        placeholder="Enter your input"
      />
      <button onClick={handleSubmit}>Submit</button>
      <p>{test}</p>
    </div>
  )
}

export default App