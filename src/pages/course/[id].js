import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function CoursePage() {
  const router = useRouter();
  const { id } = router.query;

  const [course, setCourse] = useState(null);

  useEffect(() => {
    if (!id) return;

    const courses =
      JSON.parse(localStorage.getItem("courses")) || [];

    const found = courses.find(
      (item) => item.id == id
    );

    setCourse(found);
  }, [id]);

  if (!course) {
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
        Loading 😄
      </div>
    );
  }

  return (
    <div
      style={{
        background: "#000",
        minHeight: "100vh",
        padding: "20px",
        color: "#fff",
      }}
    >
      <button
        onClick={() => router.back()}
        style={{
          background: "red",
          color: "#fff",
          border: "none",
          padding: "12px 20px",
          borderRadius: "12px",
          fontSize: "20px",
          marginBottom: "20px",
        }}
      >
        ← Back
      </button>

      <h1
        style={{
          fontSize: "42px",
          marginBottom: "30px",
        }}
      >
        📚 {course.title}
      </h1>

      {course.subjects?.map((subject, i) => (
        <details
          key={i}
          style={{
            background: "#111",
            padding: "20px",
            borderRadius: "20px",
            marginBottom: "25px",
          }}
        >
          <summary
            style={{
              fontSize: "34px",
              color: "yellow",
            }}
          >
            📚 {subject.name}
          </summary>

          {/* LIVE */}
          <details
            style={{
              marginTop: "20px",
              background: "#1a1a1a",
              padding: "18px",
              borderRadius: "16px",
            }}
          >
            <summary
              style={{
                fontSize: "28px",
                color: "cyan",
              }}
            >
              📂 Live Class 🔴
            </summary>

            {subject.topics?.map((topic, idx) => (
              <details
                key={idx}
                style={{
                  marginTop: "20px",
                  background: "#222",
                  padding: "16px",
                  borderRadius: "16px",
                }}
              >
                <summary
                  style={{
                    fontSize: "24px",
                  }}
                >
                  📁 {topic.name}
                </summary>

                {topic.lectures?.map(
                  (lecture, lectureIndex) => (
                    <div
                      key={lectureIndex}
                      onClick={() =>
                        router.push(
                          `/watch?id=${lecture.id}`
                        )
                      }
                      style={{
                        background: "#333",
                        padding: "18px",
                        borderRadius: "14px",
                        marginTop: "15px",
                        fontSize: "22px",
                      }}
                    >
                      ▶ {lecture.title}
                    </div>
                  )
                )}
              </details>
            ))}
          </details>
        </details>
      ))}
    </div>
  );
}
