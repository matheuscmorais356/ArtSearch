import axios from "axios";
import { useState } from "react";

const createAxiosInstance = () => {
  const instance = axios.create({
    baseURL: process.env.REACT_APP_LINK_API,
    headers: {
      "Content-Type": "application/json"
    }
  });

  return instance;
};

const formatNumbers = (number, type) => {

  let formatedNumber = 0;

  if(type === "follows") {
    formatedNumber = number.toLocaleString("pt-BR");
  } else {
    const minuts= Math.floor(number / 60000); 
    const seconds = ((number % 60000) / 1000).toFixed(0);

    formatedNumber = `${minuts}:${seconds.padStart(2, '0')}`;
  }

  return formatedNumber;
} 

export const useAxios = () => {
  const [axiosInstance] = useState(createAxiosInstance);

  // random artist
  const get = async (url) => {
    try {
      const response = await axiosInstance.get(url);

      return response.data.name;

    } catch (error) {
      throw error;
    }
  }

  // checkmusic e albumTracks
  const post = async (url, data) => {
    try {

      // const response = await axiosInstance.post(`/api/v1${url}`, data);
      const response = await axios.post(`${process.env.REACT_APP_LINK_API}/api/v1${url}`, data, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      if(url === "/checkmusic") {
        response.data.artist.follows = formatNumbers(parseInt(response.data.artist.follows), "follows");
      }  else if(url === "/albumTracks") {
        response.data.tracks.forEach(track => {
          track.duration = formatNumbers(parseInt(track.duration, "duration"))
        });
      }

      return response.data;

    } catch (error) {
      throw error;
    }
  }

  return { get, post };
};