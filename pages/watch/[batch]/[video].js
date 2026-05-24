import axios from "axios";
import { useEffect } from "react";
import { useRouter } from "next/router";

const API = "https://studyflix-backend.onrender.com";

export default function WatchPage(){

  const router = useRouter();

  const {
    batch,
    video
  } = router.query;

  useEffect(()=>{

    if(batch && video){

      loadVideo();

    }

  },[batch,video]);

  async function loadVideo(){

    try{

      const res = await axios.get(
        `${API}/api/play/${batch}/${video}`
      );

      if(res.data.url){

        window.location.href =
          res.data.url;

      }

    }

    catch(err){

      console.log(err);

      alert("Video Load Failed");

    }

  }

  return(

    <div className="bg-black h-screen flex items-center justify-center text-white text-2xl">

      Loading Video...

    </div>

  )

}
