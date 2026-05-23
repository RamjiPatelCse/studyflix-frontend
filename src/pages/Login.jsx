import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const login = () => {
    navigate("/dashboard");
  };

  return (
    <div className="login-container">

      <div className="login-box">

        <h1 className="login-title">
          StudyFlix
        </h1>

        <input
          className="input-box"
          placeholder="Username"
        />

        <input
          className="input-box"
          type="password"
          placeholder="Password"
        />

        <button
          className="login-btn"
          onClick={login}
        >
          Login
        </button>

      </div>

    </div>
  );
}

export default Login;
