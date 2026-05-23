import {
  useEffect,
  useState
}
from "react";

import axios from "axios";

function Update() {

  const [batchName, setBatchName] =
  useState("");

  const [thumbnail, setThumbnail] =
  useState("");

  const [file, setFile] =
  useState(null);

  const [batches, setBatches] =
  useState([]);

  useEffect(() => {

    getBatches();

  }, []);

  const getBatches =
  async () => {

    const response =
    await axios.get(

      "https://studyflix-backend.onrender.com/api/batches"

    );

    setBatches(
      response.data.batches
    );

  };

  const createBatch =
  async () => {

    try {

      const formData =
      new FormData();

      formData.append(
        "batchName",
        batchName
      );

      formData.append(
        "thumbnail",
        thumbnail
      );

      formData.append(
        "txt",
        file
      );

      await axios.post(

        "https://studyflix-backend.onrender.com/api/create-batch",

        formData

      );

      alert(
        "Batch Created 😄"
      );

      getBatches();

    } catch (error) {

      alert(
        "Create Error"
      );

    }

  };

  const deleteBatch =
  async (id) => {

    await axios.delete(

      `https://studyflix-backend.onrender.com/api/delete-batch/${id}`

    );

    getBatches();

  };

  return (

    <div
      style={{
        background:"#111",
        minHeight:"100vh",
        padding:20,
        color:"white"
      }}
    >

      <h1
        style={{
          color:"red",
          marginBottom:20
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
          padding:14,
          marginBottom:15,
          borderRadius:10,
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
          padding:14,
          marginBottom:15,
          borderRadius:10,
          border:"none"
        }}

      />

      <input

        type="file"

        onChange={(e)=>
          setFile(
            e.target.files[0]
          )
        }

        style={{
          marginBottom:20
        }}

      />

      <button

        onClick={createBatch}

        style={{
          width:"100%",
          padding:14,
          background:"red",
          color:"white",
          border:"none",
          borderRadius:10,
          fontWeight:"bold"
        }}

      >

        Create Batch

      </button>

      <br/><br/>

      {

        batches.map((batch) => (

          <div

            key={batch.id}

            style={{
              background:"#1b1b1b",
              padding:15,
              borderRadius:15,
              marginBottom:15
            }}
          >

            <h3>
              {batch.batchName}
            </h3>

            <button

              onClick={() =>
                deleteBatch(batch.id)
              }

              style={{
                marginTop:10,
                padding:10,
                background:"red",
                color:"white",
                border:"none",
                borderRadius:10
              }}

            >

              Delete Batch

            </button>

          </div>

        ))

      }

    </div>

  );

}

export default Update;
