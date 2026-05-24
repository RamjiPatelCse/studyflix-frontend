import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function ChapterPage() {

  const router = useRouter();

  const {
    batch,
    subject,
    type,
    chapter
  } = router.query;

  const [videos, setVideos] = useState([]);

  const [loading, setLoading] = useState(true);

  const BACKEND =
    "https://studyflix-backend.onrender.com";

  useEffect(() => {

    if (
      !batch ||
      !subject ||
      !type ||
      !chapter
    ) return;

    fetchVideos();

  }, [
    batch,
    subject,
    type,
    chapter
  ]);

  const normalize = (text = "") => {

    return decodeURIComponent(text)
      .replace(/🔴|✅|🟠/g, "")
      .replace(/\s+/g, " ")
      .trim()
      .toLowerCase();

  };

  async function fetchVideos() {

    try {

      setLoading(true);

      const res =
        await axios.get(
          `${BACKEND}/api/batches`
        );

      const batches = res.data;

      const currentBatch =
        batches.find(
          (b) => b._id === batch
        );

      if (!currentBatch) {

        setVideos([]);
        setLoading(false);
        return;

      }

      const currentSubject =
        normalize(subject);

      const currentType =
        normalize(type);

      const currentChapter =
        normalize(chapter);

      const filteredVideos =
        currentBatch.videos.filter((v) => {

          const videoSubject =
            normalize(v.subject);

          const videoType =
            normalize(v.type);

          const videoChapter =
            normalize(v.chapter);

          // subject exact
          const subjectMatch =
            videoSubject === currentSubject;

          // type flexible
          const typeMatch =
            videoType.includes(currentType) ||
            currentType.includes(videoType);

          // chapter flexible
          const chapterMatch =
            videoChapter === currentChapter ||
            videoChapter.includes(currentChapter) ||
            currentChapter.includes(videoChapter);

          return (
            subjectMatch &&
            typeMatch &&
            chapterMatch
          );

        });

      setVideos(filteredVideos);

      setLoading(false);

    }

    catch (err) {

      console.log(err);

      setVideos([]);

      setLoading(false);

    }

  }

  if (loading) {

    return (

      <div
        style={{
          background: "#000",
          minHeight: "100vh",
          color: "white",
          padding: 20
        }}
      >

        <h1>Loading...</h1>

      </div>

    );

  }

  return (

    <div
      style={{
        background: "#000",
        minHeight: "100vh",
        color: "white",
        padding: 20
      }}
    >

      <Link
        href={`/chapter/${batch}/${subject}/${type}`}
      >

        <button
          style={{
            padding: "14px 24px",
            borderRadius: 15,
            border: "none",
            background: "#111",
            color: "white",
            fontSize: 18,
            marginBottom: 30
          }}
        >
          ← Back
        </button>

      </Link>

      <h1
        style={{
          fontSize: 60,
          marginBottom: 40
        }}
      >
        {decodeURIComponent(chapter)}
      </h1>

      {

        videos.length === 0 ? (

          <h2
            style={{
              color: "red"
            }}
          >
            No Lectures Found 😭
          </h2>

        ) : (

          videos.map((video, index) => (

            <Link
              key={video._id}
              href={`/watch/${batch}/${video._id}`}
            >

              <div
                style={{
                  background: "#111",
                  padding: 20,
                  borderRadius: 20,
                  marginBottom: 20,
                  cursor: "pointer"
                }}
              >

                <h2
                  style={{
                    fontSize: 28
                  }}
                >
                  {index + 1}. {video.title}
                </h2>

              </div>

            </Link>

          ))

        )

      }

    </div>

  );

}
