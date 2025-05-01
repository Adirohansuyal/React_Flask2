import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [area, setArea] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [price, setPrice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const handlePredict = async () => {
    if (!area || !bedrooms || !bathrooms) {
      alert('Please fill in all fields.');
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post('http://127.0.0.1:5000/predict', {
        area: Number(area),
        bedrooms: Number(bedrooms),
        bathrooms: Number(bathrooms),
      });
      setPrice(response.data.predicted_price);
    } catch (error) {
      alert('Error predicting price');
    }
    setLoading(false);
  };

  const handleClear = () => {
    setArea('');
    setBedrooms('');
    setBathrooms('');
    setPrice(null);
  };

  const theme = darkMode ? darkStyles : lightStyles;

  return (
    <div style={{ ...styles.app, ...theme.app }}>
      <div style={{ ...styles.container, ...theme.container }}>
        <div style={styles.topBar}>
          <h2 style={{ ...styles.heading, ...theme.heading }}>🏠 House Price Predictor</h2>
          <div style={styles.themeToggle} onClick={() => setDarkMode(!darkMode)}>
            <div
              style={{
                ...styles.toggleCircle,
                left: darkMode ? '26px' : '2px',
                backgroundColor: darkMode ? '#f1c40f' : '#333',
              }}
            >
              {darkMode ? '🌞' : '🌙'}
            </div>
          </div>
        </div>

        {/* Inputs */}
        {[
          { label: '📏 Area (sq ft)', value: area, setter: setArea },
          { label: '🛏️ Bedrooms', value: bedrooms, setter: setBedrooms },
          { label: '🛁 Bathrooms', value: bathrooms, setter: setBathrooms },
        ].map((input, i) => (
          <div key={i} style={styles.inputGroup}>
            <label style={{ ...styles.label, ...theme.label }}>{input.label}</label>
            <input
              style={{ ...styles.input, ...theme.input }}
              type="number"
              value={input.value}
              onChange={(e) => input.setter(e.target.value)}
            />
          </div>
        ))}

        {/* Buttons */}
        <div style={styles.buttonGroup}>
          <button style={styles.button} onClick={handlePredict}>
            {loading ? 'Predicting...' : 'Predict'}
          </button>
          <button
            style={{ ...styles.button, backgroundColor: '#6c757d' }}
            onClick={handleClear}
          >
            Clear
          </button>
        </div>

        {/* Result */}
        {price && !loading && (
          <div style={{ ...styles.result, ...theme.result }}>
            <strong>Predicted Price:</strong><br />
            <span style={{ fontSize: '24px' }}>${price.toLocaleString()}</span>
          </div>
        )}
      </div>
    </div>
  );
}

// Shared Styles
const styles = {
  app: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    padding: '20px',
    transition: 'background 0.5s ease',
  },
  container: {
    padding: '40px',
    borderRadius: '15px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
    width: '100%',
    maxWidth: '450px',
  },
  topBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
  },
  heading: {
    margin: 0,
  },
  inputGroup: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontWeight: '600',
  },
  input: {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    outline: 'none',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px',
    gap: '10px',
  },
  button: {
    flex: 1,
    padding: '12px',
    backgroundColor: '#007BFF',
    color: 'white',
    fontSize: '16px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  result: {
    marginTop: '30px',
    textAlign: 'center',
    animation: 'fadeIn 1s ease-in-out',
  },

  // Toggle styles
  themeToggle: {
    width: '50px',
    height: '26px',
    borderRadius: '50px',
    backgroundColor: '#ccc',
    position: 'relative',
    cursor: 'pointer',
    transition: 'background-color 0.4s ease',
    display: 'flex',
    alignItems: 'center',
    padding: '2px',
    marginLeft: 'auto',
  },
  toggleCircle: {
    position: 'absolute',
    top: '2px',
    width: '22px',
    height: '22px',
    borderRadius: '50%',
    textAlign: 'center',
    lineHeight: '22px',
    fontSize: '14px',
    transition: 'left 0.3s ease, background-color 0.3s ease',
  },
};

// Light Theme
const lightStyles = {
  app: {
    background: 'linear-gradient(to right, #74ebd5, #ACB6E5)',
  },
  container: {
    backgroundColor: '#ffffff',
    color: '#333',
  },
  heading: {
    color: '#333',
  },
  label: {
    color: '#444',
  },
  input: {
    backgroundColor: '#fff',
    color: '#000',
  },
  result: {
    color: '#28a745',
  },
};

// Dark Theme
const darkStyles = {
  app: {
    background: '#1e1e1e',
  },
  container: {
    backgroundColor: '#2c2c2c',
    color: '#f0f0f0',
  },
  heading: {
    color: '#f0f0f0',
  },
  label: {
    color: '#ddd',
  },
  input: {
    backgroundColor: '#444',
    color: '#f0f0f0',
    border: '1px solid #666',
  },
  result: {
    color: '#00FF90',
  },
};

export default App;
