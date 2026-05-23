import { useState } from "react";

function Update() {

  const [title, setTitle] =
  useState("");

  const [thumbnail, setThumbnail] =
  useState("");

  const [text, setText] =
  useState("");

  const createBatch =
  async () => {

    try {

      const lectures = [];

      const lines =
      text
      .split("\n")
      .filter(x => x.trim());

      lines.forEach((line, index) => {

        const parts =
        line.split(": ");

        if(parts.length >= 2){

          lectures.push({

            id:
            Date.now() + index,

            title:
            parts[0],

            video:
            parts.slice(1).join(": ")

          });

        }

      });

      const res =
      await fetch(

        "https://studyflix-backend.onrender.com/create-batch",

        {

          method:"POST",

          headers:{
            "Content-Type":"application/json"
          },

          body:JSON.stringify({

            title,

            thumbnail,

            lectures

          })

        }

      );

      const data =
      await res.json();

      if(data.success){

        alert(
          "Batch Created 😄🔥"
        );

        setTitle("");
        setThumbnail("");
        setText("");

      }

    } catch(err){

      console.log(err);

      alert(
        "Server Error 😅"
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
          color:"red"
        }}
      >
        Update Panel 😄🔥
      </h1>

      <input

        placeholder="Batch Title"

        value={title}

        onChange={(e)=>
          setTitle(
            e.target.value
          )
        }

        style={{
          width:"100%",
          padding:"15px",
          borderRadius:"12px",
          marginTop:"20px",
          border:"none"
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
          padding:"15px",
          borderRadius:"12px",
          marginTop:"20px",
          border:"none"
        }}

      />

      <textarea

        placeholder="Paste TXT Content"

        value={text}

        onChange={(e)=>
          setText(
            e.target.value
          )
        }

        style={{
          width:"100%",
          height:"300px",
          padding:"15px",
          borderRadius:"12px",
          marginTop:"20px",
          border:"none"
        }}

      />

      <button

        onClick={createBatch}

        style={{
          width:"100%",
          padding:"15px",
          borderRadius:"12px",
          marginTop:"20px",
          border:"none",
          background:"red",
          color:"#fff",
          fontSize:"18px",
          cursor:"pointer"
        }}

      >

        Create Batch 😄🔥

      </button>

    </div>

  );

}

export default Update;
