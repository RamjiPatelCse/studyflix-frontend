import { useNavigate } from "react-router-dom";

function Dashboard() {

  const navigate = useNavigate();

  return (
    <div className="dashboard">

      <h1>StudyFlix Dashboard 😄</h1>

      <div className="card">

        <h2>Upload TXT File</h2>

        <br />

        <button className="upload-btn">
          Upload TXT
        </button>

      </div>

      <div className="card">

        <h2>Custom Player</h2>

        <br />

        <button
          className="upload-btn"
          onClick={() => navigate("/player")}
        >
          Open Player
        </button>

      </div>

    </div>
  );
}

export default Dashboard;
