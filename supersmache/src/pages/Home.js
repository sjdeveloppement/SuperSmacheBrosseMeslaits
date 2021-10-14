import Navigation from "../components/Navigation";
import Scene from "../components/Scene";


const Home = () => {
    return (
        
        <div className="home">
            <video autoPlay={true} muted={true} loop className="video" id="video" width="100%">
                <source src='/assets/final.mp4' type="video/mp4" />
            </video>
            <Navigation />
            <div className="heya"><h1>ssbm</h1></div>
            
            <Scene />
            
            
            
        </div>
    )
};

export default Home;