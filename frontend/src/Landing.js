import Header from "./components/Header"
import Genre from "./components/Genre"
import {useState, useEffect} from "react"
import { config } from "./App";
import axios from "axios";
import Loader from "./components/Loader"
import Card1 from "./components/Card1"
import { VideoCameraFront } from "@mui/icons-material";

function Landing(){
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(false);

  let fetchVideos = async() =>{
    setLoading(true);
    try {
        const response = await axios.get(`${config.endpoint}/videos`)
        console.log(response)
        setVideos(response.data.videos)
    } catch (error) {
        console.log(error)
    }
    setLoading(false);
  }

  let setvid = (vid) =>{
    setVideos(vid)
  }

  useEffect(() => {
    fetchVideos()
  }, [])
    

  const genres = ["All Genre", "Education", "Sports", "Comedy", "Lifestyle"];
  const contentRating = ["Any age group", "7+", "12+", "16+", "18+"];
    return(
        <>
        <Header show={true} setvid={setvid}/>
        <Genre genres={genres} contentRating={contentRating} setVideos={setVideos}/>
        {loading ? (
        <Loader />
      ) : (
        <Card1 videos={videos}/>
      )}
        </>
    )
}

export default Landing;