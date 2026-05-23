import { useEffect, useState } from "react";
import axios from "axios";

function Watch() {

  const [video, setVideo] = useState("");

  useEffect(() => {

    loadVideo();

  }, []);

  const loadVideo = async () => {

    const params =
      new URLSearchParams(window.location.search);

    const url = params.get("url");

    try {

      const response = await axios.get(
        `https://studyflix-backend.onrender.com/api/get-video?url=${url}`
      );

      setVideo(response.data.player);

    } catch (error) {

      alert("Video Error");

    }

  };

  return (

    <div
      style={{
        background:"#111",
        minHeight:"100vh"
      }}
    >

      {
        video && (

          <iframe
            src={video}
            width="100%"
            height="100%"
            style={{
              border:"none",
              minHeight:"100vh"
            }}
            allowFullScreen
          />

        )
      }

    </div>
  );
}

export default Watch;
