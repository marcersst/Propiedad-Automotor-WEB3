import { useContrato } from '../helpers/context';

export const SinAuto = () => {
  const { contrato } = useContrato();

  return (
    <div className="flex justify-center items-center mt-16 px-4 md:px-0">
      <div className="bg-white rounded-2xl shadow-xl shadow-slate-300/60 p-4 md:p-8">
        <h1 className="text-lg md:text-4xl font-bold text-center text-slate-600">
          {contrato ? "No hay vehículos disponibles" : "Conéctate para ver tus autos"}
        </h1>
      </div>
    </div>
  );
};
