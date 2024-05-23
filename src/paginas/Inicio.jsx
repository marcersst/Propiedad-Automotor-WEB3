import { dni, documento, transferir } from "../assets";

export const Inicio = () => {
  return (
    <div className="container flex flex-col items-center px-4 py-8 mx-auto text-center">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-black sm:text-5xl">Bienvenido al Registro Automotor</h1>
        <p className="px-8 mt-8 text-4xl text-black">
          Regulamos todo lo relacionado con la propiedad del automotor y los créditos prendarios, y organizamos el funcionamiento de los Registros Seccionales de todo el País.
        </p>
      </div>
      <div className="container mx-auto grid justify-center gap-5 sm:grid-cols-2 lg:grid-cols-3 animate__animated animate__bounceIn">
        <div className="flex flex-col items-center p-16 rounded-lg bg-gray-200">
          <h3 className="my-3 text-4xl font-semibold">Identifícate</h3>
          <div className="flex flex-col items-center space-y-1 leading-tight">
            <p>Primero asocia tu DNI con tu Wallet.</p>
            <br/>
            <img src={dni} alt="dni" className="mx-auto" />
          </div>
        </div>
        <div className="flex flex-col items-center p-16 rounded-lg bg-gray-200">
          <h3 className="my-3 text-4xl font-semibold">Registro</h3>
          <div className="flex flex-col items-center space-y-1 leading-tight">
            <p>Ahora registra tu auto.</p>
            <br/>
            <img src={documento} alt="doc" className="mx-auto" />
          </div>
        </div>
        <div className="flex flex-col items-center p-16 rounded-lg bg-gray-200">
          <h3 className="my-3 text-4xl font-semibold">Transferir</h3>
          <div className="flex flex-col items-center space-y-2 leading-tight">
            <p>Ya puedes transferir tu vehículo.</p>
            <br/>
            <img src={transferir} alt="tr" className="mx-auto" />
          </div>
        </div>
      </div>
    </div>
  );
}
