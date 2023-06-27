import React, { useState, useEffect } from 'react';
import Api from '../API/Api';
import Content from '../Content/Content';
import Poster from '../images/noPoster.jpg';
import { Link } from 'react-router-dom';
import dayjs from "dayjs";
import { useParams } from 'react-router-dom';
import './Search.css';
import noResult from '../images/noResult.jpg';
import Loader from '../Loader/Loader';
import Pagination from '../Pagination/Pagination';

function Search() {
  const initialValue = 1;
  const { url, key } = Api;
  const [results, setResults] = useState([]);
  const [pageNum, setPageNum] = useState(initialValue);
  const [loading, setLoading] = useState(true);
  const [resultTotal, setResultTotal] = useState();
  const { query } = useParams();

  useEffect(() => {

    const getSearchData = async () => {

      try {
        const response = await fetch( `${url}/search/multi?api_key=${key}&query=${query}&page=${pageNum}`);
        const data = await response.json();
        setResults(data.results);
        setResultTotal(data.total_pages > 80 ? 80 : data.total_pages);
        setLoading(false);
        window.scroll(0, 0);
      } catch (error) {
        console.error(error);
      }
    };
    getSearchData();
    
  }, [query,pageNum,url,key])


  return (
    <div className='searchResult'>
      <Content>
        <div className='resultTitle'>Search Result For : {query}</div>
        {loading ? <Loader /> :
          <>
            {(results.length < 1) ? <div className='noResult'><img src={noResult} alt='Result Not Found' /><div>No Result Found</div></div> :
              <div className="searchList">
                {results.map((val) => {
                  const {
                    media_type,
                    id,
                    title,
                    name,
                    release_date,
                    first_air_date,
                    poster_path,
                    backdrop_path } = val
                  return (
                    <>
                      <div className="searchCards" key={id}>
                        <Link className='list' to={`/${media_type}/${id}`} >
                          {poster_path ? <img className="cardImage" src={`https://image.tmdb.org/t/p/original${(poster_path || backdrop_path)}`} alt='Poster' /> : <img className='cardImage' src={Poster} alt='Poster' />}
                        </Link>
                        <p className='title'>{title || name}</p>
                        <p className='date'>{dayjs(release_date || first_air_date).format("MMM D, YYYY")}</p>
                      </div>
                    </>
                  );
                })}
              </div>}
            {(results.length < 20) ? <> </> : <div><Pagination page={pageNum} setPage={setPageNum} pageCount={resultTotal} /></div>}
          </>
        }
      </Content>
    </div>
  );
};

export default Search;
