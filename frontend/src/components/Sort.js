import React, { useState, } from "react";
import { Select, MenuItem, FormControl, InputLabel} from "@mui/material";
import SortIcon from '@mui/icons-material/Sort';
import "./sort.css"
import axios from "axios";
import {config} from "../App"

function Sort({setVideos}){
  const [sort, setSort] = useState("releaseDate");

    let handleChange = async(e) =>{
      setSort(e.target.value);
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
      <Select
        value={sort}
        className="sort-select"
        // startDecorator={<ImportExportIcon color="white" />}
        onChange={(e) => handleChange(e)}
        sx={{ height: 35, width: 180, borderRadius: 6 }}
      >
        <MenuItem value="releaseDate" id="release-date-option">
          Sort By: Release Date
        </MenuItem>
        <MenuItem value="viewCount" id="view-count-option">
          Sort By: View Count
        </MenuItem>
      </Select>
    )
}

export default Sort;