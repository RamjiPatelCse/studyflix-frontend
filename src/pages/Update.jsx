import { useState } from "react";

function Update() {

  const [title, setTitle] =
  useState("");

  const [thumbnail, setThumbnail] =
  useState("");

  const [file, setFile] =
  useState(null);

  const [loading, setLoading] =
  useState(false);



  const createBatch =
  async () => {

    try {

      if (!title) {

        alert(
          "Enter Batch Title 😄"
        );

        return;

      }

      if (!thumbnail) {

        alert(
          "Enter Thumbnail URL 😄"
        );

        return;

      }

      if (!file) {

        alert(
          "Select TXT File 😄"
        );

        return;

      }



      setLoading(true);



      const text =
      await file.text();



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



      const oldBatches =
      JSON.parse(

        localStorage.getItem(
          "batches"
        ) || "[]"

      );



      const newBatch = {

        id:
        Date.now(),

        title,

        thumbnail,

        lectures

      };



      oldBatches.push(
        newBatch
      );



      localStorage.setItem(

        "batches",

        JSON.stringify(
          oldBatches
        )

      );



      alert(
        "Batch Created 😄🔥"
      );



      window.location.href =
      "/";

    }

    catch(err){

      console.log(err);

      alert(
        "Server Error 😅"
      );

    }



    setLoading(false);

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

        StudyFlix Update 😄🔥

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

          padding:"18px",

          borderRadius:"20px",

          border:"3px solid #333",

          marginBottom:"20px",

          fontSize:"20px"

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

          padding:"18px",

          borderRadius:"20px",

          border:"3px solid #333",

          marginBottom:"20px",

          fontSize:"20px"

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

          marginBottom:"20px",

          color:"#fff",

          fontSize:"18px"

        }}

      />



      <button

        onClick={createBatch}



        style={{

          width:"100%",

          padding:"20px",

          border:"none",

          borderRadius:"20px",

          background:"red",

          color:"#fff",

          fontSize:"22px",

          cursor:"pointer"

        }}

      >

        {

          loading
          ?
          "Creating..."
          :
          "Create Batch 😄🔥"

        }

      </button>

    </div>

  );

}



export default Update;
