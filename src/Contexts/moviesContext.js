import React, { useReducer } from "react";
import axios from "axios";

export const moviesContext = React.createContext();

const API = "http://localhost:8000/movies";
const INITIAL_STATE = {
  movies: [],
  oneMovie: null,
  pages: 0,
};

function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "GET_MOVIES":
      console.log(action.payload.data);
      return {
        ...state,
        movies: action.payload.data,
        pages: Math.ceil(action.payload.headers["x-total-count"] / 3),
      };
    case "GET_ONE_MOVIE":
      return {
        ...state,
        oneMovie: action.payload,
      };
    default:
      return state;
  }
}

const MoviesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  async function createMovie(newMovie) {
    await axios.post(API, newMovie);
  }

  async function getMovies() {
    let response = await axios.get(`${API}${window.location.search}`);
    dispatch({
      type: "GET_MOVIES",
      payload: response,
    });
  }

  async function getOneMovie(id) {
    let response = await axios.get(`${API}/${id}`);
    dispatch({
      type: "GET_ONE_MOVIE",
      payload: response.data,
    });
  }

  async function updatedMovie(id, editedMovie) {
    await axios.patch(`${API}/${id}`, editedMovie);
    getOneMovie();
  }

  async function deleteMovie(id) {
    await axios.delete(`${API}/${id}`);
    getMovies();
  }

  return (
    <moviesContext.Provider
      value={{
        movies: state.movies,
        oneMovie: state.oneMovie,
        editedMovie: state.editedMovie,
        pages: state.pages,
        createMovie,
        getMovies,
        getOneMovie,
        updatedMovie,
        deleteMovie,
      }}>
      {children}
    </moviesContext.Provider>
  );
};

export default MoviesContextProvider;
