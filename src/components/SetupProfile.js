// src/components/SetupProfile.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase-config";
import { updateProfile } from "firebase/auth";

function SetupProfile() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const handleSetup = async (e) => {
    e.preventDefault();
    try {
      if (!auth.currentUser) throw new Error("No authenticated user");
      await updateProfile(auth.currentUser, { displayName: username });
      navigate("/feed");
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <div
      className="setup-container"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage:
          "url('https://e0.pxfuel.com/wallpapers/645/334/desktop-wallpaper-minimalist-design-%E2%9D%A4-for-ultra-tv.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h2 style={{ marginBottom: "20px", color: "#fff" }}>Create a Username</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form
        onSubmit={handleSetup}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "300px",
        }}
      >
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={{ marginBottom: "10px", padding: "10px" }}
        />
        <button
          type="submit"
          style={{
            padding: "10px",
            background: "#38bdf8",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          Save Username
        </button>
      </form>
    </div>
  );
}

export default SetupProfile;
