import { Box, Button, Container, TextField, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { moviesContext } from "../../Contexts/moviesContext";
import { grey, yellow } from "@mui/material/colors";
import { styled } from "@mui/material/styles";

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

  const CssTextField = styled(TextField, {
    shouldForwardProp: props => props !== "focusColor",
  })(p => ({
    "& label.Mui-focused": {
      color: p.focusColor,
    },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: p.focusColor,
      },
    },
  }));

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
    <Container maxWidth="sm" style={{ height: "700px" }}>
      <Box
        sx={{ bgcolor: grey[200] }}
        flexWrap={"wrap"}
        justifyContent={"center"}
        padding={"30px"}
        display={"flex"}
        flexDirection={"column"}
        textAlign={"center"}
        height={"100%"}>
        <Typography variant="h4" component="h2" marginBottom={"20px"}>
          New Movie
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
          onChange={e => setYear(+e.target.value)}
          style={{ margin: "10px" }}
          id="outlined-basic"
          label="Year released"
          variant="outlined"
          focusColor="#fbc02d"
        />

        <TextField
          value={description}
          onChange={e => setDescription(e.target.value)}
          style={{ margin: "10px" }}
          id="input"
          label="Description"
          variant="outlined"
          focusColor="#fbc02d"
        />

        <TextField
          type="number"
          onChange={e => setRating(+e.target.value)}
          style={{ margin: "10px" }}
          id="input"
          label="IMDb Raiting"
          variant="outlined"
          focusColor="#fbc02d"
        />

        <TextField
          value={cover}
          onChange={e => setCover(e.target.value)}
          style={{ margin: "10px" }}
          id="input"
          label="Cover"
          variant="outlined"
          focusColor="#fbc02d"
        />

        <TextField
          value={trailer}
          onChange={e => setTrailer(e.target.value)}
          style={{ margin: "10px", marginBottom: "30px" }}
          id="input"
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
          Add
        </Button>
      </Box>
    </Container>
  );
};

export default AddProductFrom;
