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

  const [loading,setLoading] =
    useState(true);

  const [error,setError] =
    useState("");

  useEffect(()=>{

    if(batch && video){

      playVideo();

    }

  },[batch,video]);

  async function playVideo(){

    try{

      setLoading(true);

      const res =
        await axios.get(
          `${API}/api/play/${batch}/${video}`
        );

      if(
        res.data &&
        res.data.url
      ){

        // DIRECT PLAYER OPEN
        window.location.href =
          res.data.url;

      }

      else{

        setError(
          "Player URL Not Found"
        );

      }

    }

    catch(err){

      console.log(err);

      setError(
        "Video Failed To Load"
      );

    }

    setLoading(false);

  }

  return(

    <div className="bg-black min-h-screen flex items-center justify-center text-white">

      <div className="text-center">

        {
          loading && (

            <div>

              <h1 className="text-3xl mb-3">

                Loading Video...

              </h1>

              <p className="text-zinc-400">

                Please Wait 😄

              </p>

            </div>

          )
        }

        {
          error && (

            <div>

              <h1 className="text-red-500 text-2xl">

                {error}

              </h1>

              <button
                onClick={() =>
                  router.back()
                }
                className="mt-5 bg-red-600 px-5 py-3 rounded-xl"
              >

                ⬅ Go Back

              </button>

            </div>

          )
        }

      </div>

    </div>

  )

}
