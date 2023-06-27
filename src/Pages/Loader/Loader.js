import React from 'react';
import './Loader.css';


function Loader() {
  return (
    <div className='loader'>
      <div v-if="loading" class="spinner">
        <div class="rect1"></div>
        <div class="rect2"></div>
        <div class="rect3"></div>
        <div class="rect4"></div>
        <div class="rect5"></div>
      </div>
    </div>
  )
}
export default Loader;   