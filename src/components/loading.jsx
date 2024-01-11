import React from 'react'
import loadingIcon from './loading.gif';

const Loading = () => {

  return (
    <div className='loading--container'>
      <img src={loadingIcon} alt="Loading..." className='loading--icon '/>
      <span className='loading--text'>Fetching adorable cats... Paws for a moment! </span>
    </div>
  )
}

export default Loading;