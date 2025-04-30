import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [area, setArea] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [price, setPrice] = useState(null);

  const handlePredict = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/predict', {
        area: Number(area),
        bedrooms: Number(bedrooms),
        bathrooms: Number(bathrooms)
      });
      setPrice(response.data.predicted_price);
    } catch (error) {
      alert('Error predicting price');
    }
  };

  const containerStyle = {
    maxWidth: '400px',
    margin: '50px auto',
    padding: '30px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f9f9f9'
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc'
  };

  const buttonStyle = {
    width: '100%',
    padding: '12px',
    backgroundColor: '#007BFF',
    color: 'white',
    fontSize: '16px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  };

  const headingStyle = {
    textAlign: 'center',
    marginBottom: '20px'
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>🏠 House Price Predictor</h2>
      <input
        style={inputStyle}
        type="number"
        placeholder="Area (sq ft)"
        onChange={(e) => setArea(e.target.value)}
      />
      <input
        style={inputStyle}
        type="number"
        placeholder="Bedrooms"
        onChange={(e) => setBedrooms(e.target.value)}
      />
      <input
        style={inputStyle}
        type="number"
        placeholder="Bathrooms"
        onChange={(e) => setBathrooms(e.target.value)}
      />
      <button style={buttonStyle} onClick={handlePredict}>Predict</button>

      {price && (
        <h3 style={{ marginTop: '20px', textAlign: 'center', color: 'green' }}>
          Predicted Price: <br /> <span style={{ fontSize: '24px' }}>${price.toLocaleString()}</span>
        </h3>
      )}
    </div>
  );
}

export default App;
