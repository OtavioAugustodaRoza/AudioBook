import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Home, Compass, Settings } from "lucide-react";
import { FaHeart } from "react-icons/fa";

function Nav({ Mode, setChangeMode }) {
  const [active, setActive] = useState("home");
  const navigate = useNavigate();

  function changeMode() {
    setChangeMode(!Mode);
  }

  const navItems = [
    { name: "Home", icon: <Home size={24} />, key: "home", path: "/" },
    { name: "Explore", icon: <Compass size={24} />, key: "explore", path: "/" },
    { name: "Curtidas", icon: <FaHeart size={24} />, key: "player", path: "/player" },
  ];

  const bgColor = Mode ? "bg-gray-950 text-white" : "bg-gray-200 text-purple-900";
  const hoverColor = Mode ? "hover:bg-gray-700" : "hover:bg-gray-300";
  const activeColor = Mode ? "bg-gray-700" : "bg-gray-300";
  const spanColor = Mode ? "text-purple-900 " : "text-black";
  const borderColor = Mode ? "border-gray-400" : "border-gray-900";

  return (
    <>
      {/* NAVIGATION DESKTOP */}
      <header
        className={`hidden md:flex w-[250px] fixed left-0 top-0 min-h-screen flex-col gap-1 justify-around py-6 px-4 transition-colors duration-300 border-r ${borderColor} ${bgColor}`}
      >
        <div className="text-3xl font-bold mb-4 text-center">
          My<span className={`${spanColor}`}>Player</span>
        </div>

        <nav className="flex flex-col gap-4">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => {
                setActive(item.key);
                navigate(item.path);
              }}
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
          <span className="text-lg">{Mode ? "Modo Claro" : "Modo Escuro"}</span>
        </button>
      </header>

      {/* NAVIGATION MOBILE */}
      <nav
        className={`md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center py-3 border-t ${borderColor} ${bgColor} z-50`}
      >
        {navItems.map((item) => (
          <button
            key={item.key}
            onClick={() => {
              setActive(item.key);
              navigate(item.path);
            }}
            className={`flex flex-col items-center justify-center transition-colors duration-200 ${hoverColor} ${
              active === item.key ? activeColor : ""
            } p-2 rounded-lg`}
          >
            {item.icon}
            <span className="text-sm mt-1">{item.name}</span>
          </button>
        ))}

        <button
          onClick={changeMode}
          className={`flex flex-col items-center justify-center transition-colors duration-200 ${hoverColor} p-2 rounded-lg`}
        >
          <Settings size={22} />
          <span className="text-sm mt-1">{Mode ? "Claro" : "Escuro"}</span>
        </button>
      </nav>
    </>
  );
}

export default Nav;
