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

          const subjectMatch =
            videoSubject === currentSubject;

          const typeMatch =
            videoType.includes(currentType) ||
            currentType.includes(videoType);

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

      <div className="bg-black min-h-screen text-white flex items-center justify-center">

        <h1 className="text-3xl font-bold animate-pulse">

          Loading Lectures...

        </h1>

      </div>

    );

  }

  return (

    <div className="bg-black min-h-screen text-white p-5">

      {/* BACK BUTTON */}

      <Link
        href={`/chapter/${batch}/${subject}/${type}`}
      >

        <button className="px-6 py-4 rounded-2xl bg-zinc-900 text-white text-xl mb-10 hover:bg-zinc-800 transition-all">

          ← Back

        </button>

      </Link>

      {/* PAGE TITLE */}

      <div className="mb-10">

        <img
          src="https://i.ibb.co/cSzYznvY/file-00000000ae4071fab2fa429b25b81311.png"
          className="w-28 mb-5"
        />

        <h1 className="text-5xl font-bold leading-tight">

          {decodeURIComponent(chapter)}

        </h1>

        <p className="text-zinc-400 mt-3 text-lg">

          Premium StudyFlix Lectures 😄

        </p>

      </div>

      {

        videos.length === 0 ? (

          <div className="bg-zinc-900 rounded-3xl p-10 text-center border border-red-500">

            <h2 className="text-red-500 text-3xl font-bold">

              No Lectures Found 😭

            </h2>

          </div>

        ) : (

          <div className="grid gap-8">

            {

              videos.map((video, index) => (

                <Link
                  key={video._id}
                  href={`/watch/${batch}/${video._id}`}
                >

                  <div className="bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800 hover:border-purple-500 transition-all duration-300 shadow-xl hover:shadow-purple-500/30 cursor-pointer">

                    {/* THUMBNAIL */}

                    <div className="relative">

                      <img
                        src="https://i.ibb.co/cSzYznvY/file-00000000ae4071fab2fa429b25b81311.png"
                        className="w-full h-56 object-cover"
                      />

                      <div className="absolute inset-0 bg-black/40"></div>

                      <div className="absolute top-4 left-4 bg-purple-600 text-white px-4 py-2 rounded-full font-bold shadow-lg">

                        Lecture {index + 1}

                      </div>

                      <div className="absolute bottom-4 right-4 bg-black/70 px-4 py-2 rounded-full text-sm">

                        ▶ Watch Now

                      </div>

                    </div>

                    {/* CONTENT */}

                    <div className="p-5">

                      <h2 className="text-2xl font-bold leading-relaxed">

                        {video.title}

                      </h2>

                      <p className="text-zinc-400 mt-3">

                        {video.subject}

                      </p>

                    </div>

                  </div>

                </Link>

              ))

            }

          </div>

        )

      }

    </div>

  );

}
