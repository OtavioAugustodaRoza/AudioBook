import { useEffect, useRef, useState } from 'react'
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
} from 'react-icons/fa'

function Player() {
  const audioRef = useRef(null)
  const [musica, setMusica] = useState(0)
  const [tocando, setTocando] = useState(false)
  const [repetir, setRepetir] = useState(false)
  const [tempoAtual, setTempoAtual] = useState(0)
  const [volume, setVolume] = useState(0.5)

  const [songs, setSongs] = useState([
    {
      name: 'Borderline',
      src: '/music/musica1.mp3',
      autor: 'Tame Impala',
      img: '/music/bordeline.jpeg',
      like: false,
    },
    {
      name: 'Música 2',
      src: '/music/musica4.mp3',
      autor: 'Artista B',
      img: 'https://picsum.photos/300?random=2',
      like: false,
    },
    {
      name: 'Música 3',
      src: '/music/musica2.mp3',
      autor: 'Artista C',
      img: 'https://picsum.photos/300?random=3',
      like: false,
    },
    {
      name: 'Música 4',
      src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
      autor: 'Artista D',
      img: 'https://picsum.photos/300?random=4',
      like: false,
    },
    {
      name: 'Música 5',
      src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
      autor: 'Artista E',
      img: 'https://picsum.photos/300?random=5',
      like: false,
    },
  ])

  const atual = songs[musica]

  useEffect(() => {
    const likesArray = songs.map(song => song.like)
    localStorage.setItem('likes', JSON.stringify(likesArray))
  }, [songs])

  function tocarOuPausar() {
    const audio = audioRef.current
    if (!audio) return

    if (!tocando) {
      audio.play()
      setTocando(true)
    } else {
      audio.pause()
      setTocando(false)
    }
  }

  function proxima() {
    setMusica(prev => (prev < songs.length - 1 ? prev + 1 : 0))
    setTocando(false)
    audioRef.current.pause()
  }

  function anterior() {
    setMusica(prev => (prev > 0 ? prev - 1 : songs.length - 1))
    setTocando(false)
    audioRef.current.pause()
  }

  function repetirMusica() {
    setRepetir(prev => !prev)
  }

  function gostei() {
    const novaLista = songs.map((song, index) =>
      index === musica ? { ...song, like: !song.like } : song
    )
    setSongs(novaLista)
  }

  function ajustarVolume() {
    setVolume(prevVolume => {
      const novoVolume = prevVolume + 0.1 <= 1 ? prevVolume + 0.1 : 0
      audioRef.current.volume = novoVolume
      return novoVolume
    })
  }

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const atualizarTempo = () => setTempoAtual(audio.currentTime)
    audio.addEventListener('timeupdate', atualizarTempo)
    return () => audio.removeEventListener('timeupdate', atualizarTempo)
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const aoTerminar = () => {
      if (repetir) {
        audio.currentTime = 0
        audio.play()
      } else {
        proxima()
        setTimeout(() => audio.play(), 150)
      }
    }

    audio.addEventListener('ended', aoTerminar)
    return () => audio.removeEventListener('ended', aoTerminar)
  }, [musica, repetir])

  return (
    <div className="flex flex-col gap-6 justify-center items-center flex-1">
      <img
        src={atual.img}
        alt={atual.name}
        className="w-72 h-72 rounded-lg shadow-lg"
      />

      <div className="flex justify-center items-center gap-10">
        <div
          className="transition-colors duration-300 cursor-pointer hover:text-[#a044ff]"
          onClick={gostei}
        >
          {atual.like ? (
            <FaHeart className="text-4xl text-[#a044ff]" />
          ) : (
            <FaRegHeart className="text-4xl" />
          )}
        </div>

        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r bg-clip-text text-transparent from-[#6a3093] to-[#a044ff]">
            {atual.name}
          </h2>
          <h3 className="text-2xl font-semibold bg-gradient-to-r bg-clip-text text-transparent from-[#6a3093] to-[#a044ff]">
            {atual.autor}
          </h3>
        </div>

        <div onClick={ajustarVolume}>
          {volume > 0 ? (
            <FaMusic className="text-4xl text-[#a044ff] cursor-pointer" />
          ) : (
            <FaVolumeMute className="text-4xl text-[#a044ff] cursor-pointer" />
          )}
        </div>
      </div>

      <div className="flex justify-center items-center w-3/4">
        <input
          type="range"
          className="w-full accent-[#a044ff]"
          value={tempoAtual}
          max={audioRef.current?.duration || 0}
          onChange={e => {
            audioRef.current.currentTime = e.target.value
            setTempoAtual(e.target.value)
          }}
        />
      </div>

      <div className="flex justify-center items-center gap-10">
        <FaBackward
          onClick={anterior}
          className="text-4xl transition-colors duration-300 hover:text-[#a044ff] cursor-pointer active:scale-90"
        />

        {tocando ? (
          <FaPause
            onClick={tocarOuPausar}
            className="text-5xl transition-colors duration-300 hover:text-[#a044ff] cursor-pointer active:scale-90"
          />
        ) : (
          <FaPlay
            onClick={tocarOuPausar}
            className="text-5xl transition-colors duration-300 hover:text-[#a044ff] cursor-pointer active:scale-90"
          />
        )}

        <FaForward
          onClick={proxima}
          className="text-4xl transition-colors duration-300 hover:text-[#a044ff] cursor-pointer active:scale-90"
        />

        <FaRedoAlt
          onClick={repetirMusica}
          className={`text-4xl cursor-pointer transition-colors duration-300 ${
            repetir ? 'text-[#a044ff]' : 'hover:text-[#a044ff]'
          }`}
        />
      </div>

      <audio ref={audioRef} src={atual.src}></audio>
    </div>
  )
}

export default Player;
