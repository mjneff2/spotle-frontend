import { useState, useEffect } from 'react'
import userService from '../services/user'

const Profile = () => {
  const [user, setUser] = useState(null)
  useEffect(async () => {
    const response = await userService.getUser()
    console.log(response)
    if (response.error) {
      console.log(response.error.message)
    } else {
      setUser(response.display_name)
    }
  }, [])
  return (
    <p>Logged in as {user}</p>
  )
}

export default Profile