import React, { useState, useEffect } from 'react';
import '../App.css';
import Cards from '../Cards/Cards';
import Api from '../API/Api';
import Content from "../Content/Content";
import './Explore.css';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import useGenre from './useGenre';
import Pagination from '../Pagination/Pagination';
import Loader from '../Loader/Loader';

const animatedComponents = makeAnimated();


export default function Explore({ media_Type, NowPlaying, GenreInput }) {

  const initialCount = 1;

  const [nowPlayingData, setNowplayingData] = useState([]);
  const [pageNum, setPagenum] = useState(initialCount);
  const [randomImage, setRandomImage] = useState([]);
  const [state, setState] = useState([]);
  const [value, setValue] = useState([]);
  const [loading, setLoading] = useState(true);
  const [resultTotal, setResultTotal] = useState();
  const { url, key } = Api;
  const genreURL = useGenre(value);

  useEffect(() => {
    const getRecommend = async () => {
      try {
        const res = await fetch(`${url}/trending/${media_Type}/day?api_key=${key}`);
        const data = await res.json();
        setRandomImage(data.results[Math.floor(Math.random() * data.results.length)]);
      }
      catch (error) {
        console.error(error)
      }
    };
    getRecommend();
  }, [url, media_Type, key])

  useEffect(() => {

    const getNowplaying = async () => {
      try {
        const res = await fetch(`${url}/${media_Type}/${NowPlaying}?api_key=${key}&page=${pageNum}`);
        const data = await res.json();
        setNowplayingData(data.results);
        setResultTotal(data.total_pages > 80 ? 80 : data.total_pages);
        setLoading(false)
        window.scroll(0, 0)
      }
      catch (error) {
        console.error(error)
      }
    };
    getNowplaying();
  }, [pageNum, NowPlaying, key, url, media_Type]);


  useEffect(() => {

    const getGenre = async () => {
      try {
        const res = await fetch(`${url}/discover/${media_Type}?sort_by=popularity.desc&with_genres=${genreURL}&api_key=${key}&page=${pageNum}`);
        const data = await res.json();
        setState(data.results);
        setResultTotal(data.total_pages > 80 ? 80 : data.total_pages);
        setLoading(false);
      }
      catch (error) {
        console.error(error);
      }
      window.scroll(0, 0);
    };
    getGenre();
  }, [genreURL, pageNum, key, url, media_Type])

  return (
    <>
      <div className='header' style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${(randomImage.backdrop_path || randomImage.poster_path)})` }}></div>
      <div className='header-box'>
        <div className='header-title'> {media_Type === "tv"
          ? "Explore TV Shows"
          : "Explore Movies"}</div>
        <div>
          <Select
            options={GenreInput}
            onChange={setValue}
            components={animatedComponents}
            value={value}
            autoFocus={true}
            placeholder='Select Genre ..'
            isMulti
            className='selectGenre'
            classNamePrefix='react-select'
          />
        </div>
      </div>
      <Content>
        {loading ? <Loader /> : <>
          {state ? <><Cards item={state} mediaType={media_Type} /><div><Pagination page={pageNum} setPage={setPagenum} pageCount={resultTotal} /></div></> :
            <>
              <div className='show nowplaying'>
                <Cards item={nowPlayingData} mediaType={media_Type} />
                <div><Pagination page={pageNum} setPage={setPagenum} pageCount={resultTotal} /></div>
              </div>
            </>}</>
        }
      </Content>
    </>
  );
}



