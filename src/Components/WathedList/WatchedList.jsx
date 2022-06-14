import React, { useContext, useEffect } from "react";
import { Container, IconButton, Box, Typography } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import InfoIcon from "@mui/icons-material/Info";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import { watchedListContext } from "../../Contexts/watchedListContext";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import SaveIcon from "@mui/icons-material/Save";
import PrintIcon from "@mui/icons-material/Print";
import ShareIcon from "@mui/icons-material/Share";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";

const WatchedList = () => {
  const navigate = useNavigate();
  const { getWatchedList, watchedList, removeMovieFromWatchedList } =
    useContext(watchedListContext);
  useEffect(() => {
    getWatchedList();
  }, []);

  const actions = [
    { icon: <SaveIcon />, name: "Save" },
    { icon: <TwitterIcon />, name: "Twitter" },
    { icon: <InstagramIcon />, name: "Instagram" },
    { icon: <FacebookIcon />, name: "Facebook" },
  ];

  return (
    <>
      <Container style={{ maxWidth: "900px" }}>
        <Typography style={{ margin: "15px" }} variant="h6">
          Your Watchlist
        </Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Movie</TableCell>
                <TableCell align="right">Year</TableCell>
                <TableCell align="right">Rating</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {watchedList &&
                watchedList?.movies.map(row => (
                  <TableRow
                    key={row.item.id}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}>
                    <TableCell component="th" scope="row">
                      {row.item.title}
                    </TableCell>
                    <TableCell align="right">{row.item.year}</TableCell>

                    <TableCell align="right">{row.item.rating}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        onClick={() => removeMovieFromWatchedList(row.item.id)}
                        aria-label="delete">
                        <DeleteForeverIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => navigate(`/movies/${row.item.id}`)}>
                        <InfoIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        {/* <Box
          style={{
            margin: "30px 20px",
            display: "flex",
            justifyContent: "flex-end",
          }}></Box> */}
      </Container>
      <Box sx={{ height: 320, transform: "translateZ(0px)", flexGrow: 1 }}>
        <SpeedDial
          ariaLabel="SpeedDial basic example"
          sx={{ position: "absolute", bottom: 26, right: 86 }}
          icon={<ShareIcon />}>
          {actions.map(action => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
            />
          ))}
        </SpeedDial>
      </Box>
    </>
  );
};

export default WatchedList;
