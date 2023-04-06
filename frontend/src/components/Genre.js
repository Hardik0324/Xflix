import { Box, Chip, Stack } from "@mui/material";
import Sort from "./Sort";
import {useState} from "react"
import { config } from "../App";
import axios from "axios";
import "./Genre.css"

function Genre({genres, contentRating, setVideos}){

  const [genre, setGenre] = useState([])
  const [rating, setRating] = useState("")

  let genreChange = async(item)=>{
    let a;
    let genre1;
    if(genre.includes(item)){
      return;
    }
    else{
      genre1 = [...genre, item]
    }
    // console.log(genre1)/\
    setGenre(genre1)
    // console.log(genre)
    if (genre1.includes("All Genre")) 
    {
      console.log(1)
      a = "genres=All";
    } else {
      console.log(2)
      const joinedGenre = genre1.join(",");
      a = `genres=${joinedGenre}`;
    }
    console.log(genre1)
    console.log(`${config.endpoint}/videos?${a}`)
    try {
      const response = await axios.get(`${config.endpoint}/videos?${a}`)
      console.log(response)
      setVideos(response.data.videos)
    } catch (error) {
      console.log(error)
    }
  }

  const rateChange = async(age)=>{
    let url;
    let query;
    // console.log(age)
    if (age === rating) {
      age = "Any age group";
    }
    setRating(age);

    if ((age === "Any age group")) {
      query = "";
    } else {
      // console.log(1)
      age = age.replace("+", "%2B");
      query = `contentRating=${age}`;
    }
    url = `${config.endpoint}/videos?${query}`;
    console.log(url);
    try {
      const res = await axios.get(url);
      console.log(res.data.videos);
      setVideos(res.data.videos);
    } catch (error) {
      console.log(error);
    }
  }

    return(
    <Box className="gen">
      <Stack className="stack1" direction="row" justifyContent="center" spacing={1}>
        {genres.map((item) => (
          <Chip label={item} key={item} className="genre-btn" onClick={() => genreChange(item)}/>
        ))}
        <div className="sort">
        <Sort setVideos={setVideos}/>
        </div>
      </Stack>
      <Stack className="stack2" direction="row" justifyContent="center" spacing={4} sx={{ my: 2 }}>
        {contentRating.map((item) => (
          <Chip label={item} key={item} className="content-rating-btn" onClick={() => rateChange(item)}/>
        ))}
      </Stack>
    </Box>
    )
}

export default Genre;