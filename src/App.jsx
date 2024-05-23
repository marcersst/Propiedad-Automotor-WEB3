import { Route, Routes } from 'react-router-dom';
import './App.css'
import { Navbar } from './helpers/Navbar';
import { Inicio } from './paginas/Inicio';
import { MisAutos } from './paginas/MisAutos';
import { MisTransferencias } from './paginas/MisTransferencias';
import { Registro } from './paginas/Registro';



export const App = () => {
  return (
<div className="bg-zinc-300 min-h-screen">

           <Navbar />
          <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
            <Routes>
              <Route path="/" element={<Inicio />} />
              <Route path="/misautos" element={<MisAutos />} />
              <Route path="/mistransferencias" element={<MisTransferencias />} />
              <Route path="/registro" element={<Registro />} />
            </Routes> 
        </div>
    </div>
  )
}


