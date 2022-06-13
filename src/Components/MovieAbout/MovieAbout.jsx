import {
  Box,
  Breadcrumbs,
  Container,
  Link,
  Paper,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { moviesContext } from "../../Contexts/moviesContext";

const MovieAbout = () => {
  const { getOneMovie, oneMovie } = useContext(moviesContext);
  const params = useParams();
  const { id } = useParams();
  useEffect(() => {
    getOneMovie(id);
  }, []);

  return (
    <>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          Shop
        </Link>
        <Link underline="hover" color="inherit" href="/products">
          Products
        </Link>
        <Typography color="GrayText.primary"> Info </Typography>
      </Breadcrumbs>
      <Container>
        {oneMovie ? (
          <Box
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            paddingTop={"40px"}
            textAlign={"center"}>
            <Paper style={{ width: "40%" }} elevation={3}>
              <img
                style={{ borderRadius: "5px" }}
                src={oneMovie.cover}
                width="100%"
                alt="product-photo"
              />
            </Paper>
            <Typography variant="h5">{oneMovie.title}</Typography>
            <Typography style={{ maxWidth: "400px" }} variant="h5">
              {oneMovie.description}
            </Typography>
            <Typography variant="h5">{oneMovie.rating}</Typography>
          </Box>
        ) : null}
      </Container>
    </>
  );
};

export default MovieAbout;
