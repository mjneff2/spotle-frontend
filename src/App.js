import { useState, useEffect } from 'react'
import axios from 'axios'
import Profile from './Profile'

const App = () => {
  const [audio, setAudio] = useState(null)
  const [tries, setTries] = useState(0)
  const [accessToken, setAccessToken] = useState(localStorage.getItem('access_token'))

  const loggedIn = (localStorage.getItem('access_token')) && (Date.now() - localStorage.getItem('access_token').split(' ')[0] < (1000 * 60 * 60))

  useEffect(() => {
    if (!loggedIn) {
      axios.post('http://localhost:8888/login', {
        // eslint-disable-next-line no-restricted-globals
        pageUrl: location.href
      })
      .then(res => {
        console.log(res.data)
        // eslint-disable-next-line no-restricted-globals
        if (res.data.access_token) {
          localStorage.setItem('access_token', Date.now() + ' ' + res.data.access_token)
          setAccessToken(res.data.access_token)
        }
      })
    } else {
      axios.post('http://localhost:8888/track', {
        access_token: accessToken.split(' ')[1]
      })
      .then(res => {
        console.log(res)
        setAudio(new Audio(res.data.preview_url))
      })
    }
  }, [loggedIn])

  const start = () => {
    audio.play()
    setTimeout(() => audio.pause(), (tries + 1) * 1000)
    setTries(tries + 1)
    audio.currentTime = 0
  }

  console.log(loggedIn)
  console.log(localStorage.getItem('access_token'))

  return (
    <div>
      <Profile />
      {!loggedIn && <a href={'https://accounts.spotify.com/authorize?' +
      (new URLSearchParams({
          response_type: 'code',
          client_id: '8f9a74e7f1e047f5b7bc91dd53752e5d',
          scope: 'user-top-read',
          redirect_uri: 'http://localhost:3000',
          state: 'test_state'
      })).toString()}>Spotify Login</a>}
      <p>Attempt: {tries + 1}</p>
      <button onClick={start}>Play</button>
    </div>
  );
}

export default App;
