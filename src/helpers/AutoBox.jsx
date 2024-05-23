export const Autobox = ({ modelo, año, patente, descripcion, imagen, marca }) => {
    return (
      <div className="relative flex flex-col items-center mt-4 animate__animated animate__bounceIn">
        <div className="mx-auto flex flex-col justify-center bg-white rounded-lg shadow-xl mb-4">
          <img className="w-full h-64 object-cover rounded-t-lg" src={imagen} alt={modelo} />
          <div className="p-4">
            <h1 className="text-blue-400 text-xl mb-2">{marca}</h1>
            <h1 className="text-2xl font-medium text-slate-800 mb-2">{modelo}</h1>
            <span className="text-lg text-blue-500">Patente: <span className="text-black">{patente}</span></span><br />
            <span className="text-lg text-blue-500">AÑO: <span className="text-black">{año}</span></span>
          </div>
        </div>
      </div>
    );
  }
  