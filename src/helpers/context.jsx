import React, { useState, createContext, useContext } from 'react';
import { ethers } from 'ethers';
import Swal from 'sweetalert2';
import abi from './abi.json';

const Context = createContext();

const ContratoProvider = ({ children }) => {
    const [contrato, setContrato] = useState(null);
    const [account, setAccount] = useState(null);


    const asociarDni = async () => {
        const contract = contrato.contract;
        const result = await contract.billeteraRegistrada(account)
        if(!result){
            Swal.fire({
              title: 'Ingrese su DNI para asociarlo con su Wallet',
              input: 'number',
              inputAttributes: {
                autocapitalize: 'off'
              },
              showCancelButton: true,
              confirmButtonText: 'Guardar',
              showLoaderOnConfirm: true,
              preConfirm: async (dni) => {
                if (!dni) {
                  Swal.showValidationMessage('Debe ingresar un DNI');
                  return;
                }
                try {
                  const resultado = await await contract.registrardni(dni);
                  return { dni, resultado };
                } catch (error) {
                  Swal.showValidationMessage(`Error: ${error.reason}`);
                  return;
                }
              }
            }).then((result) => {
              if (result.isConfirmed) {
                Swal.fire({
                  title: 'DNI Guardado',
                  text: `El DNI ${result.value.dni} ha sido guardado exitosamente`,
                  icon: 'success',
                  confirmButtonText: 'Aceptar'
                });
              }
            });
        }else{
                const dni = await contract.dnideWallet(account)
                Swal.fire(`Tu wallet esta registrado con el Dni: ${dni}`);
        }
      };

    const conectarContrato = async () => {
        try {
            const { ethereum } = window;
            if (!ethereum) {
                throw new Error('MetaMask no está instalado o no se detecta.');
            }

            const networkId = await ethereum.request({ method: 'eth_chainId' });
            const supportedNetwork = networkId === "0xaa36a7";
            if (!supportedNetwork) {
                Swal.fire("Por favor conectate a la red Sepolia!");
                return;
            }

            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            if (accounts.length === 0) {
                throw new Error('No se encontraron cuentas en MetaMask.');
            }
            setAccount(accounts[0]);

            const contractAddress = '0xb0263A941A29BE39E034D9a1898a8c7C3c1ecf48';
            const contractABI = abi;

            ethereum.on('accountsChanged', (newAccounts) => {
                if (newAccounts.length > 0) {
                    setAccount(newAccounts[0]);
                } else {
                    setAccount(null);
                }
            });

                const provider = new ethers.BrowserProvider(ethereum)
                const signer = await provider.getSigner();
                const contract = new ethers.Contract(contractAddress, contractABI, signer);

                setContrato({ provider, signer, contract });
                
                

        } catch (error) {
            Swal.fire('Error al conectar con MetaMask', error.message, 'error');
        }
    };

    return (
        <Context.Provider value={{ conectarContrato, account, contrato, asociarDni }}>
            {children}
        </Context.Provider>
    );
};

const useContrato = () => useContext(Context);

export { ContratoProvider, useContrato };
