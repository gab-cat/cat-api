import React, { useState, useEffect, useRef } from 'react';
import { IoMdRefreshCircle } from 'react-icons/io';
import Loading from './loading';
import Card from './card';
import { useRenderContext } from '../context';
import dotenv from 'dotenv';

const Main = () => {
  const { selectedBreedId, setSelectedBreedId, activeIndex, setActiveIndex, setSearchTerm } = useRenderContext();
  const [randomBreeds, setRandomBreeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [triggerFetch, setTriggerFetch] = useState(false);
  let count = 0;

  useEffect(() => {
    console.log("Selected Breed ID:", selectedBreedId);
  }, [selectedBreedId]);

  useEffect(() => {
    count += 1;
    console.log("Fetching random breeds...count: "+ count);
    if (count === 1) fetchRandomBreeds();
  }, []); 

  useEffect(() => {
      if (triggerFetch) {
          fetchRandomBreeds();
          console.log("Fetching random breeds... trigeer fetch");
          setTriggerFetch(false);
      }
  }, [triggerFetch, randomBreeds]);

  const fetchRandomBreeds = () => {

    setLoading(true);

    const headers = new Headers({
      "Content-Type": "application/json",
      "x-api-key": process.env.REACT_APP_API_KEY,
    });

    const requestOptions = {
      method: "GET",
      headers: headers,
      redirect: "follow",
    };

    fetch(
      "https://api.thecatapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=5",
      requestOptions,
    )
      .then((response) => response.json())
      .then((data) => {
        setRandomBreeds(data);
        setLoading(false);
        console.log(data);
      })
      .catch((error) => {
        console.log("Error fetching random breeds:", error);
        setLoading(false);
      });
  };

  const handleBreedClick = (index, selectedBreed) => {
      if (index === activeIndex) {
        setActiveIndex(null); 
        setSelectedBreedId(null); 
      } else {
        setActiveIndex(index); 
        const breedId = selectedBreed.breeds[0].id;
        setSelectedBreedId(breedId);
      }
  };

  const handleGenerateClick = () => {
    setTriggerFetch(true);
    setActiveIndex(null);
    count = 0;
  };

  const filterContainerRef = useRef(null);

  
  const restartAnimation = () => {
    if (filterContainerRef.current) {
      const offsetHeight = filterContainerRef.current.offsetHeight;
      // Use the offsetHeight variable or perform other actions as needed
    }
  };
  

  useEffect(() => {
    restartAnimation(); 
  }, [count]);

  return (
    <div className='flex flex-col items-center mt-4'>
        {loading ? (
        <main className="flex justify-center items-center w-full">
          <div className="flex justify-center items-center w-full">
          <Loading />
          </div>
        </main>
        ) : (
      <main className="flex justify-center items-center w-full">
        <div className="flex justify-center items-center w-full">
            <h2 className="text-lg font-medium mr-4">Check them out! : </h2>
            {randomBreeds.map((breed, index) => (
              <button
                key={index}
                onClick={() => handleBreedClick(index, breed)}
                className={index === activeIndex ? 'bg-yellow-500 text-white border border-yellow-500 rounded-2xl p-2.5 cursor-pointer transition-colors duration-300' : 'bg-white text-yellow-500 border border-yellow-500 rounded-2xl p-2.5 cursor-pointer transition-colors duration-300 hover:bg-yellow-300 hover:text-white'}
              >
                {breed.breeds && breed.breeds.length > 0 && breed.breeds[0].name}
              </button>
            ))}
            <button
              className='text-4xl text-yellow-500 bg-white rounded-full p-2.5 cursor-pointer transition-transform duration-300 hover:scale-110'
              onClick={handleGenerateClick}
            >  
              <IoMdRefreshCircle className='text-4xl text-yellow-500'/>
            </button>
        </div>
        </main>
        )}

      <Card selectedBreedId={selectedBreedId} count={0} />
    </div>
  );
};

export default Main;
