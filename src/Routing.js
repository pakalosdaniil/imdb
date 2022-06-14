import React from "react";
import { Route, Routes } from "react-router-dom";
import MoviesList from "./Components/MoviesList/MoviesList";
import MovieAbout from "./Components/MovieAbout/MovieAbout";
import EditMovieForm from "./Components/EditMovieForm/EditMovieForm";
import WatchedList from "./Components/WathedList/WatchedList";
import AddMovieForm from "./Components/AddMovieForm/AddMovieForm";
import LogInForm from "./Components/LogInForm/LogInForm";
import SignUpForm from "./Components/SignUpForm/SignUpForm";
import PaymentForm from "./Components/PaymentForm/PaymentForm";

const Routing = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MoviesList />} />
        <Route path="/movies" element={<MoviesList />} />
        <Route path="/movies/:id" element={<MovieAbout />} />
        <Route path="/add-movie" element={<AddMovieForm />} />
        <Route path="/edit/:id" element={<EditMovieForm />} />
        <Route path="/watched-list" element={<WatchedList />} />
        <Route path="/login" element={<LogInForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/payment" element={<PaymentForm />} />
      </Routes>
    </div>
  );
};

export default Routing;
