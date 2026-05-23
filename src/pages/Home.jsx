import { useState } from "react";

function Home() {

  const [name, setName] = useState("");

  return (

    <div
      style={{
        minHeight:"100vh",
        background:"#111",
        color:"white",
        padding:20
      }}
    >

      <h1 style={{color:"red"}}>
        StudyFlix 😄
      </h1>

      <br/>

      <input
        placeholder="Enter Your Name"
        value={name}
        onChange={(e)=>setName(e.target.value)}
        style={{
          padding:14,
          width:"100%",
          borderRadius:10,
          border:"none",
          marginBottom:20
        }}
      />

      {
        name &&
        <h2>
          Welcome {name} 👋
        </h2>
      }

      <br/>

      <div
        style={{
          background:"#1b1b1b",
          padding:20,
          borderRadius:14,
          marginBottom:15
        }}
      >
        <img
          src="https://i.imgur.com/8Km9tLL.jpeg"
          style={{
            width:"100%",
            borderRadius:12
          }}
        />

        <br/><br/>

        <h2>Coding Python</h2>

      </div>

    </div>
  );
}

export default Home;
