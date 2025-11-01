import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./componets/nav";
import Home from "./componets/home";
import Player from "./componets/player";

export default function App() {
  const [Mode, setChangeMode] = useState(true);
  const bgColor = Mode ? "bg-gray-950 text-white" : "bg-gray-200 text-purple-900";

  return (
    <BrowserRouter>
      <div className={`flex flex-col md:flex-row min-h-screen ${bgColor}`}>
        <Nav Mode={Mode} setChangeMode={setChangeMode} />

        <main className="flex flex-1 justify-center items-center pb-16 md:pb-0">
          <Routes>
            <Route path="/" element={<Home Mode={Mode} setChangeMode={setChangeMode} />} />
            <Route path="/player" element={<Player Mode={Mode} setChangeMode={setChangeMode} />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}