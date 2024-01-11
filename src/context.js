import React, { createContext, useContext, useState } from 'react';

const renderContext = createContext();

export const RenderProvider = ({ children }) => {
  const [catBreeds, setCatBreeds] = useState([]);
  const [searchTerm, setSearchTerm] = useState(null);
  const [selectedBreedId, setSelectedBreedId] = useState(null);
  const [found, setFound ] = useState(true);
  const [activeIndex, setActiveIndex] = useState(null);


  return (
    <renderContext.Provider value={{ selectedBreedId, setSelectedBreedId, catBreeds, setCatBreeds , setFound, found, activeIndex, setActiveIndex, searchTerm, setSearchTerm }}>
      {children}
    </renderContext.Provider>
  );
};

export const useRenderContext = () => {
  const context = useContext(renderContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};
