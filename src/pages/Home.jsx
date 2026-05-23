import { useEffect, useState }
from "react";

import axios from "axios";

function Home() {

  const [batches, setBatches] =
  useState([]);

  useEffect(() => {

    getBatches();

  }, []);

  const getBatches =
  async () => {

    const response =
    await axios.get(

      "https://studyflix-backend.onrender.com/api/batches"

    );

    setBatches(
      response.data.batches
    );

  };

  return (

    <div
      style={{
        background:"#111",
        minHeight:"100vh",
        padding:20,
        color:"white"
      }}
    >

      <h1
        style={{
          color:"red",
          marginBottom:20
        }}
      >
        StudyFlix 😄
      </h1>

      {

        batches.map((batch) => (

          <div

            key={batch.id}

            onClick={() => {

              localStorage.setItem(

                "selectedBatch",

                JSON.stringify(batch)

              );

              window.location.href =
              "/player";

            }}

            style={{
              background:"#1b1b1b",
              borderRadius:20,
              overflow:"hidden",
              marginBottom:20,
              cursor:"pointer"
            }}
          >

            <img

              src={batch.thumbnail}

              alt=""

              style={{
                width:"100%",
                height:220,
                objectFit:"cover"
              }}

            />

            <div
              style={{
                padding:15
              }}
            >

              <h2>
                {batch.batchName}
              </h2>

            </div>

          </div>

        ))

      }

    </div>

  );

}

export default Home;
