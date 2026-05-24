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

  function clean(text) {

    return decodeURIComponent(text || "")
      .replace(/🔴/g, "")
      .replace(/✅/g, "")
      .replace(/\s+/g, " ")
      .trim()
      .toLowerCase();

  }

  useEffect(() => {

    if(
      !batch ||
      !subject ||
      !type ||
      !chapter
    ) return;

    async function loadData() {

      try {

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API}/api/batches`
        );

        const data = await res.json();

        const currentBatch =
          data.find(b => b._id === batch);

        if(!currentBatch){

          setLectures([]);
          return;

        }

        const filtered =
          currentBatch.videos.filter(video => {

            return (

              clean(video.subject) === clean(subject)

              &&

              clean(video.type) === clean(type)

              &&

              clean(video.chapter) === clean(chapter)

            );

          });

        setLectures(filtered);

      }

      catch(err){

        console.log(err);

      }

    }

    loadData();

  }, [batch, subject, type, chapter]);

  return (

    <div
      style={{
        background: "#000",
        minHeight: "100vh",
        padding: "20px",
        color: "#fff"
      }}
    >

      <button

        onClick={() => router.back()}

        style={{
          padding: "12px 20px",
          borderRadius: "12px",
          border: "none",
          background: "#111",
          color: "#fff",
          marginBottom: "20px",
          fontSize: "18px"
        }}
      >

        ← Back

      </button>

      <h1
        style={{
          fontSize: "45px",
          marginBottom: "30px"
        }}
      >

        {decodeURIComponent(chapter || "")}

      </h1>

      {

        lectures.length === 0 ? (

          <h2
            style={{
              color: "red"
            }}
          >

            No Lectures Found 😭

          </h2>

        ) : (

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

                overflow: "hidden",

                marginBottom: "25px",

                cursor: "pointer"

              }}
            >

              <img

                src="https://i.ibb.co/7tL5zQw/studyflix-thumb.jpg"

                style={{

                  width: "100%",

                  height: "220px",

                  objectFit: "cover"

                }}

              />

              <div
                style={{
                  padding: "20px"
                }}
              >

                <h2
                  style={{
                    fontSize: "25px"
                  }}
                >

                  {video.title}

                </h2>

              </div>

            </div>

          ))

        )

      }

    </div>

  );

}
