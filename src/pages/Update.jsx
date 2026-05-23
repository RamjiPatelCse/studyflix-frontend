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
      alert("Enter Title 😄");
      return;
    }

    if(!thumbnail){
      alert("Enter Thumbnail 😄");
      return;
    }

    if(!file){
      alert("Select TXT 😄");
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

      let subjects = [];

      let currentSubject = null;

      let currentTopic = null;

      lines.forEach((line,index)=>{

        // SUBJECT
        if(
          line.startsWith("📚")
        ){

          currentSubject = {

            name:
            line.replace(
              "📚",
              ""
            ).trim(),

            topics:[]

          };

          subjects.push(
            currentSubject
          );

        }

        // TOPIC
        else if(
          line.startsWith("📂")
        ){

          currentTopic = {

            name:
            line.replace(
              "📂",
              ""
            ).trim(),

            lectures:[]

          };

          currentSubject?.topics
          .push(currentTopic);

        }

        // LECTURE
        else if(
          line.startsWith("▶")
        ){

          const lectureTitle =
            line.replace(
              "▶",
              ""
            ).trim();

          const nextLine =
            lines[index + 1];

          // PDF HIDE
          if(
            nextLine &&
            nextLine.includes(".pdf")
          ){
            return;
          }

          if(
            nextLine &&
            nextLine.startsWith("http")
          ){

            currentTopic?.lectures
            .push({

              title:
              lectureTitle,

              url:
              nextLine

            });

          }

        }

      });

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
        Update Panel 😄🔥
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
