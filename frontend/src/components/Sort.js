import React, { useState, } from "react";
import { Select, MenuItem, FormControl, InputLabel} from "@mui/material";
import SortIcon from '@mui/icons-material/Sort';
import "./sort.css"
import axios from "axios";
import {config} from "../App"

function Sort({setVideos}){
    // const [sort, setSort] = useState("");

    let handleChange = async(e) =>{
      try {
        console.log(`${config.endpoint}/videos?sortBy=${e.target.value}`)
        let res = await axios.get(`${config.endpoint}/videos?sortBy=${e.target.value}`)
        setVideos(res.data.videos)
        console.log(res)
      } catch (error) {
        console.log(error)
      }
    }

    return(
    <FormControl fullWidth>
    <InputLabel id="demo-simple-select-label" className="labe">Sort by</InputLabel>
    <Select
      className="select"
      labelId="demo-simple-select-label"
      sx={{ height: 35, width: 180, borderRadius: 6 }}
      onChange = {(e)=>{handleChange(e)}}
    >
      <MenuItem value="releaseDate" id="release-date-option">
        Sort By: Release Date
      </MenuItem>
      <MenuItem value="viewCount" id="view-count-option">
        Sort By: View Count
      </MenuItem>
    </Select>
    </FormControl>
    )
}

export default Sort;