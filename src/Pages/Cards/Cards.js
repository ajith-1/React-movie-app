import React from "react";
import Poster from '../images/noPoster.jpg';
import { Link } from 'react-router-dom';
import dayjs from "dayjs";
import './Cards.css';


export default function Cards({item,mediaType}){

 
    return(
      <div className="movieList">
      {item.map((e) => {
        return (
          <div className="cards" key={e.id}>
            <Link className='list' to={`/${mediaType}/${e.id}`} >
           {e.poster_path?<img className="cardImage" src={`https://image.tmdb.org/t/p/original${(e.poster_path || e.backdrop_path)}`}  alt="No Poster"/> :<img className='cardImage' src={Poster} alt="No Poster"/>}
            </Link>
              <p className='title'>{ e.title || e.name}</p>
              <p className='date'>{dayjs(e.release_date ).format("MMM D, YYYY")}</p> 
          </div>
        );
      })}
    </div>
    )
  }

