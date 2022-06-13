import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { moviesContext } from "../../Contexts/moviesContext";
import { watchedListContext } from "../../Contexts/watchedListContext";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import StarIcon from "@mui/icons-material/Star";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import YouTube from "react-youtube";
import { Button } from "@mui/material";

const ExpandMore = styled(props => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const MovieCard = ({ item }) => {
  const opts = {
    height: "494",
    width: "350",
    playerVars: {
      src: item.trailer,
      autoplay: 0,
    },
  };

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const navigate = useNavigate();
  const { deleteMovie } = useContext(moviesContext);
  const { addMovieToWatchedList, checkMovieInWatchedList } =
    useContext(watchedListContext);
  const [checkMovie, setCheckMovie] = useState(checkMovieInWatchedList(item));

  return (
    <Card sx={{ margin: 1, maxWidth: 350 }}>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={item.title}
        subheader={item.year + " | " + item.rating + "/10"}
      />
      <CardMedia
        component="img"
        height="494"
        image={item.cover}
        alt="Movie Cover"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {item.description.length
            ? `${item.description.slice(0, 90)}...`
            : item.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton>
          <StarIcon />
        </IconButton>
        <Button
          onClick={() => {
            addMovieToWatchedList(item);
            setCheckMovie(checkMovieInWatchedList(item));
            console.log(checkMovie);
          }}
          size="small">
          {checkMovie ? (
            <BookmarkAddedIcon />
          ) : (
            <BookmarkAddIcon sx={{ color: "gray" }} />
          )}
        </Button>
        <Button size="small" onClick={() => navigate(`/movies/${item.id}`)}>
          <MoreHorizIcon />
        </Button>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <Button size="small" onClick={() => navigate(`/edit/${item.id}`)}>
          <EditIcon />
        </Button>

        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more">
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Official Trailer:</Typography>
          <YouTube videoId={item.trailer} opts={opts} />
        </CardContent>
      </Collapse>
    </Card>
  );
};
export default MovieCard;

{
  /* <Button size="small" onClick={() => deleteMovie(item.id)}>
<DeleteIcon />
</Button> */
}
