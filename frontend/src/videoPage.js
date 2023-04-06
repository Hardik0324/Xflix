import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Stack, Grid } from "@mui/material";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { config } from "./App";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "./components/Header";
import "./videoPage.css";
import Card1 from "./components/Card1"

const VideoPage = () => {
  const [videoData, setVideoData] = useState("");
  const [upVotes, setUpVotes] = useState(0);
  const [downVotes, setDownVotes] = useState(0);
  const [videos, setVideos] = useState([]);
  let { id } = useParams();

  const videoId = async () => {
    try {
      console.log(id);
      let res = await axios.get(`${config.endpoint}/videos/${id}`);
      console.log(res.data);
      setVideoData(res.data);
      setUpVotes(res.data.votes.upVotes);
      setDownVotes(res.data.votes.downVotes);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchVideos = async () => {
    try {
      const URL = `${config.endpoint}/videos`;
      const res = await axios.get(URL);
      setVideos(res.data.videos);
    } catch (e) {
      console.log(e);
    }
  };

  const views = async () => {
    try {
      let res = await axios.patch(`${config.endpoint}/videos/${id}/views`);
      return res;
    } catch (e) {
      console.log(e);
    }
  };

  const handleUpVote = async () => {
    try {
      let res = await axios.patch(`${config.endpoint}/videos/${id}/votes`, {
        data: {
          vote: "upVote",
          change: "increase",
        },
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status === 204) {
        setUpVotes(upVotes + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleDownVote = async () => {
    try {
      let res = await axios.patch(`${config.endpoint}/videos/${id}/votes`, {
        data: {
          vote: "downVote",
          change: "increase",
        },
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status === 204) {
        setDownVotes(downVotes + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    videoId();
    views();
    fetchVideos();
  }, []);

  return (
    <Box>
      <Header show={false}/>
      <Box className="videodisp">
        <iframe
          className="video"
          width="90%"
          height="660"
          src={`https://${videoData.videoLink}`}
          frameBorder="0"
          allow="autoplay;"
          allowFullScreen
          title={`${videoData.title}`}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: "0% 10%",
            textColor: "#FFFFFF",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h5" sx={{ position: "", fontSize: "1.5rem" }} className="vidtex">
              {videoData.title}
            </Typography>
            <Typography variant="p" className="vidtex">{videoData.viewCount} Views</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              padding: "2rem 0",
            }}
          >
            <Typography className="vidtex">Suggested for: {videoData.contentRating}</Typography>
            <Stack direction={"row"} spacing={2}>
              <Button
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  backgroundColor: "#4CA3FC",
                  borderRadius: "18px",
                }}
                onClick={() => handleUpVote()}
              >
                <ThumbUpIcon variant="p" sx={{ color: "white" }} />
                <Typography style={{ color: "white", fontWeight: "bold" }} className="vidtex">
                  {upVotes}
                </Typography>
              </Button>
              <Button
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  backgroundColor: "#212121",
                  borderRadius: "18px",
                }}
                onClick={() => handleDownVote()}
              >
                <ThumbDownIcon variant="p" sx={{ color: "white" }} />
                <Typography style={{ color: "white", fontWeight: "bold" }} className="vidtex">
                  {downVotes}
                </Typography>
              </Button>
            </Stack>
          </Box>
          <hr />
        </Box>
        <Box>
          <Card1 videos={videos}/>
        </Box>
      </Box>
    </Box>
  );
};

export default VideoPage;
