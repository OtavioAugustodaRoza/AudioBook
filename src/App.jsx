import { useRef, useState } from 'react'
import './App.css'
import { FaPlay, FaPause } from "react-icons/fa"

function App() {
  const AudioRef = useRef
  const [musica, SetMusica] = useState(0);
  const [tocando, SetTocando] = useState(false);
  
function Proxima() {
  if(musica < 10){
   SetMusica(musica+1)
  }else{
    SetMusica(1)
  }
return musica;
}
function anterior() {
  if(musica > 1 ){
    SetMusica(musica-1)
  }else{
    SetMusica(10)
  }
  return musica
}
function tocarOuPausar(){
  if(tocando === false){
    SetTocando(tocando = true);
    audio.play  
  } else{
    SetTocando(tocando = false)
    Audio.pause()
  }

    audio.play()
   
}


  return (



  )
}

export default App
