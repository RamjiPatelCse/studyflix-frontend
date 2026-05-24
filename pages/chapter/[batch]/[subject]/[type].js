import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const API = "https://studyflix-backend.onrender.com";

export default function ChapterPage() {

  const router = useRouter();

  const {
    batch,
    subject,
    type
  } = router.query;

  const [chapters, setChapters] = useState([]);

  useEffect(() => {

    if (batch) {
      loadChapters();
    }

  }, [batch]);

  async function loadChapters() {

    try {

      const res = await axios.get(
        `${API}/api/batches`
      );

      const data = res.data.find(
        (b) => b._id === batch
      );

      if (!data) return;

      const filtered =
        data.videos.filter(
          (v) =>
            v.subject === subject &&
            v.type === type
        );

      const unique = [
        ...new Set(
          filtered.map(
            (v) => v.chapter
          )
        )
      ];

      setChapters(unique);

    } catch (err) {
      console.log(err);
    }

  }

  return (
    <div className="p-5 bg-black min-h-screen text-white">

      <h1 className="text-3xl mb-5">
        Chapters
      </h1>

      <div className="grid gap-4">

        {chapters.map((chapter) => (

          <Link
            key={chapter}
            href={`/watch/${batch}/${subject}/${type}/${chapter}`}
          >

            <div className="bg-zinc-900 p-5 rounded-xl">

              {chapter}

            </div>

          </Link>

        ))}

      </div>

    </div>
  );
}
