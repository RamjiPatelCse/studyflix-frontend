import { useEffect, useState } from "react";
import axios from "axios";

const API = "https://studyflix-backend.onrender.com";

export default function AdminPage() {

  const [title, setTitle] = useState("");

  const [thumbnail, setThumbnail] = useState("");

  const [file, setFile] = useState(null);

  const [batches, setBatches] = useState([]);

  useEffect(() => {

    loadBatches();

  }, []);

  async function loadBatches() {

    try {

      const res = await axios.get(
        `${API}/api/batches`
      );

      setBatches(res.data);

    } catch (err) {

      console.log(err);

    }

  }

  async function uploadBatch() {

    try {

      if(!file){

        alert("Choose TXT File");

        return;

      }

      const text = await file.text();

      await axios.post(
        `${API}/api/upload`,
        {
          title,
          thumbnail,
          text
        }
      );

      alert("Batch Uploaded 😄");

      setTitle("");

      setThumbnail("");

      setFile(null);

      loadBatches();

    } catch (err) {

      console.log(err);

      alert("Upload Failed");

    }

  }

  async function deleteBatch(id) {

    try {

      await axios.delete(
        `${API}/api/batch/${id}`
      );

      alert("Batch Deleted 😄");

      loadBatches();

    } catch (err) {

      console.log(err);

      alert("Delete Failed");

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
        onChange={(e)=>
          setTitle(e.target.value)
        }
      />

      <input
        placeholder="Thumbnail URL"
        className="w-full p-3 mb-4 bg-zinc-900 rounded-xl"
        value={thumbnail}
        onChange={(e)=>
          setThumbnail(e.target.value)
        }
      />

      <input
        type="file"
        accept=".txt"
        className="w-full p-3 mb-4 bg-zinc-900 rounded-xl"
        onChange={(e)=>
          setFile(e.target.files[0])
        }
      />

      <button
        onClick={uploadBatch}
        className="bg-red-600 px-5 py-3 rounded-xl mb-10"
      >
        Upload TXT File
      </button>

      <h2 className="text-2xl mb-5">
        Uploaded Batches
      </h2>

      <div className="grid gap-5">

        {batches.map((batch)=>(

          <div
            key={batch._id}
            className="bg-zinc-900 rounded-xl overflow-hidden"
          >

            <img
              src={batch.thumbnail}
              className="w-full h-40 object-cover"
            />

            <div className="p-4">

              <h3 className="text-xl font-bold mb-2">
                {batch.title}
              </h3>

              <p className="mb-4 text-zinc-400">
                Videos: {batch.videos.length}
              </p>

              <button
                onClick={()=>
                  deleteBatch(batch._id)
                }
                className="bg-red-600 px-4 py-2 rounded-lg"
              >
                Delete Batch
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}
