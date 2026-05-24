import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const API = "https://studyflix-backend.onrender.com";

export default function BatchPage() {

  const router = useRouter();

  const { id } = router.query;

  const [subjects, setSubjects] = useState([]);

  useEffect(() => {

    if (id) {
      loadSubjects();
    }

  }, [id]);

  async function loadSubjects() {

    try {

      const res = await axios.get(
        `${API}/api/batches`
      );

      const batch = res.data.find(
        (b) => b._id === id
      );

      if (!batch) return;

      const unique = [
        ...new Set(
          batch.videos.map(
            (v) => v.subject
          )
        )
      ];

      setSubjects(unique);

    } catch (err) {
      console.log(err);
    }

  }

  return (
    <div className="p-5 bg-black min-h-screen text-white">

      <h1 className="text-3xl mb-5">
        Subjects
      </h1>

      <div className="grid gap-4">

        {subjects.map((subject) => (

          <Link
            key={subject}
            href={`/subject/${id}/${subject}`}
          >

            <div className="bg-zinc-900 p-5 rounded-xl">

              {subject}

            </div>

          </Link>

        ))}

      </div>

    </div>
  );
}
