import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Admin() {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const login = async () => {

    try {

      setLoading(true);

      const response = await axios.post(
        "https://studyflix-backend.onrender.com/api/login",
        {
          username,
          password
        }
      );

      localStorage.setItem(
        "token",
        response.data.token
      );

      alert("Login Success 😄");

      navigate("/dashboard");

    } catch (error) {

      alert("Invalid Username or Password");

    } finally {

      setLoading(false);

    }

  };

  return (

    <div
      style={{
        height:"100vh",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        background:"#111",
        padding:20
      }}
    >

      <div
        style={{
          width:"100%",
          maxWidth:350,
          background:"#1b1b1b",
          padding:25,
          borderRadius:20,
          boxShadow:"0 0 20px rgba(255,0,0,0.2)"
        }}
      >

        <h1
          style={{
            color:"red",
            marginBottom:25,
            textAlign:"center"
          }}
        >
          StudyFlix Admin
        </h1>

        <input
          value={username}
          onChange={(e)=>setUsername(e.target.value)}
          placeholder="Username"
          style={{
            width:"100%",
            padding:14,
            marginBottom:15,
            borderRadius:10,
            border:"none",
            background:"#2b2b2b",
            color:"white",
            outline:"none"
          }}
        />

        <input
          type="password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          placeholder="Password"
          style={{
            width:"100%",
            padding:14,
            marginBottom:20,
            borderRadius:10,
            border:"none",
            background:"#2b2b2b",
            color:"white",
            outline:"none"
          }}
        />

        <button
          onClick={login}
          style={{
            width:"100%",
            padding:14,
            border:"none",
            borderRadius:10,
            background:"red",
            color:"white",
            fontWeight:"bold",
            cursor:"pointer",
            fontSize:16
          }}
        >

          {
            loading
            ? "Please Wait..."
            : "Login"
          }

        </button>

      </div>

    </div>
  );
}

export default Admin;
