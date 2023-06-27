import React, { useState, useEffect } from 'react';
import './Home.css';
import Herobanner from '../Herobanner/Herobanner';
import Api from '../API/Api';
import Content from "../Content/Content";
import Cards from '../Cards/Cards';
import Loader from '../Loader/Loader';


export default function Home() {

  const [item, setItem] = useState([]);
  const { url, key } = Api;

  useEffect(() => {
    const getBanner = async () => {
      try {
        const res = await fetch(`${url}/movie/upcoming?api_key=${key}`);
        const data = await res.json();
        setItem(data.results[Math.floor(Math.random() * data.results.length)]);
      } catch (error) {
        console.error(error);
      }
    }
    getBanner();

  }, []);


  return (
    <>
      <Herobanner item={item} />
      <Content>
        <div className='tabs'>
          <Tabs endpoint={'popular'} title={"What's Popular"} />
        </div>
        <div className='tabs'>
          <Tabs endpoint={"top_rated"} title={"Top Rated"} />
        </div>
      </Content>
    </>
  );
}

export function Tabs({ endpoint, title }) {

  const [currentTab, setCurrentTab] = useState('1');
  const [data, setData] = useState([]);
  const [mediaType, setMediatype] = useState('movie');
  const [loading, setLoading] = useState(true);
  const { url, key } = Api;

  const tabs = [
    {
      id: 1,
      title: 'Movies',
      mediaType: 'movie',
    },
    {
      id: 2,
      title: 'TV Show',
      mediaType: 'tv',
    }
  ]

  useEffect(() => {

    const getTabs = async () => {
      try {
        const res = await fetch(`${url}/${mediaType}/${endpoint}?api_key=${key}`);
        const data = await res.json();
        setData(data.results);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
    getTabs();

  }, [mediaType])

  const handleTabClick = (e) => {
    setCurrentTab(e.target.id);
    setMediatype(e.target.value);
  }

  return (
    <>
      {loading ? <Loader /> : <> <div className='tab-content'>
        <span>{title}</span>
        {tabs.map((tab, i) => {
          return (
            <button
              key={i}
              id={tab.id}
              disabled={currentTab === `${tab.id}`}
              value={tab.mediaType}
              onClick={(handleTabClick)}
              className='btn'
            >
              {tab.title}
            </button>)
        })}
      </div>
        <div className='tabCards'>
          <Cards item={data} mediaType={mediaType} />
        </div></>}


    </>
  )

}
