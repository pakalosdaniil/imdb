import React, { useContext, useEffect } from "react";
import { Container, IconButton, Typography } from "@mui/material";
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
import { grey } from "@mui/material/colors";

import ShareList from "../ShareList/ShareList";

const WatchedList = () => {
  const navigate = useNavigate();
  const { getWatchedList, watchedList, removeMovieFromWatchedList } =
    useContext(watchedListContext);
  useEffect(() => {
    getWatchedList();
  }, []);

  return (
    <>
      <IconButton sx={{ display: { xs: "none", sm: "none", lg: "flex" } }}>
        <ShareList />
      </IconButton>
      <Container
        style={{ maxWidth: "900px", height: "705px" }}
        sx={{
          bgcolor: grey[200],
        }}>
        <Typography style={{ margin: "15px" }} variant="h6">
          Your Watchlist
        </Typography>
        <TableContainer component={Paper}>
          <Table sx={{ maxidth: "100%" }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Movie</TableCell>
                <TableCell align="center">Year</TableCell>
                <TableCell align="center">Rating</TableCell>
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
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ fontSize: "14px" }}>
                      {row.item.title}
                    </TableCell>
                    <TableCell align="center" sx={{ fontSize: "13px" }}>
                      {row.item.year}
                    </TableCell>

                    <TableCell align="center" sx={{ fontSize: "13px" }}>
                      {row.item.rating}
                    </TableCell>
                    <TableCell align="center" sx={{ padding: "0" }}>
                      <IconButton
                        onClick={() => removeMovieFromWatchedList(row.item.id)}
                        aria-label="delete">
                        <DeleteForeverIcon />
                      </IconButton>
                      <IconButton
                        sx={{
                          width: "10px",
                          height: "10px",
                        }}
                        onClick={() => navigate(`/movies/${row.item.id}`)}>
                        <InfoIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
};

export default WatchedList;
