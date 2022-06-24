import React from "react";
import { Route, Routes } from "react-router-dom";
import MoviesList from "./Components/MoviesList/MoviesList";
import MovieAbout from "./Components/MovieAbout/MovieAbout";
import EditMovieForm from "./Components/EditMovieForm/EditMovieForm";
import WatchedList from "./Components/WathedList/WatchedList";
import AddMovieForm from "./Components/AddMovieForm/AddMovieForm";
import PaymentPage from "./Components/PaymentForm/PaymentPage";
import NotFound from "../src/Components/NotFound/NotFound";
import LogInForm from "../src/Components/LogInForm/LogInForm";
import SignUpForm from "./Components/SignUpForm/SignUpForm";
import HomePage from "./Components/HomePage/HomePage";

const Routing = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviesList />} />
        <Route path="/movies/:id" element={<MovieAbout />} />
        <Route path="/add-movie" element={<AddMovieForm />} />
        <Route path="/edit/:id" element={<EditMovieForm />} />
        <Route path="/watched-list" element={<WatchedList />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/login" element={<LogInForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default Routing;
