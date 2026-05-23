import { useEffect, useState }
from "react";

function Watch() {

  const [video, setVideo] =
  useState("");

  useEffect(() => {

    const url =
    localStorage.getItem(
      "video"
    );

    setVideo(url);

  }, []);

  return (

    <div

      style={{

        background:"#000",

        height:"100vh"

      }}

    >

      {

        video && (

          <iframe

            src={video}

            title="video"

            allowFullScreen



            style={{

              width:"100%",

              height:"100%",

              border:"none"

            }}

          />

        )

      }

    </div>

  );

}

export default Watch;
