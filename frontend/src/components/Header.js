import { TextField,
         InputAdornment
         } from '@mui/material';
import { Search } from "@mui/icons-material";
import Upload from './Upload';
import { useState } from 'react';
import {config} from "../App"
import axios from 'axios';
import "./Header.css"

function Header({show, setvid}){

    const [search, setSearch] = useState("")

    let searchVideo = async() =>{
        try {
            let res = await axios.get(`${config.endpoint}/videos?title=${search}`)
            console.log(res.data.videos)
            setvid(res.data.videos)
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <div className="header">
                <div className='headname'>
                <span className='text1'>X</span>
                <span className='text2'>Flix</span>
                </div>
                {show ?<>
                <TextField
                className="search"
                variant="outlined"
                size="small"
                onChange = {(e)=>setSearch(e.target.value)}
                InputProps={{
                    endAdornment: (
                    <InputAdornment position="end">
                    <Search color="white" onClick={()=>searchVideo()}/>
                    </InputAdornment>
                    ),
                    style: { color: "white" }
                }}
                placeholder="Search"
                name="search"
                />
                <Upload/>
                </>: <></>}
        </div>
    )
}

export default Header;