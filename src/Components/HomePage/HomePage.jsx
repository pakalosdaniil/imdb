import { Container } from "@mui/system";
import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { Carousel } from "react-bootstrap";
import { moviesContext } from "../../Contexts/moviesContext";
import { grey } from "@mui/material/colors";
import { Box } from "@mui/material";

const HomePage = () => {
  const { getMovies, movies } = useContext(moviesContext);
  useEffect(() => {
    getMovies();
  }, []);
  return (
    <Container className={"block"} sx={{ bgcolor: grey[200] }}>
      <Carousel fade className="home-carousel">
        {movies.map(item => (
          <Carousel.Item key={item.id} interval={3000}>
            <img className="d-block w-100" src={item.cover} alt="First slide" />
            {/* <Carousel.Caption>
              <h3></h3>
              <p></p>
            </Carousel.Caption> */}
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
};

export default HomePage;

// style={{ width: "500px", height: "280px" }}
