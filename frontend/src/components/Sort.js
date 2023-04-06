import React, { useState, } from "react";
import { Select, MenuItem } from "@mui/material";
import SortIcon from '@mui/icons-material/Sort';
import "./sort.css"

function Sort(){
    const [sort, setSort] = useState("releaseDate");

    return(
    <Select
      className="select"
      value={sort}
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