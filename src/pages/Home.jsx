import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const [batches, setBatches] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const data =
      JSON.parse(localStorage.getItem("studyflix_batches")) || [];

    setBatches(data);
  }, []);

  return (
    <div
      style={{
        background: "#000",
        minHeight: "100vh",
        padding: "20px",
        color: "#fff",
      }}
    >
      {/* Logo */}
      <h1
        style={{
          color: "red",
          fontSize: "60px",
          marginBottom: "30px",
          fontWeight: "bold",
        }}
      >
        StudyFlix 😄🔥
      </h1>

      {/* Empty */}
      {batches.length === 0 && (
        <div
          style={{
            textAlign: "center",
            marginTop: "100px",
            fontSize: "30px",
          }}
        >
          No Batch Found 😭
        </div>
      )}

      {/* Batch List */}
      {batches.map((batch, index) => (
        <div
          key={index}
          onClick={() =>
            router.push(`/course/${batch.id}`)
          }
          style={{
            background: "#111",
            borderRadius: "25px",
            overflow: "hidden",
            marginBottom: "30px",
            cursor: "pointer",
            border: "2px solid #222",
          }}
        >
          {/* Thumbnail */}
          <img
            src={batch.thumbnail}
            alt="thumb"
            style={{
              width: "100%",
              height: "320px",
              objectFit: "cover",
            }}
          />

          {/* Info */}
          <div
            style={{
              padding: "20px",
            }}
          >
            <h2
              style={{
                fontSize: "38px",
                lineHeight: "55px",
              }}
            >
              {batch.title}
            </h2>
          </div>
        </div>
      ))}
    </div>
  );
}
