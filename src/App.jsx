import { useState } from 'react';
import './App.css';

function App() {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const generateImage = (e) => {
    if (e) e.preventDefault();

    if (!prompt.trim()) {
      alert('Please enter a prompt first!');
      return;
    }

    setLoading(true);

    // Optimized parameters for fast server response
    const encodedPrompt = encodeURIComponent(prompt.trim());
    const randomSeed = Math.floor(Math.random() * 1000000);
    const imageUrl = `https://pollinations.ai/p/${encodedPrompt}?width=512&height=512&seed=${randomSeed}`;

    console.log("Generating URL:", imageUrl);
    setResult(imageUrl);
  };

  return (
    <div className="app-main">
      <h3>Generate an Image using AI</h3>

      <form onSubmit={generateImage}>
        <input
          className="app-input"
          placeholder="Type something creative..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Generating...' : 'Generate Image'}
        </button>
      </form>

      {result && (
        <div style={{ marginTop: '20px' }}>
          <img
            className="result-image"
            src={result}
            alt={prompt}
            onLoad={() => {
              console.log("Image successfully loaded!");
              setLoading(false);
            }}
            onError={() => {
              console.error("Image failed to load.");
              alert("Server is busy. Click 'Generate Image' again!");
              setLoading(false);
            }}
          />
        </div>
      )}
    </div>
  );
}

export default App;