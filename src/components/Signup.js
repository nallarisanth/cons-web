// src/components/Signup.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";

function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/feed");
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <div
      className="auth-container"
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
      <h2 style={{ marginBottom: "20px", color: "#fff" }}>Sign Up</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form
        onSubmit={handleSignup}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "300px",
        }}
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ marginBottom: "10px", padding: "10px" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
          Sign Up
        </button>
      </form>

      <p style={{ marginTop: "15px", color: "#fff" }}>
        Already have an account?{" "}
        <span
          style={{ textDecoration: "underline", cursor: "pointer" }}
          onClick={() => navigate("/login")}
        >
          Login
        </span>
      </p>
    </div>
  );
}

export default Signup;
