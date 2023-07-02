import { useState } from 'react';
import './App.css';
import axios from 'axios';
function App() {
  const [url, setUrl] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');

  const shortenUrl = (e) => {
    e.preventDefault();
    axios.get(`https://api.shrtco.de/v2/shorten?url=${url}`)
    .then(res => setShortenedUrl(res.data.result.full_short_link))
    .catch(error => console.log(error));
  }
  return (
    <>
      <div className='app'>
        <div className='shortener'>
          <h2>URL shortener</h2>
          <form onSubmit={shortenUrl}>
            <input
            placeholder='Enter URL'
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            />
            <button>Submit</button>
          </form>
           {
              shortenedUrl &&
              <div className='shortener__viewShot'>
                {shortenedUrl}
              </div>
           }
        </div>
      </div>
    </>
  )
}

export default App;
