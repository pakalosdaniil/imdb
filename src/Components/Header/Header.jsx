import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import MoreIcon from "@mui/icons-material/MoreVert";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { watchedListContext } from "../../Contexts/watchedListContext";
import mainLogo from "../../images/IMDb-Logo.svg";
import proLogo from "../../images/IMDb-Pro-Logo.svg";
import { Button, Slider, Tooltip } from "@mui/material";
import { moviesContext } from "../../Contexts/moviesContext";
import React, { useContext, useEffect, useState } from "react";
import { grey } from "@mui/material/colors";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.2),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.35),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "400px",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "400px",
    },
  },
}));

export default function PrimarySearchAppBar() {
  const navigate = useNavigate();
  const { count, getWatchedList } = useContext(watchedListContext);
  useEffect(() => {
    getWatchedList();
  }, []);
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = event => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}>
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}>
      <MenuItem onClick={() => navigate("/watched-list")}>
        <IconButton size="large">
          <Badge badgeContent={count} color="error">
            <BookmarkBorderIcon />
          </Badge>
        </IconButton>
        <p>Watch List</p>
      </MenuItem>

      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit">
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );
  const { getMovies } = useContext(moviesContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(
    searchParams.get("q") ? searchParams.get("q") : ""
  );
  const [page, setPage] = useState(1);
  const [rating, setRating] = useState([0, 10]);

  useEffect(() => {
    setSearchParams({
      q: search,
      rating_gte: rating[0],
      rating_lte: rating[1],
      _page: page,
      _limit: 3,
    });
  }, [search, rating, page]);

  useEffect(() => {
    getMovies();
  }, [searchParams]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ bgcolor: grey[900] }}>
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}>
            <Link to="/">
              <img
                style={{
                  width: "120px",
                  height: "70px",
                  marginLeft: "35px",
                  paddingTop: "7px",
                }}
                src={mainLogo}
              />
            </Link>
          </Typography>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            style={{ width: "120px", height: "70px", marginLeft: "15px" }}
            sx={{ mr: 2 }}>
            <MenuIcon style={{ width: "30px", height: "30px" }} />
            <Typography style={{ marginLeft: "15px", fontSize: "25px" }}>
              Menu
            </Typography>
          </IconButton>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              onChange={e => setSearch(e.target.value)}
              value={search}
            />
          </Search>
          <Tooltip title="Rating range">
            <Slider
              style={{
                width: "140px",
                marginLeft: "25px",
                marginRight: "20px",
                color: grey[700],
              }}
              getAriaLabel={() => "Temperature range"}
              value={rating}
              onChange={(e, value) => setRating(value)}
              valueLabelDisplay="auto"
              min={1}
              max={10}
              step={0.5}
            />
          </Tooltip>
          <Link to="/payment">
            <img
              style={{ width: "120px", height: "70px", marginLeft: "15px" }}
              src={proLogo}
              alt=""
            />
          </Link>
          <Button
            variant="outlined"
            sx={{
              bgcolor: grey[900],
              color: "white",
              borderColor: "white",
              "&:hover": {
                backgroundColor: grey[200],
                color: "black",
                borderColor: grey[900],
              },
            }}
            style={{ marginLeft: "20px" }}
            onClick={() => navigate("/add-movie")}>
            ADD MOVIE
          </Button>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Link to="/watched-list">
              <Tooltip title="Watchlist">
                <IconButton
                  size="large"
                  style={{ marginRight: "15px" }}
                  sx={{ borderColor: "white" }}>
                  <Badge badgeContent={count} color="error">
                    <BookmarkBorderIcon />
                  </Badge>
                </IconButton>
              </Tooltip>
            </Link>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
              style={{ marginRight: "15px" }}>
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit">
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
