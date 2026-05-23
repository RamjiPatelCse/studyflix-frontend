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

    if (!file) {

      alert("Select TXT File 😄");
      return;

    }

    try {

      setLoading(true);

      const text =
      await file.text();

      const response =
      await axios.post(

        "https://studyflix-backend.onrender.com/api/upload",

        {

          batchName,

          thumbnail,

          text

        }

      );

      console.log(response.data);

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

        value={batchName}

        onChange={(e) =>
          setBatchName(
            e.target.value
          )
        }

        placeholder="Batch Name"

        style={{

          width:"100%",
          padding:"20px",
          borderRadius:"20px",
          border:"none",
          marginTop:"20px",
          fontSize:"18px"

        }}

      />

      <input

        value={thumbnail}

        onChange={(e) =>
          setThumbnail(
            e.target.value
          )
        }

        placeholder="Thumbnail URL"

        style={{

          width:"100%",
          padding:"20px",
          borderRadius:"20px",
          border:"none",
          marginTop:"20px",
          fontSize:"18px"

        }}

      />

      <input

        type="file"

        accept=".txt"

        onChange={(e) =>
          setFile(
            e.target.files[0]
          )
        }

        style={{

          marginTop:"30px",
          color:"#fff"

        }}

      />

      <button

        onClick={createBatch}

        style={{

          width:"100%",
          padding:"20px",
          borderRadius:"20px",
          border:"none",
          background:"red",
          color:"#fff",
          marginTop:"30px",
          fontSize:"20px",
          cursor:"pointer"

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
