// components/ReportForm.js
import React, { useState } from "react";
import { db } from "../firebase-config";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function ReportForm() {
  const [description, setDescription] = useState("");
  const [imageURL, setImageURL] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!description || !imageURL) return;

    await addDoc(collection(db, "problems"), {
      description,
      imageURL,
      location: "Unknown",
      createdAt: Timestamp.now(),
      solved: false
    });

    setDescription("");
    setImageURL("");
    alert("Problem reported!");
    navigate("/feed");
  };

  return (
    <div className="report-container">
      <h2>Report a Problem</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Problem description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={imageURL}
          onChange={(e) => setImageURL(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ReportForm;
