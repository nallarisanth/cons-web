// src/components/ReportForm.js
import React, { useState } from "react";
import { db } from "../firebase-config";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function ReportForm() {
  const navigate = useNavigate();
  const [description, setDescription] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "problems"), {
        description,
        imageURL,
        location,
        createdAt: new Date(),
      });
      navigate("/feed");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage:
          "url('https://e0.pxfuel.com/wallpapers/645/334/desktop-wallpaper-minimalist-design-%E2%9D%A4-for-ultra-tv.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <h2 style={{ color: "#fff", marginBottom: "20px" }}>Report a Problem</h2>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "350px",
          background: "rgba(0,0,0,0.5)",
          padding: "20px",
          borderRadius: "10px",
          color: "#fff",
        }}
      >
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          style={{ marginBottom: "10px", padding: "10px" }}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={imageURL}
          onChange={(e) => setImageURL(e.target.value)}
          style={{ marginBottom: "10px", padding: "10px" }}
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
          style={{ marginBottom: "10px", padding: "10px" }}
        />
        <button
          type="submit"
          style={{
            padding: "10px",
            background: "#38bdf8",
            border: "none",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Post
        </button>
      </form>
    </div>
  );
}

export default ReportForm;
