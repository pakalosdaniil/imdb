import { Box, Button, Container, TextField, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { moviesContext } from "../../Contexts/moviesContext";

// title, description, price, image
const AddProductFrom = () => {
  const { createMovie } = useContext(moviesContext);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState("");
  const [cover, setCover] = useState("");
  const [trailer, setTrailer] = useState("");

  function handleValues() {
    let newMovie = {
      title,
      year: +year,
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
    createMovie(newMovie);
    navigate("/movies");
  }

  return (
    <Container maxWidth="sm">
      <Box
        padding={"30px"}
        display={"flex"}
        flexDirection={"column"}
        textAlign={"center"}>
        <Typography variant="h4" component="h2">
          New Movie
        </Typography>

        <TextField
          value={title}
          onChange={e => setTitle(e.target.value)}
          style={{ margin: "10px" }}
          label="Title"
          variant="standard"
        />
        <TextField
          type="number"
          onChange={e => setYear(+e.target.value)}
          style={{ margin: "10px" }}
          label="Year released"
          variant="standard"
        />

        <TextField
          value={description}
          onChange={e => setDescription(e.target.value)}
          style={{ margin: "10px" }}
          label="Description"
          variant="standard"
        />

        <TextField
          type="number"
          onChange={e => setRating(+e.target.value)}
          style={{ margin: "10px" }}
          label="IMDb Raiting"
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
          Add
        </Button>
      </Box>
    </Container>
  );
};

export default AddProductFrom;
