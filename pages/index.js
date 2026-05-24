import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

const API = "https://studyflix-backend.onrender.com";

export default function Home() {

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

  return (
    <div className="p-5 bg-black min-h-screen text-white">

      <h1 className="text-3xl font-bold mb-5">
        StudyFlix
      </h1>

      <div className="grid grid-cols-2 gap-5">

        {batches.map((batch) => (

          <Link
            href={`/batch/${batch._id}`}
            key={batch._id}
          >

            <div className="bg-zinc-900 rounded-xl overflow-hidden">

              <img
                src={batch.thumbnail}
                className="w-full h-40 object-cover"
              />

              <div className="p-3">

                <h2 className="font-bold">
                  {batch.title}
                </h2>

              </div>

            </div>

          </Link>

        ))}

      </div>

    </div>
  );
}
