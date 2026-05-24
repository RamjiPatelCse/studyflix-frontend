import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

const API = "https://studyflix-backend.onrender.com";

export default function Home() {

  const [batches, setBatches] = useState([]);

  useEffect(() => {
    loadBatches();
  }, []);

  async function loadBatches() {

    try {

      const res = await axios.get(
        `${API}/api/batches`
      );

      setBatches(res.data);

    } catch (err) {

      console.log(err);

    }

  }

  return (

    <div className="min-h-screen bg-black text-white px-4 py-5">

      {/* HEADER */}

      <div className="flex items-center gap-4 mb-6">

        <img
          src="https://i.ibb.co/cSzYznvY/file-00000000ae4071fab2fa429b25b81311.png"
          className="
          w-16
          h-16
          rounded-2xl
          object-cover
          shadow-[0_0_25px_#9333ea]
          "
        />

        <div>

          <h1 className="
          text-4xl
          font-black
          tracking-wide
          bg-gradient-to-r
          from-white
          to-purple-500
          bg-clip-text
          text-transparent
          ">
            StudyFlix
          </h1>

          <p className="text-purple-400 text-sm">
            Learn Anytime 🚀
          </p>

        </div>

      </div>

      {/* HERO SECTION */}

      <div
        className="
        relative
        overflow-hidden
        rounded-[30px]
        mb-8
        border
        border-purple-700
        shadow-[0_0_40px_rgba(168,85,247,0.5)]
        "
      >

        <img
          src="https://i.ibb.co/cSzYznvY/file-00000000ae4071fab2fa429b25b81311.png"
          className="
          w-full
          h-[250px]
          object-cover
          brightness-50
          "
        />

        <div
          className="
          absolute
          top-0
          left-0
          w-full
          h-full
          flex
          flex-col
          justify-center
          px-6
          "
        >

          <h1 className="
          text-5xl
          font-black
          leading-tight
          mb-3
          ">
            Learn
            <br />
            Anytime 🚀
          </h1>

          <p className="
          text-zinc-300
          text-lg
          ">
            Premium Courses For Your Bright Future
          </p>

        </div>

      </div>

      {/* TITLE */}

      <div className="
      flex
      items-center
      justify-between
      mb-5
      ">

        <h2 className="
        text-2xl
        font-bold
        ">
          ✨ Our Top Courses
        </h2>

        <p className="
        text-purple-400
        font-semibold
        ">
          View All
        </p>

      </div>

      {/* COURSES */}

      <div
        className="
        grid
        grid-cols-1
        md:grid-cols-2
        gap-6
        pb-10
        "
      >

        {batches.map((batch) => (

          <Link
            href={`/batch/${batch._id}`}
            key={batch._id}
          >

            <div
              className="
              bg-zinc-950
              rounded-[28px]
              overflow-hidden
              border
              border-zinc-800
              shadow-[0_0_20px_rgba(0,0,0,0.6)]
              active:scale-95
              transition-all
              duration-300
              "
            >

              {/* THUMBNAIL */}

              <div className="relative">

                <img
                  src={batch.thumbnail}
                  className="
                  w-full
                  h-[260px]
                  object-cover
                  "
                />

                <div
                  className="
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-black
                  via-black/30
                  to-transparent
                  "
                />

                <div
                  className="
                  absolute
                  bottom-0
                  left-0
                  w-full
                  p-4
                  "
                >

                  <div className="
                  inline-block
                  px-3
                  py-1
                  rounded-full
                  bg-purple-600
                  text-sm
                  font-bold
                  mb-3
                  shadow-[0_0_15px_#9333ea]
                  ">
                    🔥 Premium Batch
                  </div>

                  <h2 className="
                  text-3xl
                  font-black
                  leading-tight
                  mb-2
                  ">
                    {batch.title}
                  </h2>

                  <p className="
                  text-purple-300
                  text-sm
                  ">
                    🎥 Live + Recorded + Notes
                  </p>

                </div>

              </div>

              {/* BUTTON */}

              <div className="p-4">

                <button
                  className="
                  w-full
                  py-3
                  rounded-2xl
                  text-lg
                  font-bold
                  bg-gradient-to-r
                  from-purple-600
                  to-pink-500
                  shadow-[0_0_20px_rgba(168,85,247,0.5)]
                  "
                >
                  Explore Now 🚀
                </button>

              </div>

            </div>

          </Link>

        ))}

      </div>

    </div>

  );

          }
