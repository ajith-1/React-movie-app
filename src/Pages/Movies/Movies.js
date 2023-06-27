import React from 'react';
import Explore from '../Explore/Explore';
import movieGenres from '../API/genres';


function Movies() {

  return (
    <>
      <Explore
        media_Type={'movie'}
        NowPlaying={'now_playing'}
        Upcoming={'upcoming'}
        Title={'Movie'}
        GenreInput={movieGenres}
      />
    </>
  )
}

export default Movies;