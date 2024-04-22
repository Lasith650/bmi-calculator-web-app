import React, { useState } from 'react';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBMI] = useState(null);
  const [isLoading, setLoading] = useState(false); // New state for loading indicator

  const calculateBMI = async () => {
    setLoading(true); // Set loading state to true when calculation starts
    const response = await fetch('https://8fe4a8b1-4dab-445f-96af-89aec9819abc-prod.e1-us-cdp-2.choreoapis.dev/zgev/bmi-calculator/bmi-calculator-f1e/v1.0/calculate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        height: parseFloat(height),
        weight: parseFloat(weight),
      }),
    });
    const data = await response.json();
    setBMI(data.bmi);
    setLoading(false); // Set loading state to false when calculation is done
  };

  return (
    <div className="App">
      <h1>BMI Calculator</h1>
      <div>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label>Height (meters):</label>
        <input type="text" value={height} onChange={(e) => setHeight(e.target.value)} />
      </div>
      <div>
        <label>Weight (kilograms):</label>
        <input type="text" value={weight} onChange={(e) => setWeight(e.target.value)} />
      </div>
      <button onClick={calculateBMI} disabled={isLoading}>{isLoading ? 'Loading...' : 'Calculate BMI'}</button>
      {bmi && <p>Your BMI: {bmi}</p>}
    </div>
  );
}

export default App;
