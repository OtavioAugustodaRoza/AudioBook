import { useState, useEffect } from "react";
import { Home, Compass, Settings } from "lucide-react";
import { FaHeart } from "react-icons/fa";

function Nav() {
  const [active, setActive] = useState("home");
  const [Mode, setChangeMode] = useState(true); 

  function changeMode() {
    setChangeMode(!Mode);
  }

 
  useEffect(() => {
    if (Mode) {
      document.body.classList.add("dark-mode");
      document.body.classList.remove("light-mode");
    } else {
      document.body.classList.add("light-mode");
      document.body.classList.remove("dark-mode");
    }
  }, [Mode]);

  const navItems = [
    { name: "Home", icon: <Home size={24} />, key: "home" },
    { name: "Explore", icon: <Compass size={24} />, key: "explore" },
    { name: "Curtidas", icon: <FaHeart size={24} />, key: "create" },
  ];

  const bgColor = Mode ? "bg-gray-900 text-white" : "bg-gray-200 text-black";
  const hoverColor = Mode ? "hover:bg-gray-700" : "hover:bg-gray-300";
  const activeColor = Mode ? "bg-gray-700" : "bg-gray-300";

  return (
    <header
      className={`w-[250px] fixed left-0 top-0 min-h-screen flex flex-col gap-1 justify-around py-6 px-4 transition-colors duration-300 ${bgColor}`}
    >
      <div className="text-3xl font-bold mb-4 text-center">
        My<span className="text-blue-500">Player</span>
      </div>

      <nav className="flex flex-col gap-4">
        {navItems.map((item) => (
          <button
            key={item.key}
            onClick={() => setActive(item.key)}
            className={`flex items-center gap-3 px-3 py-2 rounded transition-colors duration-200 ${hoverColor} ${
              active === item.key ? activeColor : ""
            }`}
          >
            {item.icon}
            <span className="text-lg">{item.name}</span>
          </button>
        ))}
      </nav>

      <button
        onClick={changeMode}
        className={`flex items-center gap-3 px-3 py-2 rounded transition-colors duration-200 ${hoverColor}`}
      >
        <Settings size={24} />
        <span className="text-lg">
          {Mode ? "Modo Claro" : "Modo Escuro"}
        </span>
      </button>
    </header>
  );
}

export default Nav;
