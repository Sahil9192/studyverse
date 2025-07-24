import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [message, setMessage] = useState('');

  useEffect(()=>{
    fetch('http://localhost:8000/api/v1')
    .then((response) => response.json())
    .then((data) => {
      setMessage(data.message);
    })
    .catch((error) => {
      console.error("Error fetching data.", error);
      setMessage("Failed to load message from backend");
    });
  },);
  return(
    <div>
      <h1>StudyVerse Frontend</h1>
      {/* Display the message from the backend */}
      <p>{message}</p>
    </div>
  );
}

export default App;