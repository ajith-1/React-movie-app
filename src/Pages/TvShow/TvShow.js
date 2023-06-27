import React from 'react';
import Explore from '../Explore/Explore';
import { tvGenres } from '../API/genres';

export function TvShow() {

  return (
    <>
      <Explore
        media_Type={'tv'}
        NowPlaying={'on_the_air'}
        Upcoming={'airing_today'}
        Title={'TV Shows'}
        GenreInput={tvGenres}
      />
    </>
  );
}

