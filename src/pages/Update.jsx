import { useState } from "react";
import { useRouter } from "next/router";

export default function Update() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] =
    useState("");
  const [file, setFile] = useState(null);

  const createCourse = async () => {
    if (!title) {
      alert("Enter Title 😄");
      return;
    }

    if (!thumbnail) {
      alert("Enter Thumbnail 😄");
      return;
    }

    if (!file) {
      alert("Select TXT File 😄");
      return;
    }

    try {
      const text = await file.text();

      const lines = text
        .split("\n")
        .map((x) => x.trim())
        .filter(Boolean);

      let subjects = [];

      let currentSubject = null;
      let currentTopic = null;

      lines.forEach((line, index) => {
        // SUBJECT
        if (
          line.startsWith("(") &&
          !line.includes("Live") &&
          !line.includes("Recorded") &&
          !line.includes("🔴") &&
          !line.includes("✅")
        ) {
          currentSubject = {
            name: line.replace(/[()]/g, ""),
            topics: [],
          };

          subjects.push(currentSubject);
        }

        // TOPIC
        else if (
          line.startsWith("(") &&
          line.includes("✅")
        ) {
          currentTopic = {
            name: line.replace(/[()]/g, ""),
            lectures: [],
          };

          currentSubject?.topics.push(
            currentTopic
          );
        }

        // LECTURE
        else if (/^\d+\./.test(line)) {
          const lectureTitle = line;

          const nextLine =
            lines[index + 1];

          // PDF ignore
          if (
            nextLine &&
            nextLine.includes(".pdf")
          ) {
            return;
          }

          currentTopic?.lectures.push({
            title: lectureTitle,
            id: nextLine,
          });
        }
      });

      const oldCourses =
        JSON.parse(
          localStorage.getItem(
            "courses"
          ) || "[]"
        );

      const newCourse = {
        id: Date.now(),
        title,
        thumbnail,
        subjects,
      };

      oldCourses.push(newCourse);

      localStorage.setItem(
        "courses",
        JSON.stringify(oldCourses)
      );

      alert("Course Created 😄🔥");

      router.push("/");
    } catch (err) {
      console.log(err);

      alert("Create Error 😭");
    }
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
      <h1
        style={{
          fontSize: "45px",
          marginBottom: "30px",
        }}
      >
        Update Panel 😄🔥
      </h1>

      {/* Title */}
      <input
        placeholder="Course Title"
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
        style={{
          width: "100%",
          padding: "18px",
          borderRadius: "15px",
          border: "none",
          marginBottom: "20px",
          fontSize: "22px",
        }}
      />

      {/* Thumbnail */}
      <input
        placeholder="Thumbnail URL"
        value={thumbnail}
        onChange={(e) =>
          setThumbnail(e.target.value)
        }
        style={{
          width: "100%",
          padding: "18px",
          borderRadius: "15px",
          border: "none",
          marginBottom: "20px",
          fontSize: "22px",
        }}
      />

      {/* TXT */}
      <input
        type="file"
        accept=".txt"
        onChange={(e) =>
          setFile(e.target.files[0])
        }
        style={{
          marginBottom: "25px",
          fontSize: "20px",
        }}
      />

      {/* Button */}
      <button
        onClick={createCourse}
        style={{
          width: "100%",
          padding: "20px",
          background: "red",
          color: "#fff",
          border: "none",
          borderRadius: "15px",
          fontSize: "24px",
          fontWeight: "bold",
        }}
      >
        Create Course 😄🔥
      </button>
    </div>
  );
}
