import React,{useState} from 'react';
import ReactPlayer from 'react-player/youtube';
import '../Detials/Video.css';
import Play from '../images/play.png';
import Close from '../images/close.png';

// Only loads the YouTube player

export default function Video({video}) {
    const [show, setShow] = useState(false);
   const [videoId, setVideoId] = useState(null);
  
   const trailer=video.filter((video)=>video.type==="Trailer")
  

   return (
       <div className="videosSection">
           
               <div className="sectionHeading">International Trailer</div>
             
                   <div className="videos">
                       {trailer.map((video) => (
                           <div
                               key={video.id}
                               className="videoItem"
                               onClick={() => {
                                   setVideoId(video.key);
                                   setShow(true);
                               }}
                           >
                               <div className="videoThumbnail">
                                   <img className='videoImg'
                                       src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}
                                   />
                                   <img className='button play' src={Play}/>
                               </div>
                               <div className="videoTitle">{video.name}</div>
                           </div>
                       ))}
                   </div>
           
           <VideoPopup
               show={show}
               setShow={setShow}
               videoId={videoId}
               setVideoId={setVideoId}
           />
       </div>
   );

}


const VideoPopup = ({ show, setShow, videoId, setVideoId }) => {
    const hidePopup = () => {
        setShow(false);
        setVideoId(null);
    };
    return (
        <div className={`videoPopup ${show ? "visible" : ""}`}>
            <div className="opacityLayer" onClick={hidePopup}></div>
            <div className="videoPlayer">
                <span className="closeBtn" onClick={hidePopup}>
                    <img className='button close' src={Close}/>
                </span>
                <ReactPlayer
                    url={`https://www.youtube.com/watch?v=${videoId}`}
                    controls
                    width="100%"
                    height="100%"
                    // playing={true}
                />
            </div>
        </div>
    );
};


