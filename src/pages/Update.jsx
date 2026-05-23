import { useState } from "react";
import axios from "axios";

function Update() {

  const [batchName, setBatchName] =
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

      if (!file) {

        alert(
          "Select TXT File 😄"
        );

        return;

      }

      setLoading(true);

      const text =
      await file.text();

      const response =
      await axios.post(

        "https://studyflix-backend.onrender.com/api/upload",

        {

          batchName:
          batchName,

          thumbnail:
          thumbnail,

          text:
          text

        }

      );

      console.log(
        response.data
      );

      if (
        response.data.success
      ) {

        alert(
          "Batch Created 😄🔥"
        );

      } else {

        alert(
          "Create Error 😄"
        );

      }

    } catch (error) {

      console.log(error);

      alert(
        "Server Error 😄"
      );

    }

    setLoading(false);

  };

  return (

    <div
      style={{
        background:"#000",
        minHeight:"100vh",
        padding:"30px",
        color:"#fff"
      }}
    >

      <h1
        style={{
          color:"red"
        }}
      >
        StudyFlix Update 😄
      </h1>

      <input

        placeholder="Batch Name"

        value={batchName}

        onChange={(e)=>
          setBatchName(
            e.target.value
          )
        }

        style={{
          width:"100%",
          padding:"20px",
          borderRadius:"20px",
          marginTop:"20px"
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
          marginTop:"20px"
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
          marginTop:"20px"
        }}

      />

      <button

        onClick={createBatch}

        style={{
          width:"100%",
          padding:"20px",
          background:"red",
          color:"#fff",
          border:"none",
          borderRadius:"20px",
          marginTop:"30px"
        }}

      >

        {

          loading
          ?
          "Creating..."
          :
          "Create Batch"

        }

      </button>

    </div>

  );

}

export default Update;
