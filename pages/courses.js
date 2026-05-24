import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

const API =
"https://studyflix-backend.onrender.com";

export default function CoursesPage() {

  const [batches, setBatches] =
    useState([]);

  const [search, setSearch] =
    useState("");

  useEffect(() => {

    loadBatches();

  }, []);

  async function loadBatches() {

    try {

      const res =
        await axios.get(
          `${API}/api/batches`
        );

      setBatches(res.data);

    }

    catch (err) {

      console.log(err);

    }

  }

  const filtered =
    batches.filter((batch) =>
      batch.title
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  return (

    <div className="bg-black min-h-screen text-white p-5">

      {/* TOP */}

      <div className="flex items-center gap-4 mb-8">

        <img
          src="https://i.ibb.co/cSzYznvY/file-00000000ae4071fab2fa429b25b81311.png"
          className="w-16 h-16 rounded-2xl"
        />

        <div>

          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">

            All Courses

          </h1>

          <p className="text-zinc-400 mt-1">

            Explore Premium Courses 🚀

          </p>

        </div>

      </div>

      {/* SEARCH */}

      <div className="mb-8">

        <input
          type="text"
          placeholder="Search Courses..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-full bg-zinc-900 border border-zinc-700 rounded-2xl px-5 py-4 outline-none text-lg focus:border-purple-500"
        />

      </div>

      {/* CATEGORY */}

      <div className="flex gap-3 overflow-auto mb-8 pb-2">

        <div className="bg-purple-600 px-5 py-2 rounded-full whitespace-nowrap">

          🔥 Popular

        </div>

        <div className="bg-zinc-900 px-5 py-2 rounded-full whitespace-nowrap">

          📺 Live

        </div>

        <div className="bg-zinc-900 px-5 py-2 rounded-full whitespace-nowrap">

          ▶ Recorded

        </div>

        <div className="bg-zinc-900 px-5 py-2 rounded-full whitespace-nowrap">

          📝 Notes

        </div>

      </div>

      {/* COURSES */}

      <div className="grid gap-8">

        {

          filtered.map((batch) => (

            <Link
              key={batch._id}
              href={`/batch/${batch._id}`}
            >

              <div className="bg-zinc-900 rounded-[35px] overflow-hidden border border-zinc-800 hover:border-purple-500 transition-all duration-300 shadow-xl hover:shadow-purple-500/30">

                {/* IMAGE */}

                <div className="relative">

                  <img
                    src={batch.thumbnail}
                    className="w-full h-60 object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>

                  <div className="absolute top-4 left-4 bg-purple-600 px-4 py-2 rounded-full font-bold shadow-lg">

                    🔥 Premium

                  </div>

                </div>

                {/* CONTENT */}

                <div className="p-5">

                  <h2 className="text-3xl font-bold leading-tight">

                    {batch.title}

                  </h2>

                  <p className="text-zinc-400 mt-3 text-lg">

                    Live + Recorded + Notes

                  </p>

                  <button className="mt-6 w-full bg-gradient-to-r from-purple-600 to-pink-500 py-4 rounded-2xl text-xl font-bold shadow-lg">

                    Explore Now 🚀

                  </button>

                </div>

              </div>

            </Link>

          ))

        }

      </div>

    </div>

  );

                      }
