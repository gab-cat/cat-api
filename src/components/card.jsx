import React, { useState, useEffect } from 'react';
import Catalog from './catalog.png';
import Loading from './loading';
import { useGlobalContext } from '../modalContext';
import { useRenderContext } from '../context';
import noFound from './noFound.png';
import { FaInfoCircle } from "react-icons/fa";



const Card = () => {
  const {openModal} = useGlobalContext();
  const { selectedBreedId, catBreeds, setCatBreeds, found } = useRenderContext();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingNewCats, setIsLoadingNewCats] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [firstLoad, setFirstLoad] = useState(true);

  const showOneBreed = selectedBreedId === null ? false : true;

  const fetchCatBreeds = async () => {

    const apiKey = 'live_3E4QzNAesUi4gOPUmdL7Gnd1NoeGSSORmQSh3wJtKPbF8yRf1MY8IEzZxeEinuqZ';
    let url = showOneBreed
      ? `https://api.thecatapi.com/v1/images/search?limit=1&has_breeds=1&page=${page}&api_key=${apiKey}&breed_ids=${selectedBreedId}`
      : `https://api.thecatapi.com/v1/images/search?limit=12&has_breeds=1&page=${page}&api_key=${apiKey}`;

    try {
      setIsLoadingNewCats(true);
      const response = await fetch(url); 

      if (response.ok) {
        const data = await response.json();
        if (selectedBreedId) {
          setCatBreeds(data); 
        } else {
          setCatBreeds(prevBreeds => [...prevBreeds, ...data]); // For other cases, append data
        }
        setHasMore(data.length === 6);
        setIsLoadingNewCats(false);
      } else {
        throw new Error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error fetching cat breeds:', error);
      setIsLoadingNewCats(false);
    } finally {
      console.log('Set to one');
    }
  };

  
  
  useEffect(() => {
    if (selectedBreedId === null && !(page > 1)) {
      if (!firstLoad) 
      fetchCatBreeds();
    }

    if (selectedBreedId !== null) {
      fetchCatBreeds();
      setCatBreeds([]);
      setPage(1);
    }
  }, [selectedBreedId]);

  useEffect(() => {
    setFirstLoad(false);
    return () => fetchCatBreeds();
  }, []);


  const handleLoadMore = async () => {
    setIsLoading(true);

    try {
      await fetchCatBreeds();
      setIsLoading(false);
      setPage(page + 1);
    } catch (error) {
      console.error('Error fetching additional cat breeds:', error);
      setIsLoading(false);
    }
  };

  const renderCatCards = () => {
    return catBreeds.map((catBreed, index) => (
      <div className='cat-card-container' key={catBreed.id} onClick={() => openModal(catBreed)}>
      <div key={index} className="cat-card">
        <img src={catBreed.url} alt={catBreed.id} className="cat-card--image" />
        {catBreed.breeds && catBreed.breeds.length > 0 ? (
          <>
            <h3 className='cat-card--name'>{catBreed.breeds[0]?.name}</h3>
            <p className='cat-card--origin'>{catBreed.breeds[0]?.origin}</p>
            <p className='cat-card--description'>
              {catBreed.breeds[0]?.description.slice(0, 50)}
              {catBreed.breeds[0]?.description.length > 50 ? ' ...' : ''}
            </p>
          </>
        ) : (
          <p>No breed information available</p>
        )}
      </div>
      </div>
    ));
  };

  const renderSelectedBreed = () => {
    if (selectedBreedId) {
      const selectedBreed = catBreeds.find(breed => breed.breeds[0]?.id === selectedBreedId);

    if (selectedBreed) {
        console.log(selectedBreed.breeds[0]?.name);


        return (
          <div className='cat-card-container' onClick={() => openModal(selectedBreed)}>
          <div key={selectedBreed.id} className="cat-card">
            <img src={selectedBreed.url} alt={selectedBreed.id} className="cat-card--image" />
            {selectedBreed.breeds && selectedBreed.breeds.length > 0 ? (
              <>
                <h3 className='cat-card--name'>{selectedBreed.breeds[0]?.name}</h3> 
                <p className='cat-card--origin'>{selectedBreed.breeds[0]?.origin}</p>
                <p className='cat-card--description'>
                  {selectedBreed.breeds[0]?.description.slice(0, 50)}
                  {selectedBreed.breeds[0]?.description.length > 50 ? ' ...' : ''}
                </p>
              </>
            ) : (
              <p>No breed information available</p>
            )}
          </div>
          </div>
        );
      }
    }

    return null;
  };





  return (
    <main className='catalog'>
      <div className="catalog--container">
        {found && <div className="catalog--container--title">
          <img src={Catalog} className='catalog--container--banner' alt="Catalog Banner" />
          <p className='tip'><strong><FaInfoCircle className='tip--icon'/> Click on a cat card to know more! </strong></p>
        </div>}
        <div className="catalog--container--content">
          {found ? showOneBreed ? renderSelectedBreed() : renderCatCards() : <img src ={noFound} className='nofound'/>}
        </div>
        { found && (<div className='button-container'>
            {isLoadingNewCats ? <Loading /> : 
            catBreeds.length > 1 ? <button className='load-more-button' onClick={handleLoadMore}>Load More</button> : ''}
          </div>)}
      </div>
    </main>
  );
};

export default Card;