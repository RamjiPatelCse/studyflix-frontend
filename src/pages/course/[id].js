import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function CoursePage() {
  const router = useRouter();
  const { id } = router.query;

  const [batch, setBatch] = useState(null);

  useEffect(() => {
    if (!id) return;

    const allBatches =
      JSON.parse(localStorage.getItem("studyflix_batches")) || [];

    const found = allBatches.find(
      (item) => item.id.toString() === id.toString()
    );

    if (found) {
      setBatch(found);
    }
  }, [id]);

  if (!batch) {
    return (
      <div
        style={{
          background: "#000",
          color: "#fff",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "25px",
        }}
      >
        Loading...
      </div>
    );
  }

  // TXT Parse
  const lines = batch.content
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const folders = {};

  lines.forEach((line) => {
    const matches = [...line.matchAll(/\((.*?)\)/g)].map(
      (m) => m[1]
    );

    if (matches.length < 3) return;

    const subject = matches[0];
    const type = matches[1];
    const chapter = matches[2];

    // Lecture Name
    let lectureName = line
      .replace(/\(.*?\)/g, "")
      .trim();

    // Remove extra :
    lectureName = lectureName.replace(":", "");

    // URL
    let url = "";

    if (line.includes("https")) {
      url = line.substring(line.indexOf("https"));

      // remove pdf
      url = url.split(".pdf")[0];
    }

    if (!folders[subject]) {
      folders[subject] = {};
    }

    if (!folders[subject][type]) {
      folders[subject][type] = {};
    }

    if (!folders[subject][type][chapter]) {
      folders[subject][type][chapter] = [];
    }

    folders[subject][type][chapter].push({
      title: lectureName,
      url,
    });
  });

  const openLecture = (url) => {
    if (!url) {
      alert("Video URL Not Found 😭");
      return;
    }

    router.push(
      `/watch?url=${encodeURIComponent(url)}`
    );
  };

  return (
    <div
      style={{
        background: "#000",
        minHeight: "100vh",
        padding: "20px",
        color: "#fff",
      }}
    >
      {/* Back */}
      <button
        onClick={() => router.back()}
        style={{
          background: "red",
          border: "none",
          color: "#fff",
          padding: "12px 20px",
          borderRadius: "15px",
          fontSize: "20px",
          marginBottom: "20px",
        }}
      >
        ← Back
      </button>

      {/* Title */}
      <h1
        style={{
          fontSize: "45px",
          marginBottom: "30px",
          fontWeight: "bold",
        }}
      >
        {batch.title}
      </h1>

      {/* Folder Structure */}
      {Object.keys(folders).map((subject, i) => (
        <details
          key={i}
          style={{
            marginBottom: "20px",
            background: "#111",
            padding: "15px",
            borderRadius: "20px",
          }}
        >
          <summary
            style={{
              fontSize: "35px",
              fontWeight: "bold",
              color: "yellow",
            }}
          >
            📚 {subject}
          </summary>

          {Object.keys(folders[subject]).map(
            (type, j) => (
              <details
                key={j}
                style={{
                  marginTop: "15px",
                  background: "#000",
                  padding: "15px",
                  borderRadius: "15px",
                }}
              >
                <summary
                  style={{
                    fontSize: "28px",
                    color: "cyan",
                    fontWeight: "bold",
                  }}
                >
                  📂 {type}
                </summary>

                {Object.keys(
                  folders[subject][type]
                ).map((chapter, k) => (
                  <details
                    key={k}
                    style={{
                      marginTop: "15px",
                      background: "#111",
                      padding: "15px",
                      borderRadius: "15px",
                    }}
                  >
                    <summary
                      style={{
                        fontSize: "25px",
                        color: "#fff",
                        fontWeight: "bold",
                      }}
                    >
                      📁 {chapter}
                    </summary>

                    {folders[subject][type][
                      chapter
                    ].map((lecture, l) => (
                      <div
                        key={l}
                        onClick={() =>
                          openLecture(lecture.url)
                        }
                        style={{
                          marginTop: "15px",
                          background: "#1d1d1d",
                          padding: "18px",
                          borderRadius: "15px",
                          fontSize: "22px",
                          cursor: "pointer",
                        }}
                      >
                        ▶ {lecture.title}
                      </div>
                    ))}
                  </details>
                ))}
              </details>
            )
          )}
        </details>
      ))}
    </div>
  );
}
