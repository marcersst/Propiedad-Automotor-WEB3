import React, { useState } from 'react';
import { subir } from '../assets';
import Swal from 'sweetalert2';
import "animate.css";
import { subirImagen } from '../helpers/subirImagen';
import { subirJSON } from '../helpers/subirJSON';
import { useContrato } from '../helpers/context';

export const Registro = () => {
  const [metadata, setMetadata] = useState({
    marca: "",
    patente: '',
    año: "",
    modelo: "",
    descripcion: "",
  });
  const [imagen, setImagen] = useState(null);

  const { contrato, account, asociarDni } = useContrato();

  const SubirMetadatos = async (e) => {
    e.preventDefault();

    if (!contrato || !account) {
      await Swal.fire({
        title: "No Estas Conectado!",
        icon: "error"
      });
      return;
    }

    const result = await contrato.contract.billeteraRegistrada(account)
    if (!result) {
      await Swal.fire({
        title: "Problema de Registro",
        text: "Necesitas asociar tu DNI a tu Wallet",
        icon: "error"
      });
      asociarDni()
      return
    }
    Swal.fire({
      title: 'Creando NFT del Vehiculo',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    })

    try {
      const cidImagen = await subirImagen(imagen);
      const imageUrl = `https://ipfs.io/ipfs/${cidImagen}`;

      const metadataJSON = {
        name: metadata.modelo,
        description: metadata.descripcion,
        image: imageUrl,
        attributes: [
          {
            trait_type: "Patente",
            value: metadata.patente,
          },
          {
            trait_type: "Año",
            value: metadata.año,
          },
          {
            trait_type: "Marca",
            value: metadata.marca,
          }
        ]
      };

      const cidMetadata = await subirJSON(metadataJSON);
      console.log(`https://ipfs.io/ipfs/${cidMetadata}`, cidMetadata);

      const contract = contrato.contract;
      const dni = await contract.dnideWallet(account);
      console.log(dni);

      const id = await contract.safeMint(dni, `https://ipfs.io/ipfs/${cidMetadata}`);
      console.log(id);

      Swal.fire("Nft Creado Correctamente !", "", "success");

      setMetadata({
        marca: "",
        patente: "",
        año: "",
        modelo: "",
        descripcion: "",
      });
      setImagen(null);

    } catch (error) {
      console.error("Error al registrar:", error.reason);
      Swal.fire('Error', 'Hubo un problema al registrar el vehículo', 'error');
    }
  }

  const cargarImagen = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagen(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMetadata(prevMetadata => ({
      ...prevMetadata,
      [name]: value
    }));
  };

  return (
    <div className="bg-zinc-300 flex items-center justify-center px-10 py-10 animate__animated animate__fadeInDown">
      <div className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden">
        <div className="flex flex-col md:flex-row w-full">
          <div className="w-full md:w-1/2 bg-indigo-500 py-10 px-10 md:py-20 md:px-20 flex flex-col items-center">
            <div >
              {imagen ? (
                <div className="rounded-3xl bg-gray-300 p-2 overflow-hidden">
                  <img src={URL.createObjectURL(imagen)} alt="carga"  className='rounded-3xl'/>
                </div>
              ) : (
                <img src={subir} alt="carga" className="mx-auto max-w-full h-auto object-contain" />
              )}
            </div>
            <div className="input_field flex flex-col w-max mx-auto text-center mt-4">
              <label>
                <input className="text-sm cursor-pointer w-36 hidden"
                  type="file"
                  onChange={cargarImagen}
                />
                <div className="text bg-gray-200 text-black border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-green-200">{!imagen ? "Cargar foto" : "Cambiar Foto"}</div>
              </label>
            </div>
          </div>
          <div className="w-full md:w-1/2 py-10 px-10 md:py-20 md:px-20">
            <div className="text-center mb-10">
              <h1 className="font-bold text-4xl text-gray-900">Registro De Dominio</h1>
            </div>
            <form onSubmit={SubirMetadatos}>
              <div className="flex -mx-3">
                <div className="w-full px-3 mb-5">
                  <label className="text-xs font-semibold px-1">Modelo*</label>
                  <div className="flex">
                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                    </div>
                    <input
                      type="text"
                      name="modelo"
                      value={metadata.modelo}
                      required
                      onChange={handleChange}
                      className="w-full -ml-10 pl-10 pr-3 py-3 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>
              </div>
              <div className="flex -mx-3">
                <div className="w-1/2 px-3 mb-5">
                  <label className="text-xs font-semibold px-2">Marca*</label>
                  <div className="flex">
                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                    </div>
                    <input
                      type="text"
                      name="marca"
                      required
                      value={metadata.marca}
                      onChange={handleChange}
                      className="w-full -ml-10 pl-10 pr-3 py-3 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>
                <div className="w-1/2 px-3 mb-5">
                  <label className="text-xs font-semibold px-2">Año*</label>
                  <div className="flex">
                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                    </div>
                    <input
                      type="number"
                      name="año"
                      required
                      value={metadata.año}
                      onChange={handleChange}
                      className="w-full -ml-10 pl-10 pr-3 py-3 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>
                <div className="w-1/2 px-3 mb-5">
                  <label className="text-xs font-semibold px-1">Patente*</label>
                  <div className="flex">
                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                    </div>
                    <input
                      type="text"
                      name="patente"
                      required
                      value={metadata.patente}
                      onChange={handleChange}
                      className="w-full -ml-10 pl-10 pr-3 py-3 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>
              </div>
              <div className="flex -mx-3">
                <div className="w-full px-3 mb-12">
                  <label className="text-xs font-semibold px-1">Descripcion</label>
                  <div className="flex">
                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                    </div>
                    <textarea id="descripcion" rows="4" className="w-full -ml-10 pl-10 pr-3 py-3 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                      placeholder="Historia de Vehiculo"
                      name="descripcion"
                      value={metadata.descripcion}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="flex -mx-3">
                <div className="w-full px-3 mb-5">
                  <button type="submit" className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold">
                    Registrar
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

