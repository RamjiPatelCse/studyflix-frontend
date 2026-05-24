import { useState } from "react";
import axios from "axios";

const API = "https://studyflix-backend.onrender.com";

export default function AdminPage() {

  const [title, setTitle] = useState("");

  const [thumbnail, setThumbnail] = useState("");

  const [text, setText] = useState("");

  async function uploadBatch() {

    try {

      await axios.post(
        `${API}/api/upload`,
        {
          title,
          thumbnail,
          text
        }
      );

      alert("Batch Uploaded 😄");

    } catch (err) {

      console.log(err);

      alert("Upload Failed");

    }

  }

  return (

    <div className="p-5 bg-black min-h-screen text-white">

      <h1 className="text-3xl font-bold mb-5">
        Admin Panel
      </h1>

      <input
        placeholder="Batch Title"
        className="w-full p-3 mb-4 bg-zinc-900 rounded-xl"
        value={title}
        onChange={(e)=>setTitle(e.target.value)}
      />

      <input
        placeholder="Thumbnail URL"
        className="w-full p-3 mb-4 bg-zinc-900 rounded-xl"
        value={thumbnail}
        onChange={(e)=>setThumbnail(e.target.value)}
      />

      <textarea
        rows={15}
        placeholder="Paste TXT Here"
        className="w-full p-3 mb-4 bg-zinc-900 rounded-xl"
        value={text}
        onChange={(e)=>setText(e.target.value)}
      />

      <button
        onClick={uploadBatch}
        className="bg-red-600 px-5 py-3 rounded-xl"
      >
        Upload Batch
      </button>

    </div>

  );

}
