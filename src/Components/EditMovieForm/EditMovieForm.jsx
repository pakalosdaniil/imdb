import { Button, TextField, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { moviesContext } from "../../Contexts/moviesContext";
import { grey, yellow } from "@mui/material/colors";
import { styled } from "@mui/material/styles";

const EditMovieForm = () => {
  const CssTextField = styled(TextField, {
    shouldForwardProp: props => props !== "focusColor",
  })(p => ({
    // input label when focused
    "& label.Mui-focused": {
      color: p.focusColor,
    },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: p.focusColor,
      },
    },
  }));

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
      <Container maxWidth="sm" style={{ height: "700px" }}>
        <Box
          sx={{ bgcolor: grey[200] }}
          flexWrap={"wrap"}
          justifyContent={"center"}
          height={"100%"}
          padding={"30px"}
          display={"flex"}
          flexDirection={"column"}
          textAlign={"center"}>
          <Typography variant="h4" component="h2" marginBottom={"20px"}>
            Edit movie
          </Typography>

          <TextField
            value={title}
            onChange={e => setTitle(e.target.value)}
            style={{ margin: "10px" }}
            id="outlined-basic"
            label="Title"
            variant="outlined"
            focusColor="#fbc02d"
          />

          <TextField
            type="number"
            value={year}
            onChange={e => setYear(+e.target.value)}
            style={{ margin: "10px" }}
            id="outlined-basic"
            label="Year"
            variant="outlined"
            focusColor="#fbc02d"
          />

          <TextField
            value={description}
            onChange={e => setDescription(e.target.value)}
            style={{ margin: "10px" }}
            id="outlined-basic"
            label="Description"
            variant="outlined"
            focusColor="#fbc02d"
          />

          <TextField
            type="number"
            value={rating}
            onChange={e => setRating(+e.target.value)}
            style={{ margin: "10px" }}
            id="outlined-basic"
            label="IMDb Rating"
            variant="outlined"
            focusColor="#fbc02d"
          />

          <TextField
            value={cover}
            onChange={e => setCover(e.target.value)}
            style={{ margin: "10px" }}
            id="outlined-basic"
            label="Cover"
            variant="outlined"
            focusColor="#fbc02d"
          />

          <TextField
            value={trailer}
            onChange={e => setTrailer(e.target.value)}
            style={{ margin: "10px", marginBottom: "30px" }}
            id="outlined-basic"
            label="Trailer ID"
            variant="outlined"
            focusColor="#fbc02d"
          />

          <Button
            onClick={handleValues}
            style={{ margin: "10px" }}
            variant="contained"
            sx={{
              bgcolor: yellow[600],
              color: "black",
              "&:hover": { bgcolor: yellow[500] },
            }}>
            Save
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default EditMovieForm;
