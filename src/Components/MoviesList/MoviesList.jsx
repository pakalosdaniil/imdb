import { Box, Button, Container, Pagination } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { moviesContext } from "../../Contexts/moviesContext";
import MovieCard from "../MovieCard/MovieCard";
import { grey } from "@mui/material/colors";

const MoviesList = () => {
  const { getMovies, movies, pages } = useContext(moviesContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(1);

  useEffect(() => {
    setSearchParams({
      _page: page,
      _limit: 3,
    });
  }, [page]);

  useEffect(() => {
    getMovies();
  }, [searchParams]);

  useEffect(() => {
    getMovies();
  }, []);
  return (
    <Container>
      <Box
        sx={{ bgcolor: grey[200] }}
        display={"flex"}
        flexWrap={"wrap"}
        justifyContent={"center"}
        padding={"30px"}>
        {movies.map(item => (
          <MovieCard key={item.id} item={item} />
        ))}
      </Box>
      <Box
        style={{ display: "flex", justifyContent: "center" }}
        sx={{ bgcolor: grey[200] }}>
        <Pagination
          page={page}
          count={isNaN(pages) ? 0 : pages}
          shape="rounded"
          size="large"
          onChange={(e, value) => setPage(value)}
        />
      </Box>
    </Container>
  );
};

export default MoviesList;

<Pagination count={10} color="primary" />;
