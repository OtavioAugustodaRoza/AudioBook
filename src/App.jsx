import { useEffect, useRef, useState } from 'react'
import './App.css'
import {
  FaPlay,
  FaForward,
  FaBackward,
  FaRedoAlt,
  FaRandom,
  FaVolumeUp,
  FaVolumeMute,
  FaHeart,
  FaRegHeart,
  FaMusic,
} from 'react-icons/fa'

function App() {
  const audioRef = useRef(null)
  const [musica, SetMusica] = useState(0)
  const [tocando, SetTocando] = useState(false)
  const [repetir, SetRepetir] = useState(false)
  const [curtida, SetCurtida] = useState(false)
  const [tempoAtual, setTempoAtual] = useState(0)

  const song = [
    {
      name: 'Música 1',
      src: '/musicas/musica1.mp3',
      autor: 'Artista A',
      img: 'as',
    },
    {
      name: 'Música 2',
      src: '/musicas/musica2.mp3',
      autor: 'Artista B',
      img: 'as',
    },
    {
      name: 'Música 3',
      src: '/musicas/musica3.mp3',
      autor: 'Artista C',
      img: 'as',
    },
    {
      name: 'Música 4',
      src: '/musicas/musica4.mp3',
      autor: 'Artista D',
      img: 'as',
    },
    {
      name: 'Música 5',
      src: '/musicas/musica5.mp3',
      autor: 'Artista E',
      img: 'as',
    },
    {
      name: 'Música 6',
      src: '/musicas/musica6.mp3',
      autor: 'Artista F',
      img: 'as',
    },
    {
      name: 'Música 7',
      src: '/musicas/musica7.mp3',
      autor: 'Artista G',
      img: 'as',
    },
    {
      name: 'Música 7',
      src: '/musicas/musica7.mp3',
      autor: 'Artista G',
      img: 'as',
    },
  ]
  const atual = song[musica]

  function tocarOuPausar() {
    const audio = audioRef.current
    if (!tocando) {
      SetTocando(true)
      audio.play()
    } else {
      SetTocando(false)
      audio.pause()
    }
  }

  function Proxima() {
    if (musica < song.length - 1) {
      SetMusica(musica + 1)
    } else {
      SetMusica(0)
    }
    SetTocando(false)
  }

  function Anterior() {
    if (musica > 0) {
      SetMusica(musica - 1)
    } else {
      SetMusica(song.length - 1)
    }
    SetTocando(false)
  }
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    function aoTerminar() {
      Proxima()
      setTimeout(() => {
        audio.play()
      }, 100)
    }

    audio.addEventListener('ended', aoTerminar)

    return () => audio.removeEventListener('ended', aoTerminar)
  }, [musica])

  function Repetição() {
    if (repetir === false) {
      SetRepetir(true) 
  } else {
      SetRepetir(false)
    }
  }

  function gostei() {
    if (!curtida) {
      SetCurtida(true)
    } else {
      SetCurtida(false)
    }
  }
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    function aoTerminar() {
      if (repetir === true) {
        audio.currentTime = 0
        audio.play()
      } else {
        Proxima()
        setTimeout(() => {
          audio.play()
        }, 100)
      }
    }

    audio.addEventListener('ended', aoTerminar)
    return () => audio.removeEventListener('ended', aoTerminar)
  }, [musica, repetir])

  return (
    <section className="flex flex-col gap-6 justify-center items-center min-h-screen bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e]">
      <img
        src={atual.img}
        alt={atual.name}
        className="w-72 h-72 rounded-lg shadow-lg"
      />

      {/* titulo e outras coisa */}
      <div className="flex justify-center items-center gap-10">
        <div
          className="transition-colors duration-300 cursor-pointer hover:text-[#a044ff]"
          onClick={gostei}
        >
          {curtida ? <FaHeart className='text-4xl text-[#a044ff]'/> : <FaRegHeart className='text-4xl' />}
        </div>
        <div>
          <h2 className='text-3xl font-bold bg-gradient-to-r bg-clip-text text-transparent from-[#6a3093] to-[#a044ff]'>{atual.name}</h2>
          <h3 className='text-2xl font-semibold bg-gradient-to-r bg-clip-text text-transparent from-[#6a3093] to-[#a044ff]'>{atual.autor}</h3>
        </div>
        <div>
          <FaMusic className='text-4xl text-[#a044ff]'/>
        </div>
      </div>

      <div className="flex justify-center items-center">
        <input
          type="range"
          value={tempoAtual}
          max={audioRef.current?.duration || 0}
          onChange={(e) => {
            audioRef.current.currentTime = e.target.value
            setTempoAtual(e.target.value)
          }}
        />
      </div>

      {/* botoes */}
      <div className="flex justify-center items-center gap-10">
        <div onClick={Anterior}>
          <FaBackward className="text-4xl transition-colors duration-300 hover:text-[#a044ff] hover:active:scale-95" />
        </div>
        <div onClick={tocarOuPausar}>
          {!tocando ? (
            <FaPlay className="  text-4xl transition-colors duration-300 hover:text-[#a044ff] hover:active:scale-95" />
          ) : (
            <FaPause className="  text-4xl transition-colors duration-300 hover:text-[#a044ff] hover:active:scale-95" />
          )}
        </div>

        <div onClick={Proxima}>
          <FaForward className="text-4xl transition-colors duration-300 hover:text-[#a044ff] hover:active:scale-95" />
        </div>

        <div onClick={Repetição}>
          <FaRedoAlt className="text-4xl transition-colors duration-300 hover:text-[#a044ff] hover:active:scale-95" />
        </div>
      </div>
    </section>
  )
}

export default App
