// =====================================
// FILE:
// pages/lectures/[batch]/[subject]/[type]/[chapter].js
// =====================================

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ChapterPage() {

  // ROUTER
  const router = useRouter();

  // URL PARAMS
  const {
    batch,
    subject,
    type,
    chapter
  } = router.query;

  // LECTURES STATE
  const [lectures, setLectures] = useState([]);

  // LOADING
  const [loading, setLoading] = useState(true);

  // =========================
  // CLEAN TEXT FUNCTION
  // =========================

  const cleanText = (text) => {

    return decodeURIComponent(text || "")

      // REMOVE EMOJIS
      .replace(/🔴|✅|📚|🎯/g, "")

      // REMOVE EXTRA SPACES
      .replace(/\s+/g, " ")

      .trim()

      // LOWERCASE
      .toLowerCase();

  };

  // =========================
  // LOAD DATA
  // =========================

  useEffect(() => {

    // WAIT FOR ROUTER
    if(
      !batch ||
      !subject ||
      !type ||
      !chapter
    ) return;

    async function loadLectures(){

      try{

        // FETCH BATCHES
        const res = await fetch(

          `${process.env.NEXT_PUBLIC_API}/api/batches`

        );

        const data = await res.json();

        // FIND CURRENT BATCH
        const currentBatch = data.find(

          (b) => b._id === batch

        );

        if(!currentBatch){

          setLoading(false);
          return;

        }

        // =====================
        // FILTER LECTURES
        // =====================

        const filtered =

          currentBatch.videos.filter(

            (video) => {

              return (

                cleanText(video.subject) ===
                cleanText(subject)

                &&

                cleanText(video.type) ===
                cleanText(type)

                &&

                cleanText(video.chapter) ===
                cleanText(chapter)

              );

            }

          );

        // SAVE
        setLectures(filtered);

        setLoading(false);

      }

      catch(err){

        console.log(err);

        setLoading(false);

      }

    }

    loadLectures();

  }, [batch, subject, type, chapter]);

  // =========================
  // LOADING SCREEN
  // =========================

  if(loading){

    return(

      <div
        style={{
          background: "#000",
          color: "#fff",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "30px"
        }}
      >

        Loading...

      </div>

    );

  }

  // =========================
  // MAIN UI
  // =========================

  return(

    <div
      style={{
        background: "#000",
        minHeight: "100vh",
        padding: "20px",
        color: "#fff"
      }}
    >

      {/* ===================== */}
      {/* BACK BUTTON */}
      {/* ===================== */}

      <button

        onClick={() => router.back()}

        style={{

          padding: "12px 20px",

          borderRadius: "12px",

          border: "none",

          background: "#111",

          color: "#fff",

          marginBottom: "25px",

          fontSize: "18px",

          cursor: "pointer"

        }}
      >

        ← Back

      </button>

      {/* ===================== */}
      {/* TITLE */}
      {/* ===================== */}

      <h1
        style={{
          fontSize: "42px",
          marginBottom: "30px"
        }}
      >

        {decodeURIComponent(chapter || "")}

      </h1>

      {/* ===================== */}
      {/* NO LECTURES */}
      {/* ===================== */}

      {

        lectures.length === 0 && (

          <h2
            style={{
              color: "red"
            }}
          >

            No Lectures Found 😭

          </h2>

        )

      }

      {/* ===================== */}
      {/* LECTURES */}
      {/* ===================== */}

      {

        lectures.map((video, index) => (

          <div

            key={index}

            // =====================
            // IMPORTANT FIX 😄
            // VIDEO_ID SEND KARO
            // TITLE NAHI
            // =====================

            onClick={() =>

              router.push(

                `/watch/${batch}/${video._id}`

              )

            }

            style={{

              background: "#111",

              borderRadius: "20px",

              overflow: "hidden",

              marginBottom: "25px",

              cursor: "pointer"

            }}
          >

            {/* ================= */}
            {/* THUMBNAIL */}
            {/* ================= */}

            <img

              src="https://i.ibb.co/7tL5zQw/studyflix-thumb.jpg"

              alt="thumbnail"

              style={{

                width: "100%",

                height: "220px",

                objectFit: "cover"

              }}

            />

            {/* ================= */}
            {/* TITLE */}
            {/* ================= */}

            <div
              style={{
                padding: "20px"
              }}
            >

              <h2
                style={{
                  fontSize: "24px"
                }}
              >

                {video.title}

              </h2>

            </div>

          </div>

        ))

      }

    </div>

  );

      }
