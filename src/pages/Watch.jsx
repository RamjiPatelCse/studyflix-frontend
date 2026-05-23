import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Watch() {
  const router = useRouter();
  const { id } = router.query;

  const [videoUrl, setVideoUrl] = useState("");

  useEffect(() => {
    if (!id) return;

    async function loadVideo() {
      try {
        const res = await fetch(
          `https://ppx-d3d205f7.koyeb.app/lecture/${id}`
        );

        const data = await res.json();

        let finalUrl = "";

        // PDF ignore
        if (data.pdf_link) {
          console.log("PDF Ignored");
        }

        // Direct m3u8
        if (
          data.path &&
          data.path.includes(".m3u8")
        ) {
          finalUrl = data.path;
        }

        // Secure Player
        else if (
          data.video_player_url &&
          data.video_player_token
        ) {
          finalUrl =
            data.video_player_url +
            data.video_player_token;
        }

        setVideoUrl(finalUrl);
      } catch (err) {
        console.log(err);
      }
    }

    loadVideo();
  }, [id]);

  if (!videoUrl) {
    return (
      <div
        style={{
          background: "#000",
          color: "#fff",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "30px",
        }}
      >
        Loading Player 😄🔥
      </div>
    );
  }

  return (
    <div
      style={{
        background: "#000",
        height: "100vh",
      }}
    >
      <iframe
        src={videoUrl}
        width="100%"
        height="100%"
        allowFullScreen
        style={{
          border: "none",
        }}
      />
    </div>
  );
}
