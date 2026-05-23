import { useState } from "react";

function Update() {

  const [title, setTitle] = useState("");

  const [thumbnail, setThumbnail] =
  useState("");

  const [file, setFile] =
  useState(null);



  const createBatch = async () => {

    try {

      if (!title) {

        alert("Enter Batch Title 😄");

        return;

      }

      if (!thumbnail) {

        alert("Enter Thumbnail URL 😄");

        return;

      }

      if (!file) {

        alert("Select TXT File 😄");

        return;

      }



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



        if (parts.length >= 2) {

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

          method: "POST",

          headers: {

            "Content-Type":
            "application/json"

          },

          body: JSON.stringify({

            title,

            thumbnail,

            lectures

          })

        }

      );



      const data =
      await res.json();



      if (data.success) {

        alert(
          "Batch Created 😄🔥"
        );



        setTitle("");

        setThumbnail("");

        setFile(null);

      }

      else {

        alert(
          "Create Error 😅"
        );

      }

    }

    catch (err) {

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

          color:"red",

          marginBottom:"20px"

        }}

      >

        StudyFlix Update 😄

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



      <textarea

        placeholder="Paste TXT Content"



        style={{

          width:"100%",

          height:"350px",

          padding:"20px",

          borderRadius:"20px",

          border:"3px solid #333",

          marginBottom:"20px",

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

        Create Batch 😄🔥

      </button>

    </div>

  );

}



export default Update;
