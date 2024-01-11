import React, { createContext, useContext, useState } from "react";
import { useRenderContext } from './context';

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedModalBreed, setSelectedModalBreed] = useState(null);
  const [images, setImages ] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const openModal = (catBreed) => {
    console.log("Open Modal");
    setSelectedModalBreed(catBreed);
    setShowModal(true);
    setLoaded(true);
  };

  const closeModal = () => {
    console.log("Closed Modal");
    setShowModal(false);
    setImages([]);
    setLoaded(false);
  };

  const fetchImages = async () => {
    const breedID = selectedModalBreed.breeds[0]?.id;
    const api = `live_3E4QzNAesUi4gOPUmdL7Gnd1NoeGSSORmQSh3wJtKPbF8yRf1MY8IEzZxeEinuqZ`;
    const url = `https://api.thecatapi.com/v1/images/search?limit=3&breed_ids=${breedID}&api_key=${api}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setImages(data);
      console.log('get 3 images: ',breedID );
      setLoaded(true);
    } catch (error) {
      console.error('Error fetching cat breeds:', error);
      setLoaded(true);
    }
  };

  return (
    <ModalContext.Provider
      value={{ showModal, openModal, closeModal, selectedModalBreed, images, setImages, loaded, setLoaded, fetchImages }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
