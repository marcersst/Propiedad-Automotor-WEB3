
export const subirImagen = async (imagen) => {

    const JWT= process.env.VITE_PINATA_JWT

    try {
      
      const data = new FormData();

      data.append("file", imagen);
  
      const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", { 
      method: "POST",
      headers: {
        Authorization: `Bearer ${JWT}`,
      },
      body: data,
    });
    const resData = await res.json();
    console.log(resData);
    return resData.IpfsHash
  } catch (error) {
    console.log(error);
  }
};
