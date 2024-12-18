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
    <div className="flex">
      {images.map((image, index) => (
        <div key={index} className="w-36 h-36 overflow-hidden mr-1 rounded">
          <img 
            src={image.url} 
            alt="Cat Image" 
            className='w-full h-full object-cover rounded transition-transform duration-300 ease-in-out cursor-pointer hover:scale-110 opacity-80 hover:opacity-100' 
            onClick={swapImage} 
            style={{ backgroundImage: `url(${image.url})` }}/>
        </div>
      )
      )}
    </div>)
  };

  
  return (
    
    <div className={showModal ? "fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-90 flex justify-center items-center z-50 transition-transform duration-500 ease-in-out" : "fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-90 flex justify-center items-center z-50 transition-transform duration-500 ease-in-out transform scale-y-0 origin-top"} >
      <div className='flex flex-col items-start'>
      <div className="w-full max-w-4xl bg-gray-200 p-5 rounded-lg grid grid-cols-2 gap-4 opacity-0 animate-fadeIn">
        <div className='flex flex-col items-center'>
          <div className='w-96 h-96 overflow-hidden mb-1 rounded'><img src={catBreed.url} alt={catBreed.id} className='w-full h-full object-cover rounded transition-transform duration-300 ease-in-out cursor-pointer hover:scale-110' /></div>
          { renderCatImages() }
        </div>
        {catBreed.breeds && catBreed.breeds.length > 0 ? (
          <div className="text-justify">
            <h1 className='text-yellow-500 mb-4' >{breedName}</h1>
            <div>
              <p className='mb-2'><strong>Country of Origin : </strong>{catBreed.breeds[0]?.origin}</p>
              <p className='mb-2'><strong>Lifespan : </strong>{catBreed.breeds[0]?.life_span} years old</p>
              { altName && <p className='mb-2'><strong>Alternate Names : </strong><italic>{altName}</italic></p>}
              <p>{catBreed.breeds[0]?.description}</p>
              <div className='flex flex-wrap mt-4'>
                {catBreed.breeds[0]?.temperament.split(', ').map((temperament, index) => (
                  <span key={index} className="bg-white text-yellow-500 border border-yellow-500 py-1 px-4 rounded-full font-light mr-4 mb-2 transition-colors duration-300 cursor-default hover:bg-yellow-500 hover:text-white">
                    {temperament} 
                  </span>
                ))}
              </div>
              
              <div className='mt-4'>
                <p className='font-light text-sm'>Affection Level</p>
              <div className='w-full bg-yellow-200 rounded h-2.5 mt-1'>
                <div className='bg-yellow-500 h-2.5 rounded' style={{ width: `${affectionLevel}%` }}></div>
              </div>
              </div>
              
              <div className='mt-4'>
                <p className='font-light text-sm'>Child Friendly</p>
                <div className='w-full bg-yellow-200 rounded h-2.5 mt-1'>
                  <div className='bg-yellow-500 h-2.5 rounded' style={{ width: `${childFriendly}%` }}></div>
                </div>
              </div>

              <div className='mt-4'>
                <p className='font-light text-sm'>Intelligence Level</p>
                <div className='w-full bg-yellow-200 rounded h-2.5 mt-1'>
                  <div className='bg-yellow-500 h-2.5 rounded' style={{ width: `${intelligenceLevel}%` }}></div>
                </div>
              </div>

              <div className='mt-4'>
                <p className='font-light text-sm'>Energy Friendly</p>
                <div className='w-full bg-yellow-200 rounded h-2.5 mt-1'>
                  <div className='bg-yellow-500 h-2.5 rounded' style={{ width: `${energyLevel}%` }}></div>
                </div>
              </div>
            
            </div>
            <div className='mt-4'><FaInfoCircle className='inline-block mr-1'/>Read more about {breedName} <a href={wikipediaURL} target='_blank' className='text-blue-500 hover:underline'>here</a>!</div>
          </div>
        ) : (
          <p>No breed information available</p>
        )}
      </div>
      <div className='self-start relative z-10 ml-[-28px] mt-[-15px] text-red-800 text-4xl opacity-0 animate-fadeIn'>
        <IoIosCloseCircle className='cursor-pointer transition-colors duration-300 hover:text-red-500' onClick={() => closeModal()}/>
      </div>
      </div>
    </div>
  );

};

export default Modal;
