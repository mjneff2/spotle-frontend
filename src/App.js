import { useState, useEffect } from 'react'
import axios from 'axios'
import Profile from './Profile'

const App = () => {
  const [track, setTrack] = useState(null)
  const [audio, setAudio] = useState(null)
  const [tries, setTries] = useState(0)
  const [accessToken, setAccessToken] = useState(localStorage.getItem('access_token'))
  const [revealed, setRevealed] = useState(false)

  const loggedIn = (accessToken && (Date.now() - accessToken.split(' ')[0] < (1000 * 60 * 60)))

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
          const tokenWithDate = Date.now() + ' ' + res.data.access_token
          localStorage.setItem('access_token', tokenWithDate)
          setAccessToken(tokenWithDate)
        }
      })
    } else {
      axios.post('http://localhost:8888/track', {
        access_token: accessToken.split(' ')[1]
      })
      .then(res => {
        console.log(res)
        setTrack(res.data)
        setAudio(new Audio(res.data.preview_url))
      })
    }
  }, [accessToken, loggedIn])

  const start = () => {
    audio.play()
    setTimeout(() => audio.pause(), (tries + 1) * 1000)
    setTries(tries + 1)
    audio.currentTime = 0
  }

  const handleLogout = () => {
    setAccessToken(null)
    localStorage.removeItem('access_token')
  }

  console.log(loggedIn)
  console.log(accessToken)

  if (!loggedIn) {
    return (
      <a href={'https://accounts.spotify.com/authorize?' +
      (new URLSearchParams({
          response_type: 'code',
          client_id: '8f9a74e7f1e047f5b7bc91dd53752e5d',
          scope: 'user-top-read',
          redirect_uri: 'http://localhost:3000',
          state: 'test_state'
      })).toString()}>Spotify Login</a>
    )
  } else {
    return (
      <div>
        <Profile />
        <button onClick={handleLogout}>Log Out</button>
        <p>Attempt: {tries + 1}</p>
        <button onClick={start}>Play</button>
        {revealed ? <p>{track.name + ' ' + track.artists[0].name}</p> : <button onClick={() => setRevealed(true)}>Reveal Song</button>}
      </div>
    );
  }
}

export default App;
