import React, { useState, useEffect } from 'react'

function App() {
  const [inputValue, setInputValue] = useState('');

  const onDownloadRepository = async () => {
    const response = await fetch(`/downloadRepository?param=${inputValue}`);
    const data = await response.json();
    console.log("Data:", data);
  }


  const [message, setMessage] = useState('');
  console.log("🚀 ~ file: App.js:14 ~ App ~ message:", message);

  const handleSubmit = async () => {
    const response = await fetch('/processInput', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ input: message })
    });

    const data = await response.json();
    console.log('Response:', data);
  };
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
    </div>
  )
}

export default App