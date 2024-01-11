import React, { useState, useEffect, useRef } from 'react';
import { IoMdRefreshCircle } from 'react-icons/io';
import Loading from './loading';
import Card from './card';
import { useRenderContext } from '../context';

const Main = () => {
  const { selectedBreedId, setSelectedBreedId, activeIndex, setActiveIndex } = useRenderContext();
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
      "x-api-key": "live_3E4QzNAesUi4gOPUmdL7Gnd1NoeGSSORmQSh3wJtKPbF8yRf1MY8IEzZxeEinuqZ",
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
    setSearchTerm('');
  };

  const handleGenerateClick = () => {
    setTriggerFetch(true);
    setActiveIndex(null);
    count = 0;
  };

  const filterContainerRef = useRef(null);

  
  const restartAnimation = () => {
    if (filterContainerRef.current) {
      filterContainerRef.current.offsetHeight; 
    }
  };
  useEffect(() => {
    restartAnimation(); 
  }, [count]);

  return (
    <div className='filter--card--container'>

        {loading ? (
        <main className="loading" ref={filterContainerRef}>
          <div className="filter-bar">
          <Loading />
          </div>
        </main>
        ) : (
      <main className="filter--container" ref={filterContainerRef}>
        <div className="filter-bar">
            <h2 className="main--filter">Check them out! : </h2>
            {randomBreeds.map((breed, index) => (
              <button
                key={index}
                onClick={() => handleBreedClick(index, breed)}
                className={index === activeIndex ? 'breed-button-active' : 'breed-button'}
              >
                {breed.breeds && breed.breeds.length > 0 && breed.breeds[0].name}
              </button>
            ))}
            <button
              className='main--generate'
              onClick={handleGenerateClick}
            >  
              <IoMdRefreshCircle className='main--generate'/>
            </button>
        </div>
        </main>
        )}

      <Card selectedBreedId={selectedBreedId} count={0} />
    </div>
  );
};

export default Main;
