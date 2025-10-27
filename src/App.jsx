import './App.css'
import Nav from './componets/nav'
import Player from "./componets/player";


function App() {
  return (
    <section  className="flex min-h-screen bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] text-white">
      <div className="w-64 p-4">
        <Nav />
      </div>
      <main className="flex-1 flex justify-center items-center">
        <Player />
      </main>
    </section>
  )
}

export default App
