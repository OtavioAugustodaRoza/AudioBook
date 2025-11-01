import { useEffect, useRef, useState } from "react";
import {
  FaPlay,
  FaPause,
  FaForward,
  FaBackward,
  FaRedoAlt,
  FaHeart,
  FaRegHeart,
  FaMusic,
  FaVolumeMute,
} from "react-icons/fa";

function Player() {
  const audioRef = useRef(null);
  const [musica, setMusica] = useState(0);
  const [tocando, setTocando] = useState(false);
  const [repetir, setRepetir] = useState(false);
  const [tempoAtual, setTempoAtual] = useState(0);
  const [volume, setVolume] = useState(0.5);

  const [songs, setSongs] = useState([
    {
      name: "Borderline",
      src: "/music/musica1.mp3",
      autor: "Tame Impala",
      img: "/music/bordeline.jpeg",
      like: false,
    },
    {
      name: "Música 2",
      src: "/music/musica4.mp3",
      autor: "Artista B",
      img: "https://picsum.photos/300?random=2",
      like: false,
    },
    {
      name: "Música 3",
      src: "/music/musica2.mp3",
      autor: "Artista C",
      img: "https://picsum.photos/300?random=3",
      like: false,
    },
    {
      name: "Música 4",
      src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
      autor: "Artista D",
      img: "https://picsum.photos/300?random=4",
      like: false,
    },
    {
      name: "Música 5",
      src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
      autor: "Artista E",
      img: "https://picsum.photos/300?random=5",
      like: false,
    },
  ]);

  const atual = songs[musica];

  useEffect(() => {
    const likesArray = songs.map((song) => song.like);
    localStorage.setItem("likes", JSON.stringify(likesArray));
  }, [songs]);

  function tocarOuPausar() {
    const audio = audioRef.current;
    if (!audio) return;

    if (!tocando) {
      audio.play();
      setTocando(true);
    } else {
      audio.pause();
      setTocando(false);
    }
  }

  function proxima() {
    setMusica((prev) => (prev < songs.length - 1 ? prev + 1 : 0));
    setTocando(false);
    audioRef.current.pause();
  }

  function anterior() {
    setMusica((prev) => (prev > 0 ? prev - 1 : songs.length - 1));
    setTocando(false);
    audioRef.current.pause();
  }

  function repetirMusica() {
    setRepetir((prev) => !prev);
  }

  function gostei() {
    const novaLista = songs.map((song, index) =>
      index === musica ? { ...song, like: !song.like } : song
    );
    setSongs(novaLista);
  }

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const atualizarTempo = () => setTempoAtual(audio.currentTime);
    audio.addEventListener("timeupdate", atualizarTempo);
    return () => audio.removeEventListener("timeupdate", atualizarTempo);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const aoTerminar = () => {
      if (repetir) {
        audio.currentTime = 0;
        audio.play();
      } else {
        proxima();
        setTocando(true);
        setTimeout(() => audio.play(), 150);
      }
    };

    audio.addEventListener("ended", aoTerminar);
    return () => audio.removeEventListener("ended", aoTerminar);
  }, [musica, repetir]);

  return (
    <div className="flex flex-col gap-6 justify-center items-center flex-1 text-center p-4 sm:p-8">
      
      <img
        src={atual.img}
        alt={atual.name}
        className="w-48 h-48 sm:w-72 sm:h-72 rounded-xl shadow-lg object-cover"
      />

      <div className="flex flex-col sm:flex-row items-center justify-between w-full max-w-md gap-4 sm:gap-0 px-4 sm:px-6">
     
        <div
          className="cursor-pointer hover:text-[#a044ff] transition-colors duration-300"
          onClick={gostei}
        >
          {atual.like ? (
            <FaHeart className="text-3xl sm:text-4xl text-[#a044ff]" />
          ) : (
            <FaRegHeart className="text-3xl sm:text-4xl" />
          )}
        </div>

        <div className="flex flex-col items-center">
          <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[#6a3093] to-[#a044ff] bg-clip-text text-transparent">
            {atual.name}
          </h2>
          <h3 className="text-lg sm:text-2xl font-semibold bg-gradient-to-r from-[#6a3093] to-[#a044ff] bg-clip-text text-transparent">
            {atual.autor}
          </h3>
        </div>


        <div className="flex items-center gap-2 sm:gap-3">
          {volume > 0 ? (
            <FaMusic className="text-2xl sm:text-3xl text-[#a044ff]" />
          ) : (
            <FaVolumeMute className="text-2xl sm:text-3xl text-[#a044ff]" />
          )}
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => {
              const novoVolume = parseFloat(e.target.value);
              setVolume(novoVolume);
              if (audioRef.current) audioRef.current.volume = novoVolume;
            }}
            className="w-24 sm:w-28 accent-[#a044ff] cursor-pointer"
          />
        </div>
      </div>

     
      <div className="flex justify-center items-center w-full max-w-md px-4">
        <input
          type="range"
          className="w-full accent-[#a044ff] cursor-pointer"
          value={tempoAtual}
          max={audioRef.current?.duration || 0}
          onChange={(e) => {
            audioRef.current.currentTime = e.target.value;
            setTempoAtual(e.target.value);
          }}
        />
      </div>

      <div className="flex justify-center items-center gap-6 sm:gap-10">
        <FaBackward
          onClick={anterior}
          className="text-3xl sm:text-4xl hover:text-[#a044ff] transition duration-300 cursor-pointer active:scale-90"
        />

        {tocando ? (
          <FaPause
            onClick={tocarOuPausar}
            className="text-4xl sm:text-5xl hover:text-[#a044ff] transition duration-300 cursor-pointer active:scale-90"
          />
        ) : (
          <FaPlay
            onClick={tocarOuPausar}
            className="text-4xl sm:text-5xl hover:text-[#a044ff] transition duration-300 cursor-pointer active:scale-90"
          />
        )}

        <FaForward
          onClick={proxima}
          className="text-3xl sm:text-4xl hover:text-[#a044ff] transition duration-300 cursor-pointer active:scale-90"
        />

        <FaRedoAlt
          onClick={repetirMusica}
          className={`text-3xl sm:text-4xl cursor-pointer transition-colors duration-300 ${
            repetir ? "text-[#a044ff]" : "hover:text-[#a044ff]"
          }`}
        />
      </div>

      <audio ref={audioRef} src={atual.src}></audio>
    </div>
  );
}

export default Player;
