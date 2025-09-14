// src/App.js
import React, { useEffect, useState } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Feed from "./components/Feed";
import ReportForm from "./components/ReportForm";
import { auth } from "./firebase-config";
import { onAuthStateChanged, signOut } from "firebase/auth";

// Import your logo
import logo from "./assets/logo.png"; // <-- put your uploaded logo in src/assets/

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="App">
      {/* Header Section */}
      <header
        style={{
          padding: "15px",
          background: "#000", // black background for contrast
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo + Title */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={logo}
            alt="Logo"
            style={{
              width: "50px",
              height: "50px",
              marginRight: "12px",
              animation: "fadeIn 2s",
            }}
          />
          <h1 style={{ margin: 0, color: "#38bdf8" }}>Cons.com</h1>
        </div>

        {/* Right Side User/Buttons */}
        <div>
          {user ? (
            <>
              <span style={{ marginRight: "20px", color: "#fff" }}>
                Hello, {user.displayName || "User"}
              </span>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <Link to="/login">
              <button>Login</button>
            </Link>
          )}
        </div>
      </header>

      {/* Routes */}
      <Routes>
        <Route
          path="/login"
          element={user ? <Navigate to="/feed" /> : <Login />}
        />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/feed"
          element={user ? <Feed /> : <Navigate to="/login" />}
        />
        <Route
          path="/report"
          element={user ? <ReportForm /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
}

export default App;
