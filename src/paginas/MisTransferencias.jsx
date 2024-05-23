import React, { useEffect, useState } from 'react';
import { transfer } from '../assets';
import { useContrato } from '../helpers/context';
import Swal from 'sweetalert2';

export const MisTransferencias = () => {
  const { account, contrato } = useContrato();

  const [formulario, setFormulario] = useState({
    dni: '',
    wallet: '',
    id: ''
  });

  const key= process.env.VITE_ALCHEMY

  const [autos, setAutos] = useState([]);

  const obtenernfts = async () => {    
    const options = { method: 'GET', headers: { accept: 'application/json' } };


    https://eth-sepolia.g.alchemy.com/nft/v3/gHUjX3o_G4MkNq7DherdCF6Zn_OuIYqR%7D/getNFTsForOwner?owner=0xad7aabe5f796b648965632ce9f65a27f4bec2d21&contractAddresses[]=0xb0263A941A29BE39E034D9a1898a8c7C3c1ecf48&withMetadata=true&pageSize=100
    fetch(`https://eth-sepolia.g.alchemy.com/nft/v3/${key}/getNFTsForOwner?owner=${account}&contractAddresses[]=0xb0263A941A29BE39E034D9a1898a8c7C3c1ecf48&withMetadata=true&pageSize=100`, options)
      .then(response => response.json())
      .then(response => {
        const nuevosAutos = response.ownedNfts.map(auto => ({
          nombre: auto.name,
          id: auto.tokenId
        }));
        setAutos(nuevosAutos);
      })
      .catch(err => {
        console.error(err);
      });
  };

  const transferir = async (e) => {
    e.preventDefault();
    if (!contrato || !account) {
      await Swal.fire({
        title: "No estás conectado!",
        icon: "error"
      });
      return;
    }
    Swal.fire({
      title: 'Transfiriendo Propiedad',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    try {
      const contract = contrato.contract;
      await contract._transferFrom(formulario.wallet, formulario.id, formulario.dni);
      Swal.fire("Transferencia realizada correctamente!", "", "success");
    } catch (error) {
      console.error(error.args);
      Swal.fire('Error', 'Hubo un problema al transferir la propiedad', 'error');
    }
  };

  useEffect(() => {
    if (account) {
      obtenernfts();
    }
  }, [account]);


  //funcion para manejar dinamicamente los cambios 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario(prevFormulario => ({
      ...prevFormulario,
      [name]: value
    }));
  };

  return (
    <div className="max-w-2xl lg:py-8 mx-auto animate__animated animate__fadeInDown px-4 sm:px-6 lg:px-8 mt-4">
      <div className="bg-gray-100 shadow-lg rounded-lg p-6">
        <div className="text-center">
          <div className="overflow-hidden inline-block w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64">
            <img src={transfer} alt="carga" className="object-cover h-full w-full" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 sm:text-4xl mt-4">
            Transferir Vehículo
          </h1>
        </div>

        <div className="mt-12">
          <form onSubmit={transferir}>
            <div className="grid gap-6 lg:gap-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
                <div>
                  <label className="block mb-2 text-sm text-gray-700 font-medium">
                    DNI del nuevo dueño*
                  </label>
                  <input
                    type="number"
                    name="dni"
                    id="dni"
                    value={formulario.dni}
                    required
                    onChange={handleChange}
                    className="py-3 px-4 block w-full border-gray-400 rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm text-gray-700 font-medium">
                    Seleccione Vehículo*
                  </label>
                  <select
                    name="id"
                    value={formulario.id}
                    required
                    onChange={handleChange}
                    className="py-3 px-4 block w-full border-gray-400 rounded-lg text-sm"
                  >
                    {autos.length > 0 ? (
                      autos.map((auto, index) => (
                        <option key={index} value={auto.id}>{auto.nombre}</option>
                      ))
                    ) : (
                      <option value="" disabled>No hay autos disponibles</option>
                    )}
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="wallet" className="block mb-2 text-sm text-gray-700 font-medium">
                  Wallet Destino*
                </label>
                <input
                  type="text"
                  name="wallet"
                  id="wallet"
                  value={formulario.wallet}
                  onChange={handleChange}
                  className="py-3 px-4 block w-full border-gray-400 rounded-lg text-sm"
                  required
                />
              </div>
            </div>
            <div className="mt-6 grid">
              <button
                type="submit"
                className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold"
              >
                Transferir
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
