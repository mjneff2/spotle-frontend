import { useState, useEffect } from 'react'
import loginService from './services/login'
import trackService from './services/track'
import searchService from './services/search'
import userService from './services/user'
import Profile from './components/Profile'
import GuessBar from './components/GuessBar'

const App = () => {
  const [track, setTrack] = useState(null)
  const [audio, setAudio] = useState(null)
  const [tries, setTries] = useState(0)
  const [accessToken, setAccessToken] = useState(localStorage.getItem('access_token'))
  const [revealed, setRevealed] = useState(false)

  const loggedIn = (accessToken && (Date.now() - accessToken.split(' ')[0] < (1000 * 60 * 60)))

  if (loggedIn) {
    trackService.setToken(accessToken.split(' ')[1])
    searchService.setToken(accessToken.split(' ')[1])
    userService.setToken(accessToken.split(' ')[1])
  }

  useEffect(async () => {
    if (!loggedIn) {
      const res = await loginService.login(location.href)
      console.log(res)
      if (res.access_token) {
        const tokenWithDate = Date.now() + ' ' + res.access_token
        localStorage.setItem('access_token', tokenWithDate)
        setAccessToken(tokenWithDate)
      }
    } else {
      const res = await trackService.getTrack()
      console.log(res)
      setTrack(res)
      setAudio(new Audio(res.preview_url))
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
        {revealed
          ? <p>{track.name + ' ' + track.artists[0].name}</p>
          : <button onClick={() => setRevealed(true)}>Reveal Song</button>}
        <br />
        <GuessBar onGuess={(guessedTrack) => (
          ((guessedTrack.name === track.name)
          && (guessedTrack.artists[0].name === track.artists[0].name))
            ? alert('SO TRUE!')
            : alert('wrong bitvh')
        )}/>
      </div>
    )
  }
}

export default App
