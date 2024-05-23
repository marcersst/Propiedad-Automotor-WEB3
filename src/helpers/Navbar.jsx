import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { registro1 } from "../assets";
import { useContrato } from './context';

export const Navbar = () => {
  const { conectarContrato, account, asociarDni } = useContrato();
  const [wallet, setWallet] = useState("");
  const [desplegar, setdesplegar] = useState(false);

  const Conectar2 = () => {
    if (account) {
      asociarDni();
    } else {
      conectarContrato();
    }
  };

  useEffect(() => {
    if (account) {
      const walletRecortada = `${account.substring(0, 6).toUpperCase()}...${account.substring(account.length - 4).toUpperCase()}`;
      setWallet(walletRecortada);
    }
  }, [account]);

  return (
    <>
      <nav className="hidden md:block bg-zinc-200 shadow shadow-gray-300">
        <div className="md:h-16 h-28 mx-auto md:px-4 container flex items-center justify-between flex-wrap md:flex-nowrap">
          <img src={registro1} alt="1" style={{ width: '100px', height: 'auto' }} />

          <div className="text-gray-500 w-full md:w-auto md:order-3 text-lg">
            <ul className="flex font-semibold justify-between">
              <li className="md:px-3 md:py-2">
                <NavLink
                  to="/"
                  className={({ isActive }) => (isActive ? "text-blue-500" : "text-gray-500")}
                >
                  Inicio
                </NavLink>
              </li>
              <li className="md:px-3 md:py-2">
                <NavLink
                  to="/registro"
                  className={({ isActive }) => (isActive ? "text-blue-500" : "text-gray-500")}
                >
                  Registro
                </NavLink>
              </li>
              <li className="md:px-3 md:py-2">
                <NavLink
                  to="/misautos"
                  className={({ isActive }) => (isActive ? "text-blue-500" : "text-gray-500")}
                >
                  Mis Autos
                </NavLink>
              </li>
              <li className="md:px-3 md:py-2">
                <NavLink
                  to="/mistransferencias"
                  className={({ isActive }) => (isActive ? "text-blue-500" : "text-gray-500")}
                >
                  Transferir
                </NavLink>
              </li>
            </ul>
          </div>

          <div className="order-2 md:order-3">
            <button
              className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-gray-50 rounded-xl flex items-center"
              onClick={Conectar2}
            >
              {!account ? "Conectar" : wallet}
            </button>
          </div>
        </div>
      </nav>


       <nav className="block md:hidden bg-zinc-200 shadow shadow-gray-300">
        <div className="h-16 mx-auto px-4 container flex items-center justify-between">
          <img src={registro1} alt="1" style={{ width: '100px', height: 'auto' }} />

          <button
            className="text-gray-500"
            onClick={() => setdesplegar(!desplegar)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
        {desplegar && (
          <div className="px-4 pb-4">
            <ul className="flex flex-col space-y-2">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) => (isActive ? "text-blue-500" : "text-gray-500")}
                >
                  Inicio
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/registro"
                  className={({ isActive }) => (isActive ? "text-blue-500" : "text-gray-500")}
                >
                  Registro
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/misautos"
                  className={({ isActive }) => (isActive ? "text-blue-500" : "text-gray-500")}
                >
                  Mis Autos
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/mistransferencias"
                  className={({ isActive }) => (isActive ? "text-blue-500" : "text-gray-500")}
                >
                  Transferir
                </NavLink>
              </li>
            </ul>
            <div className="mt-4">
              <button
                className="w-full px-6 py-3 bg-blue-500 hover:bg-blue-600 text-gray-50 rounded-xl"
                onClick={Conectar2}
              >
                {!account ? "Conectar" : wallet}
              </button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};
