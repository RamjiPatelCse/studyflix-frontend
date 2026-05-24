import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ChapterPage() {

  const router = useRouter();

  const {
    batch,
    subject,
    type,
    chapter
  } = router.query;

  const [lectures, setLectures] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    if(
      !batch ||
      !subject ||
      !type ||
      !chapter
    ) return;

    async function loadLectures() {

      try {

        const res = await fetch(

          `${process.env.NEXT_PUBLIC_API}/api/batches`

        );

        const data = await res.json();

        const currentBatch = data.find(

          b => b._id === batch

        );

        if(!currentBatch){

          setLoading(false);
          return;

        }

        const filtered =
          currentBatch.videos.filter(v =>

            v.subject?.trim().toLowerCase() ===
            decodeURIComponent(subject)
            .trim()
            .toLowerCase()

            &&

            v.type?.trim().toLowerCase() ===
            decodeURIComponent(type)
            .trim()
            .toLowerCase()

            &&

            v.chapter?.trim().toLowerCase() ===
            decodeURIComponent(chapter)
            .trim()
            .toLowerCase()

          );

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

  if(loading){

    return (

      <div
        style={{
          background: "#000",
          minHeight: "100vh",
          color: "#fff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "25px"
        }}
      >
        Loading...
      </div>

    );

  }

  return (

    <div
      style={{
        background: "#000",
        minHeight: "100vh",
        padding: "20px",
        color: "#fff"
      }}
    >

      {/* TOP BUTTONS */}

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px"
        }}
      >

        <button

          onClick={() => router.back()}

          style={{

            background: "#111",

            color: "#fff",

            border: "none",

            padding: "12px 20px",

            borderRadius: "12px",

            fontSize: "18px"

          }}
        >

          ← Back

        </button>

        <button

          onClick={() => router.push("/")}

          style={{

            background: "#111",

            color: "#fff",

            border: "none",

            padding: "12px 20px",

            borderRadius: "12px",

            fontSize: "18px"

          }}
        >

          🏠 Home

        </button>

      </div>

      {/* TITLE */}

      <h1
        style={{
          marginBottom: "25px",
          fontSize: "42px"
        }}
      >

        {decodeURIComponent(chapter || "")}

      </h1>

      {/* EMPTY */}

      {

        lectures.length === 0 && (

          <div
            style={{
              textAlign: "center",
              marginTop: "100px",
              color: "#888",
              fontSize: "22px"
            }}
          >

            No Lectures Found 😭

          </div>

        )

      }

      {/* LECTURES */}

      {

        lectures.map((video, index) => (

          <div

            key={index}

            onClick={() =>

              router.push(

                `/watch/${batch}/${video._id}`

              )

            }

            style={{

              background: "#111",

              borderRadius: "20px",

              marginBottom: "25px",

              overflow: "hidden",

              cursor: "pointer"

            }}
          >

            <img

              src="https://i.ibb.co/7tL5zQw/studyflix-thumb.jpg"

              alt="thumbnail"

              style={{

                width: "100%",

                height: "220px",

                objectFit: "cover"

              }}

            />

            <div
              style={{
                padding: "18px"
              }}
            >

              <h2
                style={{
                  fontSize: "24px",
                  lineHeight: "35px"
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
