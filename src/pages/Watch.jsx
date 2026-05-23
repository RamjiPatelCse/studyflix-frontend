import { useEffect, useState }
from "react";

import axios from "axios";

function Watch() {

  const [video, setVideo] =
  useState("");

  useEffect(() => {

    loadVideo();

  }, []);

  const loadVideo =
  async () => {

    try {

      const params =
      new URLSearchParams(
        window.location.search
      );

      const id =
      params.get("id");

      const response =
      await axios.post(

        "https://studyflix-backend.onrender.com/api/watch",

        { id }

      );

      setVideo(
        response.data.player
      );

    } catch (error) {

      alert("Video Error");

    }

  };

  return (

    <div
      style={{
        background:"#000",
        minHeight:"100vh"
      }}
    >

      {

        video && (

          <iframe

            src={video}

            width="100%"

            height="100%"

            allowFullScreen

            style={{
              border:"none",
              minHeight:"100vh"
            }}

          />

        )

      }

    </div>

  );

}

export default Watch;
