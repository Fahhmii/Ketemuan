"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Pilihan = {
  id: string;
  label: string;
};

const PILIHAN_LAIN: Pilihan[] = [
  { id: "tidak", label: "Nggak Mau 🙅‍♀️" },
  { id: "lain", label: "Lain Kali 💁‍♀️" },
  { id: "sibuk", label: "Lagi Sibuk 🏃‍♀️" },
  { id: "boker", label: "Lagi Kerja 🚽" },
];

export default function Home() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [offsets, setOffsets] = useState<
    Record<string, { x: number; y: number }>
  >({});
  const [showLove, setShowLove] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const [showWaktu, setShowWaktu] = useState(false);
  const [selectedTime, setSelectedTime] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
    }
  }, []);

  const handleKabur = (id: string) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.random() * rect.width - rect.width / 2;
    const y = Math.random() * rect.height - rect.height / 2;

    setOffsets((prev) => ({ ...prev, [id]: { x, y } }));
    setTimeout(() => {
      setOffsets((prev) => ({ ...prev, [id]: { x: 0, y: 0 } }));
    }, 3000);
  };

  const handleMau = () => {
    setShowLove(true);
    setTimeout(() => {
      setShowWaktu(true);
    }, 1500);
  };

  const handlePilihWaktu = () => {
    if (!selectedTime) return;
    const nomor = "6283898165407"; // ganti nomor jika perlu
    const pesan = encodeURIComponent(
      `Hai, aku pilih ketemuan di kos jam ${selectedTime} ya! ❤️`
    );
    const link = `https://wa.me/${nomor}?text=${pesan}`;
    window.open(link, "_blank");
  };

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center bg-gradient-to-br from-sky-100 to-pink-200 p-4 text-center"
    >
      {/* Langit Dekorasi */}
      <div className="absolute top-10 right-10 w-24 h-24 rounded-full bg-yellow-300 animate-spin-slow z-0" />
      <div className="absolute top-20 left-[-100px] w-full flex gap-10 animate-clouds z-0">
        <div className="w-32 h-16 bg-white rounded-full opacity-70 blur-sm" />
        <div className="w-24 h-12 bg-white rounded-full opacity-60 blur-sm" />
        <div className="w-40 h-20 bg-white rounded-full opacity-50 blur-sm" />
      </div>

      <h1 className="text-3xl font-bold text-pink-700 mb-6 z-10">
        Sayangku Putri , mau ketemuan nggak ? 🥺
      </h1>

      {/* Tombol Pilihan */}
      <div className="flex flex-wrap justify-center gap-4 z-10">
        {PILIHAN_LAIN.map((p) => (
          <motion.button
            key={p.id}
            onClick={() => handleKabur(p.id)}
            animate={{
              x: offsets[p.id]?.x || 0,
              y: offsets[p.id]?.y || 0,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="px-6 py-3 rounded-2xl text-lg text-black bg-white shadow hover:bg-gray-200"
          >
            {p.label}
          </motion.button>
        ))}
      </div>

      {/* Tombol Mau */}
      <div className="z-20 mt-6">
        <button
          className="animate-bounce bg-pink-500 text-white px-6 py-3 rounded-2xl text-lg hover:bg-pink-600 transition-all duration-300"
          onClick={handleMau}
        >
          Mau ❤️
        </button>
      </div>

      {/* Efek & Amplop */}
      <AnimatePresence>
        {showLove && (
          <>
            {Array.from({ length: 30 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ y: -100, x: 0, opacity: 0.8 }}
                animate={{ y: "100vh", opacity: 0 }}
                transition={{
                  duration: 3 + Math.random(),
                  delay: i * 0.1,
                  repeat: Infinity,
                }}
                className="fixed top-0 left-0 text-pink-400 text-2xl select-none pointer-events-none z-0"
                style={{
                  left: `${Math.random() * windowWidth}px`,
                }}
              >
                💖
              </motion.div>
            ))}

            <motion.div
              initial={{ scale: 0 }}
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 2, -2, 0],
              }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-xl shadow-xl z-20 w-72"
            >
              <div className="text-4xl mb-2">💌</div>
              <p className="text-pink-700 font-medium">
                Makasih ya Sayangku Putri, udah mau ketemuan.
                <br />
                Aku tunggu, jangan lupa senyum ya 😊
              </p>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Input Waktu Ketemuan */}
      <AnimatePresence>
        {showWaktu && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-white shadow-xl rounded-2xl px-6 py-4 z-30"
          >
            <p className="text-pink-700 font-semibold mb-2">
              Pilih jam ketemuannya ya 😍
            </p>
            <input
              type="time"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="border border-pink-300 rounded-lg px-4 py-2 text-pink-700"
            />
            <button
              onClick={handlePilihWaktu}
              className="mt-3 bg-pink-500 text-white px-4 py-2 rounded-xl hover:bg-pink-600"
            >
              Kirim ke WhatsApp 💌
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tailwind Custom Animations */}
      <style jsx>{`
        .animate-spin-slow {
          animation: spin 20s linear infinite;
        }
        .animate-clouds {
          animation: clouds 60s linear infinite;
        }
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes clouds {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
}
