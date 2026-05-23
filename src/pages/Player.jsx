import { useEffect, useState } from "react";

function Player() {

  const [batch, setBatch] = useState(null);

  useEffect(() => {

    const data =
      localStorage.getItem(
        "selectedBatch"
      );

    if (data) {

      setBatch(JSON.parse(data));

    }

  }, []);

  if (!batch) {

    return (

      <div
        style={{
          background:"#111",
          color:"white",
          minHeight:"100vh",
          padding:20
        }}
      >

        No Batch Found

      </div>

    );

  }

  return (

    <div
      style={{
        background:"#111",
        color:"white",
        minHeight:"100vh",
        padding:20
      }}
    >

      <h1
        style={{
          color:"red",
          marginBottom:20
        }}
      >
        {batch.batchName}
      </h1>

      {
        batch.lectures.map((lecture, index) => (

          <div
            key={index}

            onClick={() => {

              window.location.href =
              `/watch?url=${encodeURIComponent(
                lecture.url
              )}`;

            }}

            style={{
              background:"#1b1b1b",
              padding:15,
              borderRadius:12,
              marginBottom:15,
              cursor:"pointer"
            }}
          >

            <h3>
              {lecture.title}
            </h3>

          </div>

        ))
      }

    </div>
  );
}

export default Player;
