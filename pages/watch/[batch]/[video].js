import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const API = "https://studyflix-backend.onrender.com";

export default function WatchPage(){

  const router = useRouter();

  const {
    batch,
    video
  } = router.query;

  const [url,setUrl] = useState("");

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

      setUrl(res.data.url);

    }

    catch(err){

      console.log(err);

    }

  }

  return(

    <div className="bg-black h-screen">

      {
        url && (

          <iframe
            src={url}
            className="w-full h-full"
            allowFullScreen
          />

        )
      }

    </div>

  )

}
