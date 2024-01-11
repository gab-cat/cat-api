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
    } else {
      setSelectedBreedId('');
    }
  };

  useEffect(() => {
    if (data.length === 1) {
      setSelectedBreedId(data[0].id);
      setActiveIndex(null);
    }
  }, [data, setSelectedBreedId]);

  useEffect(() => {
    console.log("Search term : " + searchTerm);
    handleSearch();
  }, [searchTerm]);

  const handleSearch = async () => {
    if (searchTerm.length > 1) {
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
          } else {
            setSelectedBreedId('');
          }
          
        } else {
          throw new Error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching cat breeds:', error);
      }
    }
    else if (searchTerm.length === 0) {  
      setData([]);
      setSelectedBreedId(null);
      setFound(true);
    }
  };

  const onSearch = (searchTerm) => {
    console.log(searchTerm);
    handleSearch();
  };

  const handleEnterPress = (e) => {
    if (e.key === 'Enter') {
      setSearchTerm(searchTerm);
      data.length > 0 ? setSelectedBreedId(data[0].id) : setSelectedBreedId(null); 
      data.length > 0 ? setSearchTerm(data[0].name) : setSearchTerm(searchTerm); 
    }
  };

  return (
    <nav className='hero--container'> 
      <div className='hero--banner--container'>
        <img src={BannerPhoto} alt="Central Banner" className='hero--banner' onClick={refreshPage} />
      </div>
      <div className='hero--search--container'>  
      <div className="hero--search">
        <input type="text" 
          placeholder="Search..." 
          className="search-input" 
          onChange={handleSearchType} 
          value={searchTerm} 
          onKeyDown={handleEnterPress} 
          onFocus={() => setShowDropdown(true)}
          onBlur={() => setShowDropdown(true)}
          />
        {searchTerm && <button 
          className='clear-button'
          onClick={ () => {
            setSearchTerm('');
            setSelectedBreedId(null);
          }}
          ><MdClear /></button>}
        <button 
          type="submit" 
          className="search-button" 
          onClick={() => {
            setSearchTerm(searchTerm);
            data.length > 0 ? setSelectedBreedId(data[0].id) : setSelectedBreedId(null); 
            data.length > 0 ? setSearchTerm(data[0].name) : setSearchTerm(searchTerm); 
          }}
          >
          <FaSearch className='search--icon'/>
        </button>
      </div>
        { data.length > 0 && <div className='searchresult--container'>
        { searchTerm.length > 1 && <h2 className={showDropdown ? 'show--textresult' : 'hide--textresult'}>Search Result : </h2>}
        { searchTerm.length > 1 && <div className={showDropdown ? ('show--dropdown') : 'hide--dropdown'} >
          {data.length > 0 && data
            .slice(0, 20)
            .map((item) => (
              <div
                onClick={() => {
                  setSearchTerm(item.name);
                  setSelectedBreedId(item.id);
                }}
                className={data.length > 1 ? "breed-button" : "breed-button-active" }
                key={item.name}
              >
                {item.name}
              </div>
            ))}
        </div>}
        </div>}
      </div>
      <p className='hero--summary'>
        Welcome to <strong>Cattitude Central: Your Premier Destination for Feline Enthusiasts!</strong><br />
        Dive into a world of whiskers and wonder, where we celebrate the charm, beauty, and unique personalities of our beloved cats.
        Explore comprehensive breed guides, discover heartwarming stories, and unleash a treasure trove of tips and
        tricks to create a purrfectly delightful life alongside your furry companions.
      </p>
    </nav>
  );

}