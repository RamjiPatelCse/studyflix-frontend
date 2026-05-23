import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Home() {

  const router = useRouter();

  const [courses, setCourses] =
    useState([]);

  useEffect(() => {

    const data =
      JSON.parse(
        localStorage.getItem(
          "courses"
        ) || "[]"
      );

    setCourses(data);

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
          fontSize:"50px",
          marginBottom:"30px"
        }}
      >
        StudyFlix 😄🔥
      </h1>

      {

        courses.map((course,index)=>(

          <div

            key={index}

            onClick={() =>
              router.push(
                `/course/${course.id}`
              )
            }

            style={{
              background:"#111",
              borderRadius:"20px",
              overflow:"hidden",
              marginBottom:"25px",
              cursor:"pointer"
            }}

          >

            <img

              src={course.thumbnail}

              alt=""

              style={{
                width:"100%",
                height:"250px",
                objectFit:"cover"
              }}

            />

            <div
              style={{
                padding:"20px"
              }}
            >

              <h2
                style={{
                  fontSize:"30px"
                }}
              >
                {course.title}
              </h2>

            </div>

          </div>

        ))

      }

    </div>

  );

}
