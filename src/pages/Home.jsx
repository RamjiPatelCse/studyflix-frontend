import { useEffect, useState } from "react";
import axios from "axios";

function Home() {

  const [batches, setBatches] = useState([]);

  useEffect(() => {

    getBatches();

  }, []);

  const getBatches = async () => {

    try {

      const response = await axios.get(
        "https://studyflix-backend.onrender.com/api/batches"
      );

      setBatches(response.data.batches);

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div
      style={{
        minHeight:"100vh",
        background:"#111",
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
        StudyFlix 😄
      </h1>

      {
        batches.map((batch) => (

          <div
            key={batch.id}
            style={{
              background:"#1b1b1b",
              padding:15,
              borderRadius:15,
              marginBottom:20
            }}
          >

            <img
              src={batch.thumbnail}
              alt=""
              style={{
                width:"100%",
                borderRadius:12,
                marginBottom:15
              }}
            />

            <h2>{batch.batchName}</h2>

            <p>
              Lectures: {batch.lectures.length}
            </p>

          </div>

        ))
      }

    </div>
  );
}

export default Home;
