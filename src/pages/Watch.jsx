import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Watch() {
  const router = useRouter();

  const { url } = router.query;

  const [videoUrl, setVideoUrl] = useState("");

  useEffect(() => {
    if (!url) return;

    try {
      let finalUrl = decodeURIComponent(url);

      // remove pdf
      finalUrl = finalUrl.split(".pdf")[0];

      // direct player fix
      if (finalUrl.includes("/play/")) {
        finalUrl = finalUrl;
      }

      setVideoUrl(finalUrl);
    } catch (err) {
      console.log(err);
    }
  }, [url]);

  if (!videoUrl) {
    return (
      <div
        style={{
          background: "#000",
          color: "#fff",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "30px",
        }}
      >
        Loading Video... 😄
      </div>
    );
  }

  return (
    <div
      style={{
        background: "#000",
        minHeight: "100vh",
        width: "100%",
      }}
    >
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        style={{
          position: "fixed",
          top: "20px",
          left: "20px",
          zIndex: 1000,
          background: "red",
          color: "#fff",
          border: "none",
          padding: "12px 22px",
          borderRadius: "15px",
          fontSize: "20px",
          fontWeight: "bold",
        }}
      >
        ← Back
      </button>

      {/* Video */}
      <iframe
        src={videoUrl}
        allowFullScreen
        allow="autoplay; encrypted-media"
        style={{
          width: "100%",
          height: "100vh",
          border: "none",
          background: "#000",
        }}
      />
    </div>
  );
}
