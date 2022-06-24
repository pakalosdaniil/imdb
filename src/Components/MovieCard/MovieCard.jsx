import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { moviesContext } from "../../Contexts/moviesContext";
import { watchedListContext } from "../../Contexts/watchedListContext";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import StarIcon from "@mui/icons-material/Star";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Button, Menu, MenuItem } from "@mui/material";
import "../../App.css";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import { grey } from "@mui/material/colors";

const MovieCard = ({ item }) => {
  const [anchor, setAnchor] = useState(null);
  const isShareMenuOpen = Boolean(anchor);
  const handleShareMenuOpen = event => {
    setAnchor(event.currentTarget);
  };
  const handleShareMenuClose = () => {
    setAnchor(null);
  };

  const shareMenuId = "share-menu";
  const renderShareMenu = (
    <Menu
      id="basic-menu"
      anchorEl={anchor}
      open={isShareMenuOpen}
      onClose={handleShareMenuClose}
      MenuListProps={{
        "aria-labelledby": "basic-button",
      }}>
      <MenuItem onClick={handleShareMenuClose}>
        <Button sx={{ color: "gray" }} size="small">
          <InstagramIcon />
        </Button>
      </MenuItem>
      <MenuItem onClick={handleShareMenuClose}>
        <Button sx={{ color: "gray" }} size="small">
          <FacebookIcon />
        </Button>
      </MenuItem>
      <MenuItem onClick={handleShareMenuClose}>
        <Button sx={{ color: "gray" }} size="small">
          <TwitterIcon />
        </Button>
      </MenuItem>
    </Menu>
  );

  const [anchorEl, setAnchorEl] = useState(null);
  const isMoreMenuOpen = Boolean(anchorEl);
  const handleMoreMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleMoreMenuClose = () => {
    setAnchorEl(null);
  };

  const moreMenuId = "share-menu";
  const renderMoreMenu = (
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={isMoreMenuOpen}
      onClose={handleMoreMenuClose}
      MenuListProps={{
        "aria-labelledby": "basic-button",
      }}>
      <MenuItem onClick={handleMoreMenuClose}>
        <Button
          sx={{ color: "gray" }}
          size="small"
          onClick={() => deleteMovie(item.id)}>
          <DeleteIcon />
        </Button>
      </MenuItem>
      <MenuItem onClick={handleMoreMenuClose}>
        <Button
          sx={{ color: "gray" }}
          size="small"
          onClick={() => navigate(`/edit/${item.id}`)}>
          <EditIcon />
        </Button>
      </MenuItem>
    </Menu>
  );

  const navigate = useNavigate();
  const { deleteMovie } = useContext(moviesContext);
  const { addMovieToWatchedList, checkMovieInWatchedList } =
    useContext(watchedListContext);
  const [checkMovie, setCheckMovie] = useState(checkMovieInWatchedList(item));

  return (
    <Card
      sx={{
        margin: 1,
        maxWidth: 300,
        width: { xs: "220px", sm: "230px", md: "230px", lg: "280px" },
      }}>
      <CardHeader
        sx={{
          width: { xs: "300px", sm: "300px", md: "300px", lg: "300px" },
          height: { xs: "68px" },
        }}
        action={
          <IconButton
            size="large"
            aria-label="show more"
            aria-controls={moreMenuId}
            aria-haspopup="true"
            onClick={handleMoreMenuOpen}
            color="inherit"
            style={{ marginRight: "10px" }}>
            <MoreVertIcon />
          </IconButton>
        }
        title={item.title}
        subheader={item.year + " | ✩ " + item.rating + "/10"}
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
        {/* <IconButton>
          <StarIcon />
        </IconButton> */}
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
            <BookmarkAddIcon sx={{ color: grey[600] }} />
          )}
        </Button>
        <Button size="small" onClick={() => navigate(`/movies/${item.id}`)}>
          <MoreHorizIcon sx={{ color: grey[600] }} />
        </Button>

        <IconButton
          aria-label="share"
          onClick={handleShareMenuOpen}
          aria-controls={shareMenuId}>
          <ShareIcon />
        </IconButton>
      </CardActions>
      {renderMoreMenu}
      {renderShareMenu}
    </Card>
  );
};
export default MovieCard;
