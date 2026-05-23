import axios from "axios";
import { useEffect, useState }
from "react";

function Watch() {

  const [video, setVideo] =
  useState("");

  useEffect(() => {

    loadVideo();

  }, []);

  const loadVideo =
  async () => {

    const params =
    new URLSearchParams(
      window.location.search
    );

    const id =
    params.get("id");

    const res =
    await axios.post(

      "https://studyflix-backend.onrender.com/api/watch",

      { id }

    );

    setVideo(
      res.data.player
    );

  };

  return (

    <div
      style={{
        width:"100%",
        height:"100vh",
        background:"#000"
      }}
    >

      {

        video && (

          <video

            controls

            autoPlay

            src={video}

            style={{
              width:"100%",
              height:"100%"
            }}

          />

        )

      }

    </div>

  );

}

export default Watch;
