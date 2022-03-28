import { useState, useEffect } from 'react'
import axios from 'axios'
import Profile from './Profile'

const App = () => {
  const previewUrl = "https://p.scdn.co/mp3-preview/c8d9546e29d866e1077b2d7ef34dec7ad049f57c?cid=8f9a74e7f1e047f5b7bc91dd53752e5d"
  const [audio] = useState(new Audio(previewUrl))
  const [tries, setTries] = useState(0)

  useEffect(() => {
    axios.post('http://localhost:8888/login', {
      // eslint-disable-next-line no-restricted-globals
      pageUrl: location.href
    })
    .then(res => {
      console.log(res.data)
      // eslint-disable-next-line no-restricted-globals
      if (res.data.access_token) {
        localStorage.setItem('access_token', res.data.access_token)
      }
    })
  }, [])

  const start = () => {
    audio.play()
    setTimeout(() => audio.pause(), (tries + 1) * 1000)
    setTries(tries + 1)
    audio.currentTime = 0
  }

  return (
    <div>
      <Profile />
      <a href={'https://accounts.spotify.com/authorize?' +
      (new URLSearchParams({
          response_type: 'code',
          client_id: '8f9a74e7f1e047f5b7bc91dd53752e5d',
          scope: 'user-top-read',
          redirect_uri: 'http://localhost:3000',
          state: 'test_state'
      })).toString()}>Spotify Login</a>
      <p>Attempt: {tries + 1}</p>
      <button onClick={start}>Play</button>
    </div>
  );
}

export default App;
