import { Box, Button, Container, Pagination } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { moviesContext } from "../../Contexts/moviesContext";
import MovieCard from "../MovieCard/MovieCard";

const MoviesList = () => {
  const { getMovies, movies, pages } = useContext(moviesContext);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  useEffect(() => {
    getMovies();
  }, []);
  return (
    <Container>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}>
        <Button
          variant="outlined"
          style={{ margin: "30px" }}
          onClick={() => navigate("/add-movie")}>
          +
        </Button>
      </div>
      <Box
        display={"flex"}
        flexWrap={"wrap"}
        justifyContent={"center"}
        padding={"30px"}>
        {movies.map(item => (
          <MovieCard key={item.id} item={item} />
        ))}
      </Box>
      <Box style={{ display: "flex", justifyContent: "center" }}>
        <Pagination
          page={page}
          count={isNaN(pages) ? 0 : pages}
          variant="outlined"
          shape="rounded"
          onChange={(e, value) => setPage(value)}
        />
      </Box>
    </Container>
  );
};

export default MoviesList;
