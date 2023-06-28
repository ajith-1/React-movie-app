import React from 'react';
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import Api from '../API/Api';
import dayjs from "dayjs";
import '../App.css';
import '../Detials/Detials.css';
import avatar from "../images/avatar.jpg";
import poster from "../images/noPoster.jpg";
import imdbIcon from "../images/imdb.png";
import Video from './Video';
import Cards from '../Cards/Cards';
import Content from '../Content/Content';
import Loader from '../Loader/Loader';

const Detials = () => {
  
  const { url, key } = Api;
  const [movie, setMovie] = useState({});
  const [crew, setCrew] = useState([]);
  const [cast, setCast] = useState([]);
  const [similar, setSimilar] = useState([]);
  const [video, setVideo] = useState([]);
  const [recommend, setRecommend] = useState([]);
  const [loading, setLoading] = useState(true);
  const { mediaType, id } = useParams();


  //  Fetching detials 
  useEffect(() => {
    const getMovies = async () => {
      try {
        const res = await fetch(`${url}/${mediaType}/${id}?api_key=${key}`);
        const data = await res.json();
        setMovie(data);
        setLoading(false);
      }
      catch (error) {
        console.error(error);
      }
    };
    getMovies();


    // Fetching credits

    const getCredit = async () => {
      try {
        const res = await fetch(`${url}/${mediaType}/${id}/credits?api_key=${key}`);
        const data = await res.json();
        setCrew(data.crew);
        setCast(data.cast)
      }
      catch (error) {
        console.error(error);
      }
    };
    getCredit();

    // ---Video
    const getVideo = async () => {
      try {
        const res = await fetch(`${url}/${mediaType}/${id}/videos?api_key=${key}`);
        const data = await res.json();
        setVideo(data.results);
      }
      catch (error) {
        console.error(error);
      }
    };
    getVideo();

    // fetching recommendations data 
    const getRecommend = async () => {
      try {
        const res = await fetch(`${url}/${mediaType}/${id}/recommendations?api_key=${key}`)
        const data = await res.json();
        setRecommend(data.results);
      }
      catch (error) {
        console.error(error);
      }
    };
    getRecommend();

    // fetching similar data 
    const getSimilar = async () => {
      try {
        const res = await fetch(`${url}/${mediaType}/${id}/similar?api_key=${key}`)
        const data = await res.json();
        setSimilar(data.results);
      }
      catch (error) {
        console.error(error);
      }
    };
    getSimilar();
    window.scroll(0, 0)

  }, [id, mediaType, key, url]);

  const director = crew.filter((f) => f.job === "Director");
  const writer = crew.filter((f) => f.job === "Screenplay" || f.job === "Story" || f.job === "Writer");

  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
  };

  const rate = (movie.vote_average)


  return (
    <>
      {loading ? <Loader /> : <>

        <div className="detials-banner" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${(movie.backdrop_path || movie.poster_path)})` }}> </div>
        <div className='continer-detials'>
          <div className='content-box'>
            {/* ---left---- */}
            <div className='left'>
              {movie.poster_path ? <img className="posterImg" src={`https://image.tmdb.org/t/p/original${(movie.poster_path || movie.backdrop_path)}`} alt='Poster' /> : <img className="posterImg" src={poster} alt='Poster' />}
            </div>

            {/* ---right--- */}
            <div className='right'>
              <h1 className='title'>{movie.title || movie.name}({dayjs(movie.release_date).format("YYYY")})</h1>
              <h3 className='subtitle'>{movie.tagline}</h3>
              <div className="genres">
                {movie.genres && movie.genres.slice(0, 4).map((genre, i) =>
                  (<span key={i} className="genres-item">{genre.name}</span>))}
              </div>
              <div className='rating'>
                <span>TMDB : </span><span className='star'>&#9733; {parseFloat(rate).toFixed(1)}</span>
                <span><a href={`https://www.imdb.com/title/${movie.imdb_id}`} target="_blank" rel='noopener noreferrer'><img src={imdbIcon} alt='imdb icon' className='imdbIcon' /></a></span>
              </div>
              <div className='overview'>
                <h3 className="heading">Overview</h3>
                <p className="description">{movie.overview}</p>
              </div>
              <div className='info'>
                <div className=''> {movie.status && (
                  <div className="infoItem">
                    <span className="text bold">
                      Status:{" "}
                    </span>
                    <span className="text">
                      {movie.status}
                    </span>
                  </div>
                )}</div>
                {movie.release_date && (
                  <div className="infoItem">
                    <span className="text bold">
                      Release Date:{" "}
                    </span>
                    <span className="text">
                      {dayjs(
                        movie.release_date
                      ).format("MMM D, YYYY")}
                    </span>
                  </div>
                )}
                {movie.runtime && (
                  <div className="infoItem">
                    <span className="text bold">
                      Runtime:{" "}
                    </span>
                    <span className="text">
                      {toHoursAndMinutes(
                        movie.runtime
                      )}
                    </span>
                  </div>
                )}
              </div>
              {director?.length > 0 && (
                <div className="info">
                  <span className="text bold">
                    Director:{" "}
                  </span>
                  <span className="text">
                    {director?.map((d, i) => (
                      <span key={i}>
                        {d.name}
                        {director.length -
                          1 !==
                          i && ", "}
                      </span>
                    ))}
                  </span>
                </div>
              )}

              {writer?.length > 0 && (
                <div className="info">
                  <span className="text bold">
                    Writer:{" "}
                  </span>
                  <span className="text">
                    {writer.map((d, i) => (
                      <span key={i}>
                        {d.name}
                        {writer.length -
                          1 !==
                          i && ", "}
                      </span>
                    ))}
                  </span>
                </div>
              )}

              {movie?.created_by?.length > 0 && (
                <div className="info">
                  <span className="text bold">
                    Creator:{" "}
                  </span>
                  <span className="text">
                    {movie?.created_by?.map(
                      (d, i) => (
                        <span key={i}>
                          {d.name}
                          {movie
                            ?.created_by
                            .length -
                            1 !==
                            i && ", "}
                        </span>
                      )
                    )}
                  </span>
                </div>
              )}
            </div >
          </div>
          <Content>
            {/* -------------cast------------ */}
            <div className='cast'>
              <h3>Top Cast</h3>
              <div className='cast-row'>
                {
                  cast.slice(0, 10).map((cast) => {
                    return (
                      <div className='cast_detial' key={cast.id}>
                        {cast.profile_path ? <img className="castImage" src={`https://image.tmdb.org/t/p/w185${cast.profile_path}`} alt='Not Found' /> : <img className='castImage' src={avatar} alt='cast' />}
                        <p className='text bold'> {cast.name}</p>
                        <p className='text'>{cast.character} </p>
                      </div>
                    )
                  })}
              </div>
            </div>
            {/* -----------Video-------- */}
            <div className='trailer'>
              <Video video={video} />
            </div>
            {/*-----------Similar & Recommend ------------*/}
            <div className='show similar'>
              <h3 >Similar</h3>
              <Cards item={similar} mediaType={mediaType} />
            </div>
            <div className='show recommend'>
              <h3 >Recommend</h3>
              <Cards item={recommend} mediaType={mediaType} />
            </div>
          </Content>
        </div>
      </>}
    </>
  );
};
export default Detials;


