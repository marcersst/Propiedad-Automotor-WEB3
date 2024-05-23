import React, { useEffect, useState } from "react";
import { SinAuto } from "../helpers/SinAutos";
import { Autobox } from "../helpers/AutoBox";
import { useContrato } from "../helpers/context";

export const MisAutos = () => {

  const key= process.env.VITE_ALCHEMY

  const {account,  } = useContrato();
  const [autos, setAutos] = useState(null);

  const obtenernfts = async () => {
    const options = { method: 'GET', headers: { accept: 'application/json' } };

    fetch(`https://eth-sepolia.g.alchemy.com/nft/v3/${key}/getNFTsForOwner?owner=${account}&contractAddresses[]=0xb0263A941A29BE39E034D9a1898a8c7C3c1ecf48&withMetadata=true&pageSize=100`, options)
    .then(response => response.json())
      .then(response => {
        const nuevosAutos = response.ownedNfts.map(auto => ({
          urlImagen: auto.image.originalUrl,
          descripcion: auto.description,
          modelo: auto.name,
          patente: auto.raw.metadata.attributes.find(attr => attr.trait_type === "Patente").value,
          año: auto.raw.metadata.attributes.find(attr => attr.trait_type === "Año").value,
          marca: auto.raw.metadata.attributes.find(attr => attr.trait_type === "Marca").value,
        }));
         setAutos(nuevosAutos) ;
      })
      .catch(err => {
        console.error(err);
      });
  }

  useEffect(() => {
    if (account) {
      obtenernfts();
    }
  }, [account]);

  
  return (
    <>
      <div className="flex flex-wrap justify-center">
        {autos ? (
          autos.length === 0 ? (
            <SinAuto />
          ) : (
        autos.map((auto, index) => (
       <div key={index} className="mx-2 my-2">
                <Autobox
                  imagen={auto.urlImagen} 
                  año={auto.año}
                  modelo={auto.modelo}
                  patente={auto.patente}
                  descripcion={auto.descripcion}
                  marca={auto.marca}
                />
              </div>
            ))
          )
        ) : (
          <SinAuto/>
        )}
      </div>
    </>
  );
}
