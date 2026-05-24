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

  useEffect(() => {

    if(
      !batch ||
      !subject ||
      !type ||
      !chapter
    ) return;

    fetch(
      `${process.env.NEXT_PUBLIC_API}/api/batches`
    )
    .then(res => res.json())
    .then(data => {

      const currentBatch =
        data.find(
          b => b._id === batch
        );

      if(!currentBatch) return;

      const filtered =
        currentBatch.videos.filter(v =>

          v.subject === decodeURIComponent(subject) &&
          v.type === decodeURIComponent(type) &&
          v.chapter === decodeURIComponent(chapter)

        );

      setLectures(filtered);

    });

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
          marginBottom: "20px",
          background: "#111",
          color: "#fff",
          border: "none",
          padding: "10px 20px",
          borderRadius: "10px"
        }}
      >
        ← Back
      </button>

      <h1
        style={{
          marginBottom: "20px"
        }}
      >
        {decodeURIComponent(chapter || "")}
      </h1>

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

              padding: "20px",

              borderRadius: "20px",

              marginBottom: "20px",

              cursor: "pointer"

            }}
          >

            <img

              src="https://i.ibb.co/7tL5zQw/studyflix-thumb.jpg"

              style={{

                width: "100%",

                borderRadius: "15px",

                marginBottom: "10px"

              }}

            />

            <h2>

              {video.title}

            </h2>

          </div>

        ))

      }

    </div>

  );

}
