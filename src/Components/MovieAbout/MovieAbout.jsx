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
              marginRight: "0",
            }}>
            <Box
              sx={{
                margin: { xs: "0 auto", sm: "0 auto", md: "0 auto", lg: "0" },
              }}
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
              paddingTop={"40px"}
              textAlign={"center"}>
              <Typography marginBottom={"20px"} variant="h5">
                {oneMovie.title}
                <Typography
                  paragraph
                  sx={{ display: { xs: "block", sm: "block", lg: "none" } }}>
                  ✩ {oneMovie.rating}{" "}
                </Typography>
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
            <Box
              paddingTop={"40px"}
              marginLeft={"15px"}
              sx={{
                display: { xs: "none", sm: "none", md: "none", lg: "block" },
              }}>
              <Typography marginBottom={"20px"} variant="h5">
                ✩ {oneMovie.rating}
              </Typography>
              <Box>
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
            </Box>
          </Container>
          <Box
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            textAlign={"left"}
            margin={"0 auto"}
            marginTop={"20px"}
            maxWidth={"1000px"}>
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
