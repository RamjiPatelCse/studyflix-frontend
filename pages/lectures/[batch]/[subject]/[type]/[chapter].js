import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const API = "https://studyflix-backend.onrender.com";

export default function LecturePage(){

  const router = useRouter();

  const {
    batch,
    subject,
    type,
    chapter
  } = router.query;

  const [videos,setVideos] = useState([]);

  useEffect(()=>{

    if(batch){

      loadVideos();

    }

  },[batch]);

  async function loadVideos(){

    try{

      const res = await axios.get(
        `${API}/api/batches`
      );

      const data = res.data.find(
        (b)=>b._id === batch
      );

      if(!data) return;

      const filtered =
        data.videos.filter(
          (v)=>
            v.subject === subject &&
            v.type === type &&
            v.chapter === chapter
        );

      setVideos(filtered);

    }

    catch(err){

      console.log(err);

    }

  }

  return(

    <div className="p-5 bg-black min-h-screen text-white">

      <h1 className="text-3xl mb-5">
        {chapter}
      </h1>

      <div className="grid gap-5">

        {
          videos.map((video)=>(

            <Link
              key={video._id}
              href={`/watch/${batch}/${video._id}`}
            >

              <div className="bg-zinc-900 rounded-xl overflow-hidden">

                <img
                  src="https://i.imgur.com/8Km9tLL.jpg"
                  className="w-full h-44 object-cover"
                />

                <div className="p-4">

                  <h2 className="text-lg font-bold">
                    {video.title}
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
