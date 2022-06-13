import React, { useContext, useEffect } from "react";
import { Container, IconButton, Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
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

const WatchedList = () => {
  const navigate = useNavigate();
  const { getWatchedList, watchedList, removeMovieFromWatchedList } =
    useContext(watchedListContext);
  useEffect(() => {
    getWatchedList();
  }, []);

  return (
    <Container>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Movie</TableCell>
              <TableCell align="right">Rating</TableCell>
              <TableCell align="right">Info</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {watchedList &&
              watchedList?.movies.map(row => (
                <TableRow
                  key={row.item.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {row.item.title}
                  </TableCell>
                  <TableCell align="right">{row.item.price}</TableCell>

                  <TableCell align="right">{row.subPrice}</TableCell>
                  <TableCell align="right">
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
      <Box
        style={{
          margin: "30px 20px",
          display: "flex",
          justifyContent: "flex-end",
        }}></Box>
    </Container>
  );
};

export default WatchedList;

{
  /* <TableCell align="right">
<IconButton
  onClick={() =>
    changeProductCount(row.count - 1, row.item.id)
  }
  aria-label="delete">
  <RemoveIcon />
</IconButton>
{row.count}
<IconButton
  onClick={() =>
    changeProductCount(row.count + 1, row.item.id)
  }
  aria-label="delete">
  <AddIcon />{" "}
</IconButton>
</TableCell> */
}
