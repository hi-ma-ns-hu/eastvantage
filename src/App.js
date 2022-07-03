import axios from "axios";
import React, { useState, useEffect } from "react";

function App() {
  const [randomUser, setRandomUser] = useState(null)

  const fetchRandomUser = async () => {
    let user = await axios.get('https://randomuser.me/api')
    setRandomUser(user.data.results[0])
    localStorage.setItem('randUser', JSON.stringify(user.data.results[0]))
    console.log(localStorage.getItem('randUser'))
    return user
  }

  useEffect(() => {
    ; (async () => {
      await fetchRandomUser()
    })()
  }, [])

  const handleClick = () => {
    localStorage.clear()
    ;(async () => {
      await fetchRandomUser()
    })()
  }
  
  return (
    <>
      {!randomUser ? 'Loading...' : <span><p>Name: {randomUser.name.title} {randomUser.name.first} {randomUser.name.last}</p>
        <p>Email: {randomUser.email}</p>
      </span>}
      <button onClick={handleClick}>Refresh</button>
    </>
  );
}

export default App;
