import { Home } from './pages/Home.jsx'
import { LoginPage } from './pages/LoginPage.jsx'
import { useState } from 'react'

export default function App() {
  const [user, setUser] = useState(null)

  return (
    <>
      {user ? (
        <Home user={user} onSignOut={() => setUser(null)} />
      ) : (
        <LoginPage onAuthenticated={setUser} />
      )}
    </>
  )
}
