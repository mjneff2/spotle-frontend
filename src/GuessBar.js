import { useState, useEffect } from 'react'
import axios from 'axios'

const GuessBar = ({ accessToken, onGuess }) => {
    const [query, setQuery] = useState('')
    const [tracks, setTracks] = useState([])

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearch()
        }
    }

    const handleSearch = async () => {
        const result = await axios.post('http://localhost:8888/search', {
            query,
            access_token: accessToken
        })
        const tracks = result.data.tracks.items
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