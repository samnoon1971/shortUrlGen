import { useState } from 'react';
import './App.css';
import axios from 'axios';
import { CopyToClipboard } from 'react-copy-to-clipboard';
function App() {
  const [copyBtn, setCopyBtn] = useState('Copy');
  const [url, setUrl] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');
  const year = new Date().getFullYear();

  const handleInput = (input) => {
    if("Copy" != copyBtn) {
      setCopyBtn("Copy");
    }
    setUrl(input);
  }
  const clipBoard = () => {
    setCopyBtn("Copied");
    alert("Copied to clipboard!");

  }
  const shortenUrl = (e) => {
    e.preventDefault();
    axios.get(`https://api.shrtco.de/v2/shorten?url=${url}`)
    .then(res => setShortenedUrl(res.data.result.full_short_link))
    .catch(error => console.log(error));
    if("Copy" != copyBtn) {
      setCopyBtn("Copy");
    }
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
            onChange={(e) => handleInput(e.target.value)}
            />
            <button>Submit</button>
          </form>
           {
              shortenedUrl &&
              <div className='shortener__viewShot'>
                {shortenedUrl}
                <CopyToClipboard text={shortenedUrl}>
                  <button onClick={() => clipBoard()}>{copyBtn}</button>
                </CopyToClipboard>
              </div>
           }
        </div>
        <footer>{`Copyright © S M Samnoon Abrar ${year}`}</footer>
      </div>
    </>
  )
}

export default App;
