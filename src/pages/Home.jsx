import { useEffect, useState } from "react";

function Home() {

  const [batches, setBatches] =
  useState([]);

  useEffect(() => {

    loadBatches();

  }, []);

  const loadBatches =
  async () => {

    try {

      const res =
      await fetch(

        "https://studyflix-backend.onrender.com/batches"

      );

      const data =
      await res.json();

      setBatches(data);

    } catch (err) {

      console.log(err);

    }

  };

  const deleteBatch =
  async (id) => {

    await fetch(

      `https://studyflix-backend.onrender.com/delete-batch/${id}`,

      {
        method:"DELETE"
      }

    );

    loadBatches();

  };

  return (

    <div
      style={{
        background:"#000",
        minHeight:"100vh",
        padding:"20px",
        color:"#fff"
      }}
    >

      <h1
        style={{
          color:"red",
          marginBottom:"20px"
        }}
      >
        StudyFlix 😄🔥
      </h1>

      {

        batches.map((batch) => (

          <div

            key={batch.id}

            style={{
              background:"#111",
              borderRadius:"20px",
              overflow:"hidden",
              marginBottom:"20px"
            }}

          >

            <img

              src={batch.thumbnail}

              alt=""

              style={{
                width:"100%",
                height:"220px",
                objectFit:"cover"
              }}

            />

            <div
              style={{
                padding:"15px"
              }}
            >

              <h2>
                {batch.title}
              </h2>

              <button

                onClick={() => {

                  localStorage.setItem(

                    "selectedBatch",

                    JSON.stringify(batch)

                  );

                  window.location.href =
                  "/player";

                }}

                style={{
                  padding:"12px",
                  border:"none",
                  borderRadius:"10px",
                  background:"red",
                  color:"#fff",
                  marginRight:"10px",
                  cursor:"pointer"
                }}

              >

                Open

              </button>

              <button

                onClick={() =>
                  deleteBatch(batch.id)
                }

                style={{
                  padding:"12px",
                  border:"none",
                  borderRadius:"10px",
                  background:"#222",
                  color:"#fff",
                  cursor:"pointer"
                }}

              >

                Delete

              </button>

            </div>

          </div>

        ))

      }

    </div>

  );

}

export default Home;
