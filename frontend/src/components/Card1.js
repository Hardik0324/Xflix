import { Grid, Card, CardMedia, CardContent, Typography, CardActionArea} from "@mui/material";
import { useHistory } from "react-router-dom";
import "./card1.css"

function Card1({videos}){

    const history = useHistory();
    const moment = require("moment");

    return(
        <Grid container rowSpacing={3} columnSpacing={1} pl={10} pr={10} className="carddisp">
          {videos.map((video) => (
            <Grid item xs={12} sm={6} md={3} key={video._id}>
                <Card className="video-tile-link" sx={{ maxWidth: 345, height: 260 }}>
                <CardActionArea className="video-tile" onClick={() => history.push(`/video/${video._id}`)}>
                <CardMedia
                 className="cardimg"
                 image={video.previewImage}
                 title={video.title}
                />
                <CardContent className="carddes">
                    <Typography gutterBottom variant="h5" component="div">
                        {video.title}
                    </Typography>
                    <Typography>{moment(video.releaseDate).fromNow()}</Typography>
                </CardContent>
                </CardActionArea>
                </Card>
            </Grid>
          ))}
        </Grid>
    )
}

export default Card1;