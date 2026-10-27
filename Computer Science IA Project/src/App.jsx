import { useState } from "react";
import CalendarPage from "./pages/CalendarPage.jsx";
import { LoginPage } from "./pages/LoginPage.jsx";
import { Authentication } from "./pages/Authentication.jsx";

export default function App() {
  const [user, setUser] = useState(null)
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)

  const handleAuthenticated = (profile) => {
    setUser(profile)
    setIsCalendarOpen(false)
  }

  return (
    <>
      {!user ? (
        <LoginPage onAuthenticated={handleAuthenticated} />
      ) : isCalendarOpen ? (
        <CalendarPage />
      ) : (
        <Authentication user={user} onComplete={() => setIsCalendarOpen(true)} />
      )}
    </>
  )
}
