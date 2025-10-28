import foto from '../../public/otavioP.jpeg'

function Home({ Mode, setChangeMode }) {

    const borderColor = Mode ? "border-white" : "border-purple-500";
  
  return (
    <section className="flex flex-col gap-6 justify-center items-center">
      <div className="flex  justify-center items-center gap-7
      ">
        <h1 className="text-4xl mb-4 font-bold">dev do site</h1>
        <img src={foto} alt="dev Senior-no-auge-ksksksk"    className={`w-32 h-32 rounded-full shadow-lg border-4  object-cover hover:scale-105 transition-transform duration-300  ${borderColor} `} />
      </div>
      {/* seus curtidos aqui */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Seus Curtidos</h2>
        {/* cards de musicas curtidas */}
        <div></div>
      </div>

      {/* populares */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Populares</h2>
      </div>

      {/* generos musicais */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Gêneros Musicais</h2>
      </div>

      {/*phonk aura */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Phonk Aura</h2>
      </div>

      {/* artistas da galera */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Artistas da Galera</h2>
      </div>
    </section>
  )
}
export default Home
