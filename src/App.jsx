import { useState, useRef, useEffect } from "react";
import avatar from "./assets/avatar.jpg";
import bgm from "./assets/bgm.mp3";
import bg from "./assets/cg.jpg";

function App() {
  const [lineIndex, setLineIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState("menu"); // menu | start | continue | extra | system | trueEnd | exit
  const audioRef = useRef(null);

  const lines = [
    { name: "亚托莉", text: "……这里，是海边吗？" },
    { name: "夏生", text: "嗯，一个有点安静的地方。" },
    { name: "亚托莉", text: "海风很舒服呢。" },
    { name: "夏生", text: "欢迎来到我的主页。" },
    { name: "系统", text: "潮声轻轻响起，时间像慢了下来。" },
  ];

  useEffect(() => {
    audioRef.current?.play().catch(() => {});
  }, []);

  const nextLine = () => {
    if (lineIndex < lines.length - 1) setLineIndex(lineIndex + 1);
  };

  const menuItems = [
    { name: "TRUE END", key: "trueEnd" },
    { name: "CONTINUE", key: "continue" },
    { name: "START", key: "start" },
    { name: "LOAD", key: "load" },
    { name: "SYSTEM", key: "system" },
    { name: "EXTRA", key: "extra" },
    { name: "EXIT", key: "exit" },
  ];

  const renderContent = () => {
    switch (currentPage) {
      case "start":
        return (
          <div onClick={nextLine} style={dialogueStyle}>
            <div style={nameStyle}>{lines[lineIndex].name}</div>
            <div style={textStyle}>{lines[lineIndex].text}</div>
            <div style={hintStyle}>点击继续 ▶</div>
          </div>
        );
      case "continue":
        return <div style={placeholderStyle}>加载存档页面（CONTINUE）</div>;
      case "extra":
        return <div style={placeholderStyle}>CG / Extra 内容展示</div>;
      case "system":
        return <div style={placeholderStyle}>设置界面（SYSTEM）</div>;
      case "trueEnd":
        return <div style={placeholderStyle}>游戏真结局（TRUE END）</div>;
      case "exit":
        return <div style={placeholderStyle}>退出页面（EXIT）</div>;
      default:
        return <div style={placeholderStyle}>点击菜单选项查看内容</div>;
    }
  };

  return (
    <div style={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
      {/* 背景 */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.75) saturate(1.05)",
        }}
      />

      {/* 渐变遮罩 */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(0,20,40,0.65), transparent)",
        }}
      />

      {/* Logo */}
      <div
        style={{
          position: "fixed",
          left: "120px",
          top: "80px",
          color: "white",
          fontSize: "52px",
          fontWeight: "bold",
          textShadow: "0 4px 20px rgba(255,255,255,0.35)",
          zIndex: 20,
        }}
      >
        ATRI
        <div style={{ fontSize: "20px", opacity: 0.9 }}>
          - My Dear Moments -
        </div>
      </div>

      {/* Avatar */}
      <img
        src={avatar}
        alt="avatar"
        style={{
          position: "fixed",
          right: "40px",
          top: "30px",
          width: "90px",
          height: "90px",
          borderRadius: "50%",
          border: "3px solid white",
          boxShadow: "0 10px 30px rgba(0,0,0,.35)",
          zIndex: 20,
        }}
      />

      {/* 菜单 */}
      <div
        style={{
          position: "fixed",
          left: "140px",
          top: "300px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          zIndex: 20,
        }}
      >
        {menuItems.map((item) => (
          <button
            key={item.key}
            onClick={() => setCurrentPage(item.key)}
            style={{
              width: "240px",
              border: "none",
              background: "transparent",
              color: "#295ea8",
              fontSize: "28px",
              fontWeight: 600,
              letterSpacing: "2px",
              textAlign: "left",
              cursor: "pointer",
              textShadow: "0 0 8px rgba(255,255,255,0.7)",
            }}
          >
            {item.name}
          </button>
        ))}
      </div>

      {/* 音乐 */}
      <audio ref={audioRef} loop autoPlay>
        <source src={bgm} type="audio/mpeg" />
      </audio>

      {/* 内容区域 */}
      <div>{renderContent()}</div>
    </div>
  );
}

// 样式常量
const dialogueStyle = {
  position: "fixed",
  bottom: 20,
  left: "50%",
  transform: "translateX(-50%)",
  width: "80%",
  maxWidth: "900px",
  background: "rgba(255,255,255,.88)",
  padding: "18px",
  borderRadius: "16px",
  backdropFilter: "blur(8px)",
  boxShadow: "0 10px 30px rgba(0,0,0,.25)",
  cursor: "pointer",
  zIndex: 30,
};
const nameStyle = { fontWeight: "bold", color: "#2563eb", marginBottom: 8 };
const textStyle = { lineHeight: 1.7, fontSize: "16px" };
const hintStyle = { marginTop: 8, fontSize: 12, opacity: 0.6 };
const placeholderStyle = {
  position: "fixed",
  bottom: 20,
  left: "50%",
  transform: "translateX(-50%)",
  width: "80%",
  maxWidth: "900px",
  background: "rgba(255,255,255,.88)",
  padding: "18px",
  borderRadius: "16px",
  backdropFilter: "blur(8px)",
  boxShadow: "0 10px 30px rgba(0,0,0,.25)",
  zIndex: 30,
  textAlign: "center",
  fontSize: "18px",
  color: "#333",
};

export default App;
