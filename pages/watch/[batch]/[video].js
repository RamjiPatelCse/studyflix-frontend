import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const API =
"https://studyflix-backend.onrender.com";

export default function WatchPage(){

  const router = useRouter();

  const {
    batch,
    video
  } = router.query;

  const [url,setUrl] =
    useState("");

  const [videos,setVideos] =
    useState([]);

  const [currentIndex,setCurrentIndex] =
    useState(-1);

  const [loading,setLoading] =
    useState(true);

  useEffect(()=>{

    if(batch && video){

      loadVideo();

      loadAllVideos();

    }

  },[batch,video]);

  async function loadVideo(){

    try{

      setLoading(true);

      const res =
        await axios.get(
          `${API}/api/play/${batch}/${video}`
        );

      if(res.data.url){

        setUrl(res.data.url);

      }

      setLoading(false);

    }

    catch(err){

      console.log(err);

      setLoading(false);

      alert("Video Load Failed");

    }

  }

  async function loadAllVideos(){

    try{

      const res =
        await axios.get(
          `${API}/api/batches`
        );

      const batchData =
        res.data.find(
          (b)=>b._id === batch
        );

      if(!batchData) return;

      setVideos(batchData.videos);

      const index =
        batchData.videos.findIndex(
          (v)=>v._id === video
        );

      setCurrentIndex(index);

    }

    catch(err){

      console.log(err);

    }

  }

  function goBack(){

    router.back();

  }

  function goHome(){

    router.push("/");

  }

  function goPrev(){

    if(currentIndex > 0){

      const prevVideo =
        videos[currentIndex - 1];

      router.push(
        `/watch/${batch}/${prevVideo._id}`
      );

    }

  }

  function goNext(){

    if(
      currentIndex <
      videos.length - 1
    ){

      const nextVideo =
        videos[currentIndex + 1];

      router.push(
        `/watch/${batch}/${nextVideo._id}`
      );

    }

  }

  return(

    <div className="bg-black min-h-screen text-white">

      <div className="flex justify-between items-center p-4">

        <div className="flex gap-3">

          <button
            onClick={goBack}
            className="bg-zinc-800 px-4 py-2 rounded-xl"
          >
            ⬅ Back
          </button>

          <button
            onClick={goHome}
            className="bg-zinc-800 px-4 py-2 rounded-xl"
          >
            🏠 Home
          </button>

        </div>

        <div className="text-sm text-zinc-400">

          Lecture {
            currentIndex + 1
          } / {
            videos.length
          }

        </div>

      </div>

      <div className="w-full h-[72vh] bg-black">

        {
          loading ? (

            <div className="flex items-center justify-center h-full text-2xl">

              Loading Video...

            </div>

          ) : (

            url && (

              <iframe
                src={url}
                className="w-full h-full"
                allowFullScreen
              />

            )

          )
        }

      </div>

      <div className="flex justify-center gap-5 p-5">

        <button
          onClick={goPrev}
          disabled={currentIndex <= 0}
          className="bg-red-600 px-5 py-3 rounded-xl disabled:opacity-40"
        >
          ⬅ Previous
        </button>

        <button
          onClick={goNext}
          disabled={
            currentIndex >=
            videos.length - 1
          }
          className="bg-red-600 px-5 py-3 rounded-xl disabled:opacity-40"
        >
          Next ➡
        </button>

      </div>

    </div>

  )

}
