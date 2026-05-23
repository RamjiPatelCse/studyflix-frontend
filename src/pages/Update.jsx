import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Update() {

  const navigate = useNavigate();

  const [title,setTitle] =
    useState("");

  const [thumbnail,setThumbnail] =
    useState("");

  const [file,setFile] =
    useState(null);

  const createCourse =
  async () => {

    if(!title){
      alert("Enter Title");
      return;
    }

    if(!thumbnail){
      alert("Enter Thumbnail");
      return;
    }

    if(!file){
      alert("Select TXT");
      return;
    }

    try{

      const text =
        await file.text();

      const lines =
        text
        .split("\n")
        .map(x => x.trim())
        .filter(Boolean);

      const subjectsMap = {};

      lines.forEach((line) => {

        // PDF HIDE
        if (
          line.includes(".pdf")
        ) {
          return;
        }

        // VIDEO
        if (
          line.includes("VC:")
        ) {

          const parts =
            line.split("VC:");

          const left =
            parts[0];

          const url =
            parts[1]?.trim();

          const matches =
            left.match(
              /\((.*?)\)/g
            );

          if (!matches) return;

          const subject =
            matches[0]
            ?.replace(/[()]/g,"")
            .trim();

          const topic =
            matches[2]
            ?.replace(/[()]/g,"")
            .trim();

          const lecture =
            left
            .split(")")
            .pop()
            .replace(":","")
            .trim();

          if (
            !subjectsMap[
              subject
            ]
          ) {

            subjectsMap[
              subject
            ] = {

              name: subject,

              topics: []

            };

          }

          let existingTopic =
            subjectsMap[
              subject
            ].topics.find(
              t =>
              t.name === topic
            );

          if (
            !existingTopic
          ) {

            existingTopic = {

              name: topic,

              lectures: []

            };

            subjectsMap[
              subject
            ].topics.push(
              existingTopic
            );

          }

          existingTopic
          .lectures.push({

            title: lecture,

            url

          });

        }

      });

      const subjects =
        Object.values(
          subjectsMap
        );

      const oldCourses =
        JSON.parse(
          localStorage.getItem(
            "courses"
          ) || "[]"
        );

      const newCourse = {

        id: Date.now(),

        title,

        thumbnail,

        subjects

      };

      oldCourses.push(
        newCourse
      );

      localStorage.setItem(

        "courses",

        JSON.stringify(
          oldCourses
        )

      );

      alert(
        "Course Created 😄🔥"
      );

      navigate("/");

    }

    catch(err){

      console.log(err);

      alert(
        "Create Error 😭"
      );

    }

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
          fontSize:"45px",
          marginBottom:"30px"
        }}
      >
        StudyFlix Update 😄🔥
      </h1>

      <input

        placeholder="Course Title"

        value={title}

        onChange={(e)=>
          setTitle(
            e.target.value
          )
        }

        style={{
          width:"100%",
          padding:"20px",
          borderRadius:"20px",
          marginBottom:"20px",
          fontSize:"22px"
        }}

      />

      <input

        placeholder="Thumbnail URL"

        value={thumbnail}

        onChange={(e)=>
          setThumbnail(
            e.target.value
          )
        }

        style={{
          width:"100%",
          padding:"20px",
          borderRadius:"20px",
          marginBottom:"20px",
          fontSize:"22px"
        }}

      />

      <input

        type="file"

        accept=".txt"

        onChange={(e)=>
          setFile(
            e.target.files[0]
          )
        }

        style={{
          color:"#fff",
          marginBottom:"25px"
        }}

      />

      <button

        onClick={createCourse}

        style={{
          width:"100%",
          padding:"22px",
          background:"red",
          color:"#fff",
          border:"none",
          borderRadius:"20px",
          fontSize:"24px"
        }}

      >

        Create Course 😄🔥

      </button>

    </div>

  );

}
