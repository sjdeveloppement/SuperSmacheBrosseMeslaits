import Navigation from "../components/Navigation";
import Scene from "../components/Scene";
//import Player from "../components/Player";
import { useState, useRef } from "react";
import ReactPlayer from "react-player";





const Home = () => {
    const [state, setState] = useState({
        volume: 0.1,
        autoPlay: true
    });
    const playerRef = useRef(null);
    const {
        autoPlay,
        volume
    } = state;
    return (
        
        <div className="home">
            <ReactPlayer ref={playerRef} autoPlay={autoPlay} volume={volume} url="/assets/final.mp4" controls width="100%" height="100%" className="video" loop ></ReactPlayer>
           
            <Navigation />
            <div className="heya"><h1>ssbm</h1></div>
            {/* <div className="volume-controler" ><input type="range" name="volumeCtrm" id="volumeCtrl"/></div> */}
            <Scene />
            
            
            
        </div>
    )
    
    
};

export default Home;