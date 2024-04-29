import "./RandomArtist.css"
// Icons
import { BsShuffle } from "react-icons/bs";

// Hooks
import { useNavigate } from "react-router-dom";
import { useAxios } from "../../hooks/useAxios";
import { useContext } from "react";

// Context
import { LoadingContext } from "../../context/LoadingContext";
import { ArtistContext } from "../../context/ArtistContext";

const RandomArtist = ({ home }) => {
  const navigate = useNavigate();
  const axios = useAxios();
  const { setLoading } = useContext(LoadingContext);
  const { setArtistInfos, token, setToken } = useContext(ArtistContext);

  const handleClick = async () => {
    try {
      const data = { token: token ? token : null }

      setLoading(true);

      const response = await axios.post("/randomArtist", JSON.stringify(data));

      setToken(response.token);
      navigate(`/artistInfo/${response.nameArtist}`);

    } catch (error) {
      console.error("Erro na solicitação POST:", error);
    };
  };

  return (
    <button className="random-artist" onClick={handleClick} >
      <BsShuffle className="icon icon-random" />
    </button>
  )
}

export default RandomArtist;