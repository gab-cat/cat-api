import React, { useEffect, useRef, useState } from 'react';
import BannerPhoto from './footer.png';
import { FaSearch } from "react-icons/fa";
import { useRenderContext } from '../context';
import { MdClear } from "react-icons/md";

export default function Hero() {

  const { setSelectedBreedId, setFound, setActiveIndex, searchTerm, setSearchTerm } = useRenderContext()
  const [data, setData] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  
  const refreshPage = () => {
    window.location.reload();
  };
  
  const handleSearchType = (e) => {
    setSearchTerm(e.target.value);
    if (data.length === 1) {
      setSelectedBreedId(data[0].id);
    } 
  };

  useEffect(() => {
    if (data.length === 1) {
      setSelectedBreedId(data[0].id);
      setActiveIndex(null);
    }
  }, [data, setSelectedBreedId]);

  useEffect(() => {
    handleSearch();
  }, [searchTerm]);

  const handleSearch = async () => {
    if (searchTerm?.length > 2) {
      console.log("Search term : " + searchTerm);
      try {
        const response = await fetch(`https://api.thecatapi.com/v1/breeds/search?q=${searchTerm}&has_breeds=1`);
        if (response.ok) {
          const items = await response.json();
          setData(items);
          if (items.length === 0) {
            setFound(false);
          }
          else {
            setFound(true);
            setActiveIndex(null);
          }

          if (data.length === 1) {
            setSelectedBreedId(data[0].id);
          } 
          
        } else {
          throw new Error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching cat breeds:', error);
      }
    }
    else if (searchTerm?.length === 0) {  
      setData([]);
      setSelectedBreedId(null);
      setFound(true);
    }
  };

  const handleEnterPress = (e) => {
    if (e.key === 'Enter') {
      setSearchTerm(searchTerm);
      data.length > 0 ? setSelectedBreedId(data[0].id) : setSelectedBreedId(null); 
      data.length > 0 ? setSearchTerm(data[0].name) : setSearchTerm(searchTerm); 
    }
  };

  return (
    <nav className='flex flex-col justify-center items-center bg-white shadow-lg rounded-2xl pb-5'>
      <div 
        className='transition-transform duration-300 ease-in-out cursor-pointer'
        role="button"
        tabIndex={0}
        onClick={refreshPage}
        onKeyDown={(e) => e.key === 'Enter' && refreshPage()}
      >
        <img src={BannerPhoto} alt="Central Banner" className='max-w-screen-lg mx-auto' />
      </div>
      </div>
      <div className='grid items-center opacity-0 animate-fadeIn'>
        <div className="flex items-center border border-gray-300 rounded-2xl overflow-hidden min-w-[500px] w-[500px] mt-14 mb-2 shadow-md transition-all duration-300 h-10 hover:border-yellow-500 focus-within:border-yellow-500 focus-within:w-[600px] focus-within:h-12">
          <input type="text" 
            placeholder="Search..." 
            className="flex-1 border-none p-2.5 outline-none text-lg rounded-l-2xl indent-4 font-poppins" 
            onChange={handleSearchType} 
            value={searchTerm} 
            onKeyDown={handleEnterPress} 
            onFocus={() => setShowDropdown(true)}
            onBlur={() => setShowDropdown(true)}
          />
          {searchTerm && <button 
            className='rounded-full text-2xl text-gray-800 mt-2.5 p-3 border-none bg-white transition-colors duration-300 cursor-pointer hover:bg-gray-300'
            onClick={ () => {
              setSearchTerm('');
              setSelectedBreedId(null);
            }}
          ><MdClear /></button>}
          <button 
            type="submit" 
            className="border-none bg-yellow-500 text-white p-3 cursor-pointer transition-colors duration-300 rounded-r-2xl font-poppins h-[150%] hover:bg-yellow-700"
            onClick={() => {
              setSearchTerm(searchTerm);
              data.length > 0 ? setSelectedBreedId(data[0].id) : setSelectedBreedId(null); 
              data.length > 0 ? setSearchTerm(data[0].name) : setSearchTerm(searchTerm); 
            }}
          >
            <FaSearch className='text-xl mr-1 mt-1' />
          </button>
        </div>
        { data.length > 0 && <div className='grid items-center opacity-0 animate-fadeIn'>
          { searchTerm.length > 1 && <h2 className={showDropdown ? 'block mb-5 text-lg font-medium' : 'hidden'}>Search Result : </h2>}
          { searchTerm.length > 1 && <div className={showDropdown ? 'flex flex-wrap justify-center gap-4 mt-[-20px] mb-5 p-2.5 bg-white border border-gray-300 rounded-2xl max-w-[800px]' : 'hidden'}>
            <div role="listbox" aria-label="Search results">
              {data.length > 0 && data
                .slice(0, 20)
                .map((item) => (
                  <div
                    role="option"
                    aria-selected={searchTerm === item.name}
                    onClick={() => {
                      setSearchTerm(item.name);
                      setSelectedBreedId(item.id);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        setSearchTerm(item.name);
                        setSelectedBreedId(item.id);
                      }
                    }}
                    tabIndex={0}
                    className={data.length > 1 ? "bg-white text-yellow-500 border border-yellow-500 rounded-2xl p-2.5 cursor-pointer transition-colors duration-300 hover:bg-yellow-300 hover:text-white" : "bg-yellow-500 text-white border border-yellow-500 rounded-2xl p-2.5 cursor-pointer transition-colors duration-300"}
                    key={item.name}
                  >
                    {item.name}
                  </div>
                ))}
            </div>
          </div>}
        </div>}
      </div>
      <p className='mt-5 text-lg leading-6 text-gray-800 max-w-screen-lg mx-auto opacity-0 animate-fadeIn'>
        Welcome to <strong>Cattitude Central: Your Premier Destination for Feline Enthusiasts!</strong><br />
        Dive into a world of whiskers and wonder, where we celebrate the charm, beauty, and unique personalities of our beloved cats.
        Explore comprehensive breed guides, discover heartwarming stories, and unleash a treasure trove of tips and
        tricks to create a purrfectly delightful life alongside your furry companions.
      </p>
    </nav>
  );

}
