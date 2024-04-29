import { createContext, useState } from "react";

export const ArtistContext = createContext();

export const ArtistContextProvider = ({ children }) => {
  const [artistInfos, setArtistInfos] = useState({});
  const [token, setToken] = useState({});

  return (
    <ArtistContext.Provider value={{ artistInfos, setArtistInfos, token, setToken }}>
      { children }
    </ArtistContext.Provider>
  );
};