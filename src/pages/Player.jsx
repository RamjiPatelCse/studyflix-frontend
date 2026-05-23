import { useEffect, useState }
from "react";

function Player() {

  const [batch, setBatch] =
  useState(null);

  useEffect(() => {

    const data =
    localStorage.getItem(
      "selectedBatch"
    );

    if (data) {

      setBatch(
        JSON.parse(data)
      );

    }

  }, []);

  if (!batch) {

    return <h1>No Batch</h1>;

  }

  return (

    <div
      style={{
        background:"#111",
        minHeight:"100vh",
        color:"white",
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

        Object.keys(batch.folders)
        .map((subject, index) => (

          <div
            key={index}
            style={{
              marginBottom:30
            }}
          >

            <h2
              style={{
                color:"yellow"
              }}
            >
              📚 {subject}
            </h2>

            {

              Object.keys(
                batch.folders[subject]
              ).map((chapter, i) => (

                <div

                  key={i}

                  style={{
                    background:"#1b1b1b",
                    padding:15,
                    borderRadius:15,
                    marginTop:15
                  }}
                >

                  <h3>
                    📁 {chapter}
                  </h3>

                  {

                    batch
                    .folders[subject][chapter]
                    .map((lecture, j) => (

                      <div

                        key={j}

                        onClick={() => {

                          window.location.href =
                          `/watch?id=${lecture.id}`;

                        }}

                        style={{
                          background:"#222",
                          borderRadius:15,
                          overflow:"hidden",
                          marginTop:15,
                          cursor:"pointer"
                        }}
                      >

                        <img

                          src={
                            lecture.thumbnail
                          }

                          alt=""

                          style={{
                            width:"100%",
                            height:180,
                            objectFit:"cover"
                          }}

                        />

                        <div
                          style={{
                            padding:15
                          }}
                        >

                          <h3>
                            ▶ {lecture.title}
                          </h3>

                        </div>

                      </div>

                    ))

                  }

                </div>

              ))

            }

          </div>

        ))

      }

    </div>

  );

}

export default Player;
