import { useState } from 'react';
import './App.scss';
import axios from 'axios';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Alert } from '@mui/material';

function App() {
  const [copyBtn, setCopyBtn] = useState('Copy');
  const [url, setUrl] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');
  const [alert, setAlert] = useState(false);
  const [alertContent, setAlertContent] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("");
  const year = new Date().getFullYear();

  const handleInput = (input) => {
    if ("Copy" != copyBtn) {
      setCopyBtn("Copy");
    }
    setCopyBtn("Copied");

    setUrl(input);
  }
  const clipBoard = () => {
    setCopyBtn("Copied");
    setAlert(true);
    setAlertSeverity("success");
    setAlertContent("Copied to clipboard");
  }
  const handleErrors = (error_code) => {
    setAlert(true);
    setAlertSeverity("error");
    if (error_code == 1) {
      setAlertContent("URL is empty. Please enter a valid URL");
    }
    else if (error_code == 2) {
      setAlertContent("Invalid URL Submitted. Please enter a valid URL.")
    }
    else if (error_code == 3) {
      setAlertContent("Wait a second and try again. Sorry for the inconvenience.")
    }
    else if (error_code > 3 || error_code < 10) {
      setAlertContent("Couldn't process the URL. Try again later")
    }
    else {
      setAlertContent("Couldn't process the URL, something went wrong");
    }

  }
  const handleRespone = (res) => {
    setAlert(true);
    setAlertSeverity("success");
    setAlertContent("Short URL generated successfully");
    setShortenedUrl(res.data.result.full_short_link);
  }
  const shortenUrl = (e) => {
    e.preventDefault();
    setShortenedUrl("");
    axios.get(`https://api.shrtco.de/v2/shorten?url=${url}`)
      .then(res => handleRespone(res))
      .catch(error => handleErrors(error.response.data.error_code));
    if ("Copy" != copyBtn) {
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
        {alert ? <Alert severity={alertSeverity} onClose={() => setAlert(false)}>{alertContent}</Alert> : <></>}

        <footer>{`Copyright © S M Samnoon Abrar ${year}`}</footer>
      </div>
    </>
  )
}

export default App;
