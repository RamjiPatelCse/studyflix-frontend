import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const API = "https://studyflix-backend.onrender.com";

export default function SubjectPage() {

  const router = useRouter();

  const { batch, subject } = router.query;

  const [types, setTypes] = useState([]);

  useEffect(() => {

    if (batch) {
      loadTypes();
    }

  }, [batch]);

  async function loadTypes() {

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
          (v) => v.subject === subject
        );

      const unique = [
        ...new Set(
          filtered.map(
            (v) => v.type
          )
        )
      ];

      setTypes(unique);

    } catch (err) {
      console.log(err);
    }

  }

  return (
    <div className="p-5 bg-black min-h-screen text-white">

      <h1 className="text-3xl mb-5">
        {subject}
      </h1>

      <div className="grid gap-4">

        {types.map((type) => (

          <Link
            key={type}
            href={`/chapter/${batch}/${subject}/${type}`}
          >

            <div className="bg-zinc-900 p-5 rounded-xl">

              {type}

            </div>

          </Link>

        ))}

      </div>

    </div>
  );
}
