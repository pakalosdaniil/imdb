import React from "react";

import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import Routing from "./Routing";

import AuthContextProvider from "./Contexts/watchedListContext";
import WatchedListContextProvider from "./Contexts/watchedListContext";

import { BrowserRouter } from "react-router-dom";
import MoviesContextProvider from "./Contexts/moviesContext";

const App = () => {
  return (
    <AuthContextProvider>
      <MoviesContextProvider>
        <WatchedListContextProvider>
          <BrowserRouter>
            <Header />
            <Routing />
            <Footer />
          </BrowserRouter>
        </WatchedListContextProvider>
      </MoviesContextProvider>
    </AuthContextProvider>
  );
};

export default App;
