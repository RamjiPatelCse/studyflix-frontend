import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home(){

  const [batches,setBatches] = useState([]);

  useEffect(()=>{

    loadBatches();

  },[]);

  async function loadBatches(){

    const res = await axios.get(
      "https://YOUR-BACKEND-URL/api/batches"
    );

    setBatches(res.data);

  }

  return(

    <div className="p-5">

      <h1 className="text-3xl font-bold mb-5">
        StudyFlix
      </h1>

      <div className="grid grid-cols-2 gap-5">

        {
          batches.map((batch)=>(

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

          ))
        }

      </div>

    </div>

  )

}
