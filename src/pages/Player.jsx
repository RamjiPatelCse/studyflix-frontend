import { useEffect, useState }
from "react";

function Player() {

  const [batch, setBatch] =
  useState(null);

  const [folders, setFolders] =
  useState({});



  useEffect(() => {

    const data =
    JSON.parse(

      localStorage.getItem(
        "selectedBatch"
      )

    );



    setBatch(data);



    if(data){

      const grouped = {};



      data.lectures.forEach((lecture) => {

        const matches =
        lecture.title.match(
          /\((.*?)\)/g
        );



        if(!matches) return;



        const subject =
        matches[0]
        ?.replace(/[()]/g,"")
        || "Other";



        const type =
        matches[1]
        ?.replace(/[()]/g,"")
        || "Videos";



        const chapter =
        matches[2]
        ?.replace(/[()]/g,"")
        || "Chapter";



        if(!grouped[subject]){

          grouped[subject] = {};

        }



        if(!grouped[subject][type]){

          grouped[subject][type] = {};

        }



        if(!grouped[subject][type][chapter]){

          grouped[subject][type][chapter] = [];

        }



        grouped[subject][type][chapter]
        .push(lecture);

      });



      setFolders(grouped);

    }

  }, []);





  if(!batch){

    return (

      <div

        style={{

          background:"#000",

          color:"#fff",

          height:"100vh",

          display:"flex",

          justifyContent:"center",

          alignItems:"center"

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

          background:"red",

          color:"#fff",

          border:"none",

          padding:"10px 20px",

          borderRadius:"10px",

          marginBottom:"20px"

        }}

      >

        ← Back

      </button>



      <h1>

        {batch.title}

      </h1>



      {

        Object.keys(folders)
        .map((subject) => (

          <div key={subject}>



            <h2

              style={{

                color:"yellow",

                marginTop:"30px"

              }}

            >

              📚 {subject}

            </h2>



            {

              Object.keys(
                folders[subject]
              ).map((type) => (

                <div
                  key={type}
                >



                  <h3

                    style={{

                      color:"#0ff",

                      marginTop:"20px"

                    }}

                  >

                    📂 {type}

                  </h3>



                  {

                    Object.keys(

                      folders[subject][type]

                    ).map((chapter) => (

                      <div

                        key={chapter}



                        style={{

                          background:"#111",

                          padding:"20px",

                          borderRadius:"20px",

                          marginTop:"20px"

                        }}

                      >



                        <h3>

                          📁 {chapter}

                        </h3>



                        {

                          folders[subject][type][chapter]

                          .map((lecture) => (

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

                                background:"#222",

                                padding:"15px",

                                borderRadius:"15px",

                                marginTop:"15px",

                                cursor:"pointer"

                              }}

                            >

                              ▶ {

                                lecture.title

                                .replace(/\(.*?\)/g,"")

                              }

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

        ))

      }

    </div>

  );

}



export default Player;
