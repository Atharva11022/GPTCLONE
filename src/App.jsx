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

    // Modern Pollinations API endpoint
    const encodedPrompt = encodeURIComponent(prompt.trim());
    const randomSeed = Math.floor(Math.random() * 1000000);
    const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1024&height=1024&seed=${randomSeed}&nologo=true`;

    console.log("Generating URL:", imageUrl);

    // Set URL directly to state so <img> renders immediately
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
              alert("Image generation timed out or failed. Try clicking Generate again.");
              setLoading(false);
            }}
            style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }}
          />
        </div>
      )}
    </div>
  );
}

export default App;