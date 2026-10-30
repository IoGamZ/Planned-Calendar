import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import { useState } from "react";
import  Home  from "./pages/Home.jsx";
import  TaskList  from "./pages/Task.jsx";
import { Authentication } from "./pages/Authentication.jsx";
import { Navbar } from "./components/Navbar.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

const GOOGLE_CLIENT_ID = "4114665443-h9kp58627tmo4s81hb7drsfbm96stlpt.apps.googleusercontent.com";

//function to call navbar at the top of the screen (this usually overlapped with the main body but applied gap at the top of main body)
function WebsiteLayout({ showNavbar }) {
  return (
    <div className="min-h-screen overflow-x-hidden">
      {showNavbar && <Navbar />}
      <main className="relative z-20">
        <Outlet/>
      </main>
    </div>
  )
}

function App() {
  const [user, setUser] = useState(null)
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)

  const handleAuthenticated = (profile) => {
    setUser(profile)
    setIsCalendarOpen(false)
  }

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID || ""}>
      <BrowserRouter>
        <Routes>  
          <Route element={<WebsiteLayout showNavbar={Boolean(user && isCalendarOpen)} />}>
            <Route
              path="/"
              element={
                !user ? (
                  <Authentication onAuthenticated={handleAuthenticated} />
                ) : isCalendarOpen ? (
                  <Home />
                ) : (
                  <Authentication
                    user={user}
                    onComplete={() => setIsCalendarOpen(true)}
                  />
                )
              }
            />
            <Route
              path="/tasks"
              element={
                !user ? (
                  <Authentication onAuthenticated={handleAuthenticated} />
                ) : isCalendarOpen ? (
                  <TaskList />
                ) : (
                  <Authentication
                    user={user}
                    onComplete={() => setIsCalendarOpen(true)}
                  />
                )
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  )
}


export default App;
