import axios from "axios";
import { useEffect, useState }
from "react";
import { useNavigate }
from "react-router-dom";

function Home() {

  const [data, setData] =
  useState({});

  const navigate =
  useNavigate();

  useEffect(() => {

    loadData();

  }, []);

  const loadData =
  async () => {

    const res =
    await axios.get(
      "https://studyflix-backend.onrender.com/api/data"
    );

    setData(res.data);

  };

  return (

    <div
      style={{
        background:"#000",
        minHeight:"100vh",
        color:"#fff",
        padding:"20px"
      }}
    >

      <h1
        style={{
          color:"red"
        }}
      >
        StudyFlix 😄
      </h1>

      {

        Object.keys(data)
        .map(subject => (

          <div
            key={subject}
            style={{
              marginTop:"30px"
            }}
          >

            <h2>
              📚 {subject}
            </h2>

            {

              Object.keys(
                data[subject]
              ).map(type => (

                <div
                  key={type}
                  style={{
                    marginLeft:"20px"
                  }}
                >

                  <h3>
                    🔴 {type}
                  </h3>

                  {

                    Object.keys(
                      data[subject][type]
                    ).map(chapter => (

                      <div
                        key={chapter}
                        style={{
                          marginLeft:"20px"
                        }}
                      >

                        <h4>
                          ✅ {chapter}
                        </h4>

                        {

                          data[
                            subject
                          ][
                            type
                          ][
                            chapter
                          ].map(lecture => (

                            <div

                              key={
                                lecture.id
                              }

                              onClick={() =>
                                navigate(
                                  `/watch?id=${lecture.id}`
                                )
                              }

                              style={{
                                background:"#111",
                                padding:"15px",
                                borderRadius:"20px",
                                marginBottom:"20px",
                                cursor:"pointer"
                              }}

                            >

                              <img

                                src={
                                  lecture.thumbnail
                                }

                                style={{
                                  width:"100%",
                                  borderRadius:"20px"
                                }}

                              />

                              <h3>
                                ▶ {lecture.title}
                              </h3>

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

export default Home;
