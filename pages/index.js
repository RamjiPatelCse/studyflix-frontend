import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

const API =
"https://studyflix-backend.onrender.com";

export default function Home() {

  const [batches, setBatches] =
    useState([]);

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

  return (

    <div className="bg-black min-h-screen text-white">

      {/* TOP HEADER */}

      <div className="px-5 pt-6 flex items-center justify-between">

        <div className="flex items-center gap-4">

          <img
            src="https://i.ibb.co/cSzYznvY/file-00000000ae4071fab2fa429b25b81311.png"
            className="w-16 h-16 rounded-2xl shadow-[0_0_25px_rgba(168,85,247,0.6)]"
          />

          <div>

            <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-white via-purple-300 to-pink-500 bg-clip-text text-transparent">

              StudyFlix

            </h1>

            <p className="text-zinc-400 text-sm md:text-base">

              Learn Anytime 🚀

            </p>

          </div>

        </div>

        {/* SEARCH */}

        <div className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center text-2xl">

          🔍

        </div>

      </div>

      {/* HERO SECTION */}

      <div className="px-5 mt-8">

        <div className="relative rounded-[35px] overflow-hidden border border-purple-500/40 shadow-[0_0_50px_rgba(168,85,247,0.3)]">

          <img
            src="https://i.ibb.co/cSzYznvY/file-00000000ae4071fab2fa429b25b81311.png"
            className="w-full h-[260px] md:h-[450px] object-cover"
          />

          {/* OVERLAY */}

          <div className="absolute inset-0 bg-black/60"></div>

          {/* CONTENT */}

          <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-center">

            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight drop-shadow-lg">

              Learn <br />

              <span className="text-purple-400">

                Anytime 🚀

              </span>

            </h1>

            <p className="mt-4 text-zinc-200 text-lg md:text-2xl max-w-[500px] leading-relaxed">

              Premium Courses For Your Bright Future

            </p>

            {/* FEATURES */}

            <div className="flex gap-3 mt-6 flex-wrap">

              <div className="bg-black/60 border border-purple-500/30 px-4 py-2 rounded-full text-sm md:text-base">

                📺 Live Classes

              </div>

              <div className="bg-black/60 border border-cyan-500/30 px-4 py-2 rounded-full text-sm md:text-base">

                ▶ Recorded

              </div>

              <div className="bg-black/60 border border-pink-500/30 px-4 py-2 rounded-full text-sm md:text-base">

                📝 PYQs

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* TOP COURSES */}

      <div className="px-5 mt-10 flex items-center justify-between">

        <h2 className="text-3xl md:text-4xl font-bold">

          ✨ Our Top Courses

        </h2>

        <Link href="/courses">

          <button className="text-purple-400 text-lg font-bold hover:text-pink-400 transition-all">

            View All →

          </button>

        </Link>

      </div>

      {/* COURSE GRID */}

      <div className="px-5 py-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

        {

          batches.map((batch) => (

            <Link
              href={`/batch/${batch._id}`}
              key={batch._id}
            >

              <div className="bg-zinc-900 rounded-[35px] overflow-hidden border border-zinc-800 hover:border-purple-500 transition-all duration-300 shadow-xl hover:shadow-purple-500/30 cursor-pointer">

                {/* IMAGE */}

                <div className="relative">

                  <img
                    src={batch.thumbnail}
                    className="w-full h-64 md:h-72 object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>

                  {/* BADGE */}

                  <div className="absolute top-4 left-4 bg-gradient-to-r from-purple-600 to-pink-500 px-4 py-2 rounded-full font-bold shadow-lg">

                    🔥 Premium Batch

                  </div>

                </div>

                {/* CONTENT */}

                <div className="p-5">

                  <h2 className="text-3xl font-bold leading-tight">

                    {batch.title}

                  </h2>

                  <div className="mt-3 flex items-center gap-2 text-zinc-300 text-lg">

                    🎥 Live + Recorded + Notes

                  </div>

                  {/* BUTTON */}

                  <button className="mt-6 w-full bg-gradient-to-r from-purple-600 to-pink-500 py-4 rounded-2xl text-xl font-bold shadow-lg hover:scale-[1.02] transition-all duration-300">

                    Explore Now 🚀

                  </button>

                </div>

              </div>

            </Link>

          ))

        }

      </div>

      {/* FOOTER */}

      <div className="border-t border-zinc-800 py-8 text-center text-zinc-500 text-sm">

        © 2026 StudyFlix • Learn Anytime 🚀

      </div>

    </div>

  );

}
