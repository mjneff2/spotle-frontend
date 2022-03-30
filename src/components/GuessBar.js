import { useState } from 'react'
import searchService from '../services/search'

const GuessBar = ({ onGuess }) => {
  const [query, setQuery] = useState('')
  const [tracks, setTracks] = useState([])

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch()
    }
  }

  const handleSearch = async () => {
    const result = await searchService.getResults(query)
    const tracks = result.tracks.items
    setTracks(tracks)
  }

  return (
    <>
      <input
        type='search'
        placeholder='Search Guess'
        id='guess'
        name='guess'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleSearch}>Search</button>
      <br />
      <ul>
        {tracks.map(track =>
          <li key={track.uri}><button onClick={() => onGuess(track)}>{track.name + ' - ' + track.artists[0].name}</button></li>
        )}
      </ul>
    </>
  )
}

export default GuessBar