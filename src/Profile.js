import { useState, useEffect } from 'react'
import axios from 'axios'

const Profile = () => {
    const [user, setUser] = useState(null)
    useEffect(() => {
        const access_token = localStorage.getItem('access_token')
        axios.post('http://localhost:8888/loggedin', {
            access_token
        }).then(response => {
            console.log(response.data)
            if (response.data.error) {
                console.log(response.data.error.message)
            } else {
                setUser(response.data.display_name)
            }
        })
    }, [])
    return (
        <p>Logged in as {user}</p>
    )
}

export default Profile