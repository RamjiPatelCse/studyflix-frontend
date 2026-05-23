import { useEffect, useState }
from "react";

function Home() {

  const [batches, setBatches] =
  useState([]);

  useEffect(() => {

    const data =
    JSON.parse(

      localStorage.getItem(
        "batches"
      ) || "[]"

    );

    setBatches(data);

  }, []);

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

          marginBottom:"20px",

          fontSize:"35px"

        }}

      >

        StudyFlix 😄🔥

      </h1>



      {

        batches.length === 0 && (

          <div

            style={{

              textAlign:"center",

              marginTop:"100px",

              opacity:"0.7"

            }}

          >

            <h2>

              No Batch Found 😄

            </h2>

          </div>

        )

      }



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

              background:"#111",

              borderRadius:"20px",

              overflow:"hidden",

              marginBottom:"25px",

              cursor:"pointer",

              border:"2px solid #222"

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



            </div>

          </div>

        ))

      }

    </div>

  );

}

export default Home;
