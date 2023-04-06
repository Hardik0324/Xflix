import React, { useState } from "react";
import { Button, Box, Modal, Typography, TextField } from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import axios from 'axios';
import {config} from '../App';
import "./Upload.css"

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Upload = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  const [showDate, setShowDate] = useState(true);
  const [formData, setFormData] = useState({
    videoLink: "",
    title: "",
    genre: "",
    contentRating: "",
    releaseDate: "",
    previewImage: "",
  });

  let handleChange = (e) => {
    let [key, value] = [e.target.id, e.target.value];
    // console.log(key, value);
    setFormData({ ...formData, [key]: value });
  };

  let handleGenreChange = (e) => {
    let [key, value] = ["genre", e.target.value];
    // console.log(key, value);
    setFormData({ ...formData, [key]: value });
  };

  let handleAgeChange = (e) => {
    let [key, value] = ["contentRating", e.target.value];
    // console.log(key, value);
    setFormData({ ...formData, [key]: value });
  };

  let handleDateChange = (e) => {
    let date = new Date(e.target.value).toUTCString();
    // console.log(date);
    const dateArray = date.split(' ');
    const datestr = dateArray[1]+" "+ dateArray[2] +" "+ dateArray[3];
    let [key, value] = ['releaseDate', datestr];
    setFormData({...formData, [key]:value})
  };

  let handleSubmit = async ()=>{
    try{
    // console.log(formData);
    // console.log(`${config.endpoint}/videos`);
    const res = await axios.post(`${config.endpoint}/videos`, formData);
    console.log(res);
    setOpen(false);
    } catch(err){
      console.log(err)
    }

  }

  return (
    <Box>
      <Button
        variant="contained"
        color="primary"
        sx={{ color: "#FFFFFF", bgcolor: "#4CA3FC" }}
        startIcon={<UploadIcon />}
        onClick={handleOpen}
      >
        Upload
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          style={style}
          sx={{
            bgcolor: "background.paper",
          }}
          className="moda"
        >
          <div className="headx">
          <Typography variant="h6" className="modtext1">Upload Video</Typography>
          <Typography
              id="modal-modal-title"
              variant="body1"
              component="h4"
              sx={{ color: "white", margin: "10px 15px 15px 0"}}
              onClick={handleClose}
            >
              X
            </Typography>
            </div>
          <Box className="moda1">
            <TextField
              id="videoLink"
              value={formData.videoLink}
              label="Video Link"
              variant="outlined"
              className="modtext"
              onChange={(e) => handleChange(e)}
            />
            <Typography
              variant="caption"
              display="block"
              gutterBottom
              sx={{ margin: "5px 0 20px 10px" }}
              className="modtext4"
            >
              This link will be used to derive the video
            </Typography>
            <TextField
              id="previewImage"
              value={formData.previewImage}
              label="Thumbnail Image Link"
              variant="outlined"
              className="modtext"
              onChange={(e) => handleChange(e)}
            />
            <Typography
              variant="caption"
              display="block"
              gutterBottom
              sx={{ margin: "5px 0 20px 10px" }}
              className="modtext4"
            >
              This link will be used to preview the thumbnail image
            </Typography>
            <TextField id="title" value={formData.title} label="Title" variant="outlined" className="modtext" onChange={(e) => handleChange(e)}/>
          <Typography
            variant="caption"
            display="block"
            gutterBottom
            sx={{ margin: "5px 0 20px 10px" }}
            className="modtext4"
          >
            The title will be the representative text for video
          </Typography>
            <FormControl
            fullWidth
            // sx={{ border: "1px solid white", borderRadius: "5px" }}
            className="modtext"
          >
            <InputLabel
              id="demo-simple-select-label"
              sx={{ color: "white" }}
            >
              Genre
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="genre"
              value={formData.genre}
              label="Genre"
              onChange={(e) => handleGenreChange(e)}
              sx={{
                ".MuiSvgIcon-root ": {
                  fill: "white !important",
                },
                ".MuiSelect-select": {
                  color: "white !important",
                },
              }}
              inputProps={{
                MenuProps: {
                  MenuListProps: {
                    sx: {
                      backgroundColor: "#3b3b3b",
                      color: "white",
                    },
                  },
                },
              }}
            >
              <MenuItem value="Education">Education</MenuItem>
              <MenuItem value="Sports">Sports</MenuItem>
              <MenuItem value="Comedy">Comedy</MenuItem>
              <MenuItem value="Lifestyle">Lifestyle</MenuItem>
            </Select>
          </FormControl>
          <Typography
            variant="caption"
            display="block"
            gutterBottom
            sx={{ margin: "5px 0 20px 10px" }}
            className="modtext4"
          >
            Genre will help in categorizing your videos
          </Typography>
          <FormControl
            fullWidth
            className="modtext"
          >
            <InputLabel
              id="demo-simple-select-label"
              sx={{ color: "white" }}
            >
              Suitable age group for the clip
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="Age"
              value={formData.contentRating}
              label="Age"
              onChange={(e) => handleAgeChange(e)}
              sx={{
                ".MuiSvgIcon-root ": {
                  fill: "white !important",
                },
                ".MuiSelect-select": {
                  color: "white !important",
                },
              }}
              inputProps={{
                MenuProps: {
                  MenuListProps: {
                    sx: {
                      backgroundColor: "#3b3b3b",
                      color: "white",
                    },
                  },
                },
              }}
            >
              <MenuItem value="7+">7+</MenuItem>
              <MenuItem value="12+">12+</MenuItem>
              <MenuItem value="16+">16+</MenuItem>
              <MenuItem value="18+">18+</MenuItem>
            </Select>
          </FormControl>
          <Typography
            variant="caption"
            display="block"
            gutterBottom
            sx={{ margin: "5px 0 20px 10px" }}
            className="modtext4"
          >
            This will be used to filter videos on age group suitability
          </Typography>
          <FormControl
            fullWidth
            variant="outlined"
            className="modtext"
          >
            <InputLabel
              htmlFor="outlined-adornment-password"
              sx={{ color: "#FFFFFF99" }}
            >
              Release Date
            </InputLabel>
            <OutlinedInput
              id="releaseDate"
              type={showDate ? "text" : "date"}
              onFocus={() => setShowDate(false)}
              onBlur={() => setShowDate(true)}
              color="secondary"
              onChange={(e) => handleDateChange(e)}
              sx={{ input: { color: "#FFFFFF99" } }}
              InputProps={{
                style: { color: "#fff" },
              }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    edge="end"
                    size="small"
                    sx={{ color: "#FFFFFF99" }}
                  >
                    {showDate ? <CalendarTodayIcon /> : null}
                  </IconButton>
                </InputAdornment>
              }
              label="date"
            />
          </FormControl>
          <Typography
            variant="caption"
            display="block"
            gutterBottom
            sx={{ margin: "5px 0 20px 10px" }}
            className="modtext4"
          >
            This will be used to sort videos
          </Typography>
          </Box>
          <Box className="moda2">
            <button className="modbut" onClick={()=>handleSubmit()}>UPLOAD VIDEO</button>
            <button className="modbut" onClick={handleClose}>Cancel</button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default Upload;