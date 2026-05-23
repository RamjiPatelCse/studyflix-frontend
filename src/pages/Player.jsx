import { useEffect, useState }
from "react";

function Player() {

  const [batch, setBatch] =
  useState(null);

  useEffect(() => {

    const data =
    JSON.parse(

      localStorage.getItem(
        "selectedBatch"
      )

    );

    setBatch(data);

  }, []);

  if (!batch) {

    return (

      <div

        style={{

          background:"#000",

          color:"#fff",

          height:"100vh",

          display:"flex",

          justifyContent:"center",

          alignItems:"center",

          fontSize:"25px"

        }}

      >

        Loading 😄🔥

      </div>

    );

  }

  return (

    <div

      style={{

        background:"#000",

        minHeight:"100vh",

        padding:"20px",

        color:"#fff"

      }}

    >

      <button

        onClick={() => {

          window.location.href =
          "/";

        }}



        style={{

          marginBottom:"20px",

          padding:"10px 20px",

          border:"none",

          borderRadius:"10px",

          background:"red",

          color:"#fff",

          fontSize:"18px"

        }}

      >

        ← Back

      </button>



      <h1

        style={{

          marginBottom:"20px"

        }}

      >

        {batch.title}

      </h1>



      {

        batch.lectures.map((lecture) => (

          <div

            key={lecture.id}



            onClick={() => {

              localStorage.setItem(

                "video",

                lecture.video

              );



              window.location.href =
              "/watch";

            }}



            style={{

              background:"#111",

              padding:"20px",

              borderRadius:"20px",

              marginBottom:"20px",

              cursor:"pointer"

            }}

          >

            ▶ {lecture.title}

          </div>

        ))

      }

    </div>

  );

}

export default Player;
