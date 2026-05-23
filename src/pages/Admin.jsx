import { useNavigate } from "react-router-dom";

function Admin() {

  const navigate = useNavigate();

  const login = () => {
    navigate("/dashboard");
  };

  return (

    <div
      style={{
        height:"100vh",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        background:"#111"
      }}
    >

      <div
        style={{
          width:320,
          background:"#1b1b1b",
          padding:25,
          borderRadius:20
        }}
      >

        <h1
          style={{
            color:"red",
            marginBottom:20,
            textAlign:"center"
          }}
        >
          Admin Login
        </h1>

        <input
          placeholder="Username"
          style={{
            width:"100%",
            padding:14,
            marginBottom:15,
            borderRadius:10,
            border:"none"
          }}
        />

        <input
          type="password"
          placeholder="Password"
          style={{
            width:"100%",
            padding:14,
            marginBottom:15,
            borderRadius:10,
            border:"none"
          }}
        />

        <button
          onClick={login}
          style={{
            width:"100%",
            padding:14,
            background:"red",
            color:"white",
            border:"none",
            borderRadius:10
          }}
        >
          Login
        </button>

      </div>

    </div>
  );
}

export default Admin;
