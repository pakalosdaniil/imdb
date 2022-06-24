import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { grey } from "@mui/material/colors";
import { watchedListContext } from "../../Contexts/watchedListContext";
import { Badge, IconButton, MenuItem } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ReceiptIcon from "@mui/icons-material/Receipt";
import HomeIcon from "@mui/icons-material/Home";
import MovieIcon from "@mui/icons-material/Movie";
import { useContext } from "react";
import { authContext } from "../../Contexts/authContext";

function MenuList() {
  const navigate = useNavigate();
  const { admin } = useContext(authContext);

  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const { count, getWatchedList } = React.useContext(watchedListContext);
  React.useEffect(() => {
    getWatchedList();
  }, []);

  <MenuItem>
    <IconButton size="large">
      <Badge badgeContent={count} color="error">
        <BookmarkBorderIcon />
      </Badge>
    </IconButton>
    <p>Watch List</p>
  </MenuItem>;

  const list = anchor => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}>
      <List>
        <ListItem onClick={() => navigate("/")}>
          <ListItemButton>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary={"Home"} />
          </ListItemButton>
        </ListItem>
        <ListItem onClick={() => navigate("/payment")}>
          <ListItemButton>
            <ListItemIcon>
              <ReceiptIcon />
            </ListItemIcon>
            <ListItemText primary={"IMDb Pro"} />
          </ListItemButton>
        </ListItem>
        <ListItem onClick={() => navigate("/movies")}>
          <ListItemButton>
            <ListItemIcon>
              <MovieIcon />
            </ListItemIcon>
            <ListItemText primary={"Movies"} />
          </ListItemButton>
        </ListItem>
        <ListItem onClick={() => navigate("/watched-list")}>
          <ListItemButton>
            <ListItemIcon>
              <Badge badgeContent={count} color="error">
                <BookmarkBorderIcon />
              </Badge>
            </ListItemIcon>
            <ListItemText primary={"Watchlist"} />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        {admin ? (
          <ListItem onClick={() => navigate("/add-movie")}>
            <ListItemButton>
              <ListItemIcon>
                <AddCircleIcon />
              </ListItemIcon>
              <ListItemText primary={"Add movie"} />
            </ListItemButton>
          </ListItem>
        ) : null}
      </List>
    </Box>
  );

  return (
    <div>
      {["left"].map(anchor => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>
            <MenuIcon
              sx={{ color: grey[500], width: "30px", height: "30px" }}
            />
          </Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}

export default MenuList;
