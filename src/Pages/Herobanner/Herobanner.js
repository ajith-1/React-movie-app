import React from 'react';
import '../Herobanner/Herobanner.css';
import Content from '../Content/Content';


function Herobanner({item}) {

  return (
    <>
<div className="banner" style={{backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`}}>
</div>

<div className='box'>
<Content>
  <div className='heading'>Welcome</div>
  <p>Explore Movies and Tv shows</p>

</Content>
</div> 

    </>
  )
}
export default Herobanner;