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
import YouTube from "react-youtube";

const MovieAbout = ({}) => {
  const { getOneMovie, oneMovie } = useContext(moviesContext);
  const params = useParams();
  const { id } = useParams();

  useEffect(() => {
    getOneMovie(id);
  }, []);

  return (
    <>
      {oneMovie ? (
        <>
          <Container
            sx={{
              display: "flex",
              flexDirection: "row",
              marginLeft: "220px",
              marginRight: "0",
            }}>
            <Box
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
              paddingTop={"40px"}
              textAlign={"center"}>
              <Typography marginBottom={"20px"} variant="h5">
                {oneMovie.title}
              </Typography>

              <Paper style={{ width: "283px", height: "424px" }} elevation={3}>
                <img
                  style={{
                    borderRadius: "2px",
                    width: "283px",
                    height: "425px",
                  }}
                  src={oneMovie.cover}
                  width="100%"
                  alt="product-photo"
                />
              </Paper>
            </Box>
            <Box paddingTop={"40px"} marginLeft={"15px"}>
              <Typography marginBottom={"20px"} variant="h5">
                ✩ {" ✩ " + oneMovie.rating}
              </Typography>

              <YouTube
                videoId={oneMovie.trailer}
                opts={{
                  height: "425px",
                  width: "650px",
                  playerVars: {
                    src: oneMovie.trailer,
                    autoplay: 0,
                  },
                }}
              />
            </Box>
          </Container>
          <Box
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            textAlign={"left"}
            marginTop={"20px"}
            maxWidth={"1000px"}
            marginLeft={"220px"}>
            <Paper>
              <Typography padding={"20px"} variant="h5">
                {oneMovie.description}
              </Typography>
            </Paper>
          </Box>
        </>
      ) : null}
    </>
  );
};

export default MovieAbout;
