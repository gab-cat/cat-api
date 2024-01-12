import React, {useState, useEffect } from 'react';
import { useGlobalContext } from '../modalContext';
import { IoIosCloseCircle } from "react-icons/io";
import { FaInfoCircle } from "react-icons/fa";

const Modal = () => {

  const { closeModal, selectedModalBreed, showModal, images, loaded, setLoaded, fetchImages } = useGlobalContext();
  
  const catBreed = selectedModalBreed;
  const affectionLevel = catBreed.breeds[0]?.affection_level * 20;
  const intelligenceLevel = catBreed.breeds[0]?.intelligence * 20;
  const energyLevel = catBreed.breeds[0]?.energy_level * 20;
  const childFriendly = catBreed.breeds[0]?.child_friendly * 20;
  const wikipediaURL = catBreed.breeds[0]?.wikipedia_url;
  const breedName = catBreed.breeds[0]?.name;
  const altName = catBreed.breeds[0]?.alt_names;


  useEffect(() => {
    fetchImages();
  },[] );

  const swapImage = (e) => {
    let clickedImageSrc = e.target.src;
    let modalImage = document.querySelector('.modal--photo');
    let modalImageSrc = modalImage.src;

    // Swap the src
    e.target.src = modalImageSrc;
    modalImage.src = clickedImageSrc;
  };
  
  const renderCatImages = () => {
    
    return (
    <div className="modal--carrousel">
      {images.map((image, index) => (
        <div key={index} className="modal--image-container">
          <img 
            src={image.url} 
            alt="Cat Image" 
            className='modal--image' 
            onClick={swapImage} 
            style={{ backgroundImage: `url(${image.url})` }}/>
        </div>
      )
      )}
    </div>)
  };

  
  return (
    
    <div className={showModal ? "modal-overlay" : "modal-overlay-close" } >
      <div className='modal--container'>
      <div className="modal">
        <div className='modal--images'>
          <div className='modal--photo-container'><img src={catBreed.url} alt={catBreed.id} className='modal--photo' /></div>
          { renderCatImages() }
        </div>
        {catBreed.breeds && catBreed.breeds.length > 0 ? (
          <div className="modal--content">
            <h1 className='modal--breed' >{breedName}</h1>
            <div>
              <p className='modal-detail'><strong>Country of Origin : </strong>{catBreed.breeds[0]?.origin}</p>
              <p className='modal-detail'><strong>Lifespan : </strong>{catBreed.breeds[0]?.life_span} years old</p>
              { altName && <p className='modal-detail'><strong>Alternate Names : </strong><italic>{altName}</italic></p>}
              <p>{catBreed.breeds[0]?.description}</p>
              <div className='temperament-container'>
                {catBreed.breeds[0]?.temperament.split(', ').map((temperament, index) => (
                  <span key={index} className="temperament-span">
                    {temperament} 
                  </span>
                ))}
              </div>
              
              <div className='bar'>
                <p className='bar-label'>Affection Level</p>
              <div className='affection--bar-container'>
                <div className='affection--bar' style={{ '--affectionWidth': `${affectionLevel}%` }}>.</div>
              </div>
              </div>
              
              <div className='bar'>
                <p className='bar-label'>Child Friendly</p>
                <div className='affection--bar-container'>
                  <div className='affection--bar' style={{ '--affectionWidth': `${childFriendly}%` }}>.</div>
                </div>
              </div>

              <div className='bar'>
                <p className='bar-label'>Intelligence Level</p>
                <div className='affection--bar-container'>
                  <div className='affection--bar' style={{ '--affectionWidth': `${intelligenceLevel}%` }}>.</div>
                </div>
              </div>

              <div className='bar'>
                <p className='bar-label'>Energy Friendly</p>
                <div className='affection--bar-container'>
                  <div className='affection--bar' style={{ '--affectionWidth': `${energyLevel}%` }}>.</div>
                </div>
              </div>
            
            </div>
            <div className='learn-more'><FaInfoCircle className='tip--icon'/>Read more about {breedName} <a href={wikipediaURL} target='_blank'>here</a>!</div>
          </div>
        ) : (
          <p>No breed information available</p>
        )}
      </div>
      <div className='close--container'>
        <IoIosCloseCircle className='close--button' onClick={() => closeModal()}/>
      </div>
      </div>
    </div>
  );

};

export default Modal;
