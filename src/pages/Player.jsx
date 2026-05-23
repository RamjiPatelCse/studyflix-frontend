import {
  useNavigate,
  useParams
} from "react-router-dom";

import {
  useEffect,
  useState
} from "react";

export default function Player(){

  const navigate = useNavigate();

  const { id } = useParams();

  const [course,setCourse] =
    useState(null);

  useEffect(()=>{

    const courses =
      JSON.parse(
        localStorage.getItem(
          "courses"
        ) || "[]"
      );

    const found =
      courses.find(
        item => item.id == id
      );

    setCourse(found);

  },[id]);

  if(!course){

    return(

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

  return(

    <div
      style={{
        background:"#000",
        minHeight:"100vh",
        padding:"20px",
        color:"#fff"
      }}
    >

      <button

        onClick={() =>
          navigate(-1)
        }

        style={{
          background:"red",
          color:"#fff",
          border:"none",
          padding:"12px 20px",
          borderRadius:"15px",
          marginBottom:"20px"
        }}

      >

        ← Back

      </button>

      <h1
        style={{
          fontSize:"40px",
          marginBottom:"30px"
        }}
      >
        {course.title}
      </h1>

      {

        course.subjects.map((subject,i)=>(

          <details
            key={i}
            style={{
              background:"#111",
              padding:"20px",
              borderRadius:"20px",
              marginBottom:"20px"
            }}
          >

            <summary
              style={{
                fontSize:"32px",
                color:"yellow"
              }}
            >
              📚 {subject.name}
            </summary>

            {

              subject.topics.map((topic,j)=>(

                <details
                  key={j}
                  style={{
                    marginTop:"20px",
                    background:"#222",
                    padding:"18px",
                    borderRadius:"18px"
                  }}
                >

                  <summary
                    style={{
                      fontSize:"25px",
                      color:"cyan"
                    }}
                  >
                    📂 {topic.name}
                  </summary>

                  {

                    topic.lectures.map((lecture,k)=>(

                      <div

                        key={k}

                        onClick={() =>
                          navigate(
                            `/watch?url=${encodeURIComponent(
                              lecture.url
                            )}`
                          )
                        }

                        style={{
                          background:"#333",
                          padding:"18px",
                          borderRadius:"15px",
                          marginTop:"15px",
                          fontSize:"22px",
                          cursor:"pointer"
                        }}

                      >

                        ▶ {lecture.title}

                      </div>

                    ))

                  }

                </details>

              ))

            }

          </details>

        ))

      }

    </div>

  );

}
