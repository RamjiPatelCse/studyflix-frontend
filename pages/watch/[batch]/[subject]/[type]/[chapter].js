import axios from "axios";
import { useEffect, useState } from "react";

const API = "https://studyflix-backend.onrender.com";

export default function WatchPage() {

  const [video, setVideo] = useState("");

  useEffect(() => {

    loadVideo();

  }, []);

  async function loadVideo() {

    try {

      const res = await axios.get(
        `${API}/api/play/1`
      );

      setVideo(res.data.url);

    } catch (err) {
      console.log(err);
    }

  }

  return (
    <div className="bg-black h-screen">

      {video && (

        <video
          src={video}
          controls
          autoPlay
          className="w-full h-full"
          onError={loadVideo}
        />

      )}

    </div>
  );
}
