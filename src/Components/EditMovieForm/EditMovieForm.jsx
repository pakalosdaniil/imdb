import { Button, TextField, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { moviesContext } from "../../Contexts/moviesContext";

const EditMovieForm = () => {
  const { getOneMovie, oneMovie, updatedMovie } = useContext(moviesContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState("");
  const [cover, setCover] = useState("");
  const [trailer, setTrailer] = useState("");

  function handleValues() {
    let editedMovie = {
      title,
      year,
      description,
      rating: +rating,
      cover,
      trailer,
    };

    if (
      !title.trim() ||
      !year ||
      !description.trim() ||
      !rating ||
      !cover.trim()
    ) {
      alert("Use your power to fill all gaps");
      return;
    }
    updatedMovie(id, editedMovie);
    navigate("/movies");
  }
  useEffect(() => {
    getOneMovie(id);
  }, []);

  useEffect(() => {
    if (oneMovie) {
      setTitle(oneMovie.title);
      setYear(oneMovie.year);
      setDescription(oneMovie.description);
      setRating(oneMovie.rating);
      setCover(oneMovie.cover);
      setTrailer(oneMovie.trailer);
    }
  }, [oneMovie]);

  return (
    <>
      <Container maxWidth="sm">
        <Box
          padding={"30px"}
          display={"flex"}
          flexDirection={"column"}
          textAlign={"center"}>
          <Typography variant="h4" component="h2">
            Edit movie
          </Typography>

          <TextField
            value={title}
            onChange={e => setTitle(e.target.value)}
            style={{ margin: "10px" }}
            id="standard-basic"
            label="Title"
            variant="standard"
          />

          <TextField
            type="number"
            value={year}
            onChange={e => setYear(+e.target.value)}
            style={{ margin: "10px" }}
            id="standard-basic"
            label="Year"
            variant="standard"
          />

          <TextField
            value={description}
            onChange={e => setDescription(e.target.value)}
            style={{ margin: "10px" }}
            id="standard-basic"
            label="Description"
            variant="standard"
          />

          <TextField
            type="number"
            value={rating}
            onChange={e => setRating(+e.target.value)}
            style={{ margin: "10px" }}
            id="standard-basic"
            label="IMDb Rating"
            variant="standard"
          />

          <TextField
            value={cover}
            onChange={e => setCover(e.target.value)}
            style={{ margin: "10px" }}
            id="standard-basic"
            label="Cover"
            variant="standard"
          />

          <TextField
            value={trailer}
            onChange={e => setTrailer(e.target.value)}
            style={{ margin: "10px" }}
            id="standard-basic"
            label="Trailer ID"
            variant="standard"
          />

          <Button
            onClick={handleValues}
            style={{ margin: "10px" }}
            variant="contained"
            color="success">
            Save
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default EditMovieForm;
