import React, { useReducer } from "react";

export const watchedListContext = React.createContext();

const INITIAL_STATE = {
  watchedList: null,
  count: 0,
};

function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "GET_WATCHEDLIST":
      return {
        ...state,
        watchedList: action.payload,
        count: action.payload.movies.length,
      };
    default:
      return state;
  }
}

const WatchedListContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  function addMovieToWatchedList(movie) {
    let watchedList = JSON.parse(localStorage.getItem("watchedList"));

    if (!watchedList) {
      watchedList = {
        movies: [],
      };
    }
    let newMovie = {
      item: movie,
      count: 1,
    };

    let isMovieInwatchedList = watchedList.movies.some(
      item => item.item.id === movie.id
    );

    if (isMovieInwatchedList) {
      watchedList.movies = watchedList.movies.filter(
        item => item.item.id !== movie.id
      );
    } else {
      watchedList.movies.push(newMovie);
    }
    localStorage.setItem("watchedList", JSON.stringify(watchedList));
    getWatchedList();
  }

  function checkMovieInWatchedList(movie) {
    let watchedList = JSON.parse(localStorage.getItem("watchedList"));
    if (!watchedList) {
      watchedList = {
        movies: [],
        raiting: 0,
      };
    }
    let isMovieInWatchedList = watchedList.movies.some(
      item => item.item.id === movie.id
    );
    return isMovieInWatchedList;
  }

  function getWatchedList() {
    let watchedList = JSON.parse(localStorage.getItem("watchedList"));

    if (!watchedList) {
      watchedList = {
        movies: [],
        raiting: 0,
      };
    }
    dispatch({
      type: "GET_WATCHEDLIST",
      payload: watchedList,
    });
  }

  function changeWatchedMovieCount(count, id) {
    if (count <= 0) {
      count = 1;
    }
    let watchedList = JSON.parse(localStorage.getItem("watchedList"));
    watchedList.movies = watchedList.movies.map(item => {
      if (item.item.id === id) {
        item.count = count;
      }
      return item;
    });
    localStorage.setItem("watchedList", JSON.stringify(watchedList));
    getWatchedList();
  }

  function removeMovieFromWatchedList(id) {
    let watchedList = JSON.parse(localStorage.getItem("watchedList"));
    watchedList.movies = watchedList.movies.filter(item => item.id !== id);
    localStorage.setItem("watchedList", JSON.stringify(watchedList));
    getWatchedList();
  }

  return (
    <watchedListContext.Provider
      value={{
        watchedList: state.watchedList,
        count: state.count,
        addMovieToWatchedList,
        checkMovieInWatchedList,
        changeWatchedMovieCount,
        getWatchedList,
        removeMovieFromWatchedList,
      }}>
      {children}
    </watchedListContext.Provider>
  );
};

export default WatchedListContextProvider;
