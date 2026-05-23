import { useState } from "react";
import axios from "axios";

function Update() {

  const [batchName, setBatchName] = useState("");

  const [thumbnail, setThumbnail] = useState("");

  const [file, setFile] = useState(null);

  const createBatch = async () => {

    try {

      const formData = new FormData();

      formData.append("batchName", batchName);

      formData.append("thumbnail", thumbnail);

      formData.append("txt", file);

      await axios.post(
        "https://studyflix-backend.onrender.com/api/create-batch",
        formData
      );

      alert("Batch Created 😄");

    } catch (error) {

      alert("Error Creating Batch");

    }

  };

  return (

    <div
      style={{
        minHeight:"100vh",
        background:"#111",
        padding:20,
        color:"white"
      }}
    >

      <h1
        style={{
          color:"red",
          marginBottom:20
        }}
      >
        StudyFlix Update 😄
      </h1>

      <input
        placeholder="Batch Name"
        value={batchName}
        onChange={(e)=>setBatchName(e.target.value)}
        style={{
          width:"100%",
          padding:14,
          marginBottom:15,
          borderRadius:10,
          border:"none"
        }}
      />

      <input
        placeholder="Thumbnail URL"
        value={thumbnail}
        onChange={(e)=>setThumbnail(e.target.value)}
        style={{
          width:"100%",
          padding:14,
          marginBottom:15,
          borderRadius:10,
          border:"none"
        }}
      />

      <input
        type="file"
        onChange={(e)=>setFile(e.target.files[0])}
        style={{
          marginBottom:20
        }}
      />

      <button
        onClick={createBatch}
        style={{
          width:"100%",
          padding:14,
          background:"red",
          color:"white",
          border:"none",
          borderRadius:10,
          fontWeight:"bold"
        }}
      >
        Create Batch
      </button>

    </div>
  );
}

export default Update;
