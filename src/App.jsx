import { useState, useRef } from "react"; import { motion } from "framer-motion"; import avatar from "./assets/avatar.jpg"; import bgm from "./assets/bgm.mp3"; import bg from "./assets/cg.jpg";

export default function App() { const isMobile = window.innerWidth < 768; const [index, setIndex] = useState(0); const audioRef = useRef(null);

const lines = [ { name: "亚托莉", text: "……这里，是海边吗？" }, { name: "夏生", text: ".........." }, { name: "亚托莉", text: "今天也要一起创造新的回忆吗？" }, ];

const nextLine = () => { if (index < lines.length - 1) setIndex(index + 1); };

return ( <div className="w-screen h-screen overflow-hidden relative text-white"> <img src={bg} className="absolute inset-0 w-full h-full object-cover brightness-75" /> <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent" />

<motion.div
    initial={{ opacity: 0, y: -30 }}
    animate={{ opacity: 1, y: 0 }}
    className="absolute left-6 md:left-20 top-8 md:top-16 z-20 scale-75 md:scale-100 origin-top-left"
  >
    <h1 className="text-6xl font-bold drop-shadow-lg">ATRI</h1>
    <p className="text-xl opacity-90">My Dear Moments</p>
  </motion.div>

  <img
    src={avatar}
    className="absolute right-4 md:right-8 top-4 md:top-8 w-16 h-16 md:w-24 md:h-24 rounded-full border-4 border-white shadow-2xl z-20"
  />

  <div className="absolute left-6 md:left-28 top-44 md:top-64 z-20 flex flex-col gap-2 md:gap-3 scale-75 md:scale-100 origin-top-left">
    {["START", "LOAD", "SYSTEM", "EXTRA", "EXIT"].map((item) => (
      <button
        key={item}
        className="text-xl md:text-3xl text-left tracking-widest hover:translate-x-3 transition-all hover:text-sky-300"
      >
        {item}
      </button>
    ))}
  </div>

  <button
    onClick={() => audioRef.current?.play()}
    className="absolute right-4 md:right-8 bottom-32 md:bottom-40 z-30 bg-white/70 text-slate-800 px-3 md:px-4 py-2 rounded-xl shadow-xl text-sm md:text-base"
  >
    🎵 Play BGM
  </button>
  <audio ref={audioRef} loop>
    <source src={bgm} type="audio/mpeg" />
  </audio>

  <motion.div
    onClick={nextLine}
    whileHover={{ scale: 1.01 }}
    className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 w-[92%] md:w-[85%] max-w-5xl bg-white/85 text-slate-800 rounded-2xl p-4 md:p-6 shadow-2xl cursor-pointer z-30 text-sm md:text-base"
  >
    <div className="text-blue-600 font-bold mb-2">{lines[index].name}</div>
    <div className="leading-8">{lines[index].text}</div>
    <div className="text-xs opacity-60 mt-3">点击继续 ▶</div>
  </motion.div>

  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {Array.from({ length: 20 }).map((_, i) => (
      <motion.div
        key={i}
        initial={{ y: -50, x: Math.random() * 1500, opacity: 0.7 }}
        animate={{ y: 1000, rotate: 360 }}
        transition={{ repeat: Infinity, duration: 10 + Math.random() * 10 }}
        className="absolute w-3 h-3 bg-pink-200/60 rounded-full blur-sm"
      />
    ))}
  </div>
</div>

); }
