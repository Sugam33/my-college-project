import React from "react";
import Banner from "../Components/Home/Banner";
import PopularMovies from "../Components/Home/PopularMovies";
//import Promos from '../Components/Home/Promos';
import TopRated from "../Components/Home/TopRated";
import Layout from "../Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getAllMoviesAction,
  getRandomMoviesAction,
  getTopRatedMovieAction,
} from "../Redux/Actions/MoviesActions";
import { toast } from "react-hot-toast";

function HomeScreen() {
  const dispatch = useDispatch();
  const {
    isLoading: randomLoading,
    isError: randomError,
    movies: randomMovies,
  } = useSelector((state) => state.getRandomMovies);
  const {
    isLoading: topLoading,
    isError: topError,
    movies: topMovies,
  } = useSelector((state) => state.getTopRatedMovie);
  const { isLoading, isError, movies } = useSelector(
    (state) => state.getAllMovies
  );

  useEffect(() => {
    // get random movies
    dispatch(getRandomMoviesAction());
    // get all movies
    dispatch(getAllMoviesAction({}));
    // get top rated movies
    dispatch(getTopRatedMovieAction());
    // errors
    if (isError || randomError || topError) {
      toast.error("Something is wrong");
    }
  }, [dispatch, isError, randomError, topError]);

  return (
    <Layout>
      <div className="container mx-auto min-h-screen px-2 mb-6">
        <Banner />
        <PopularMovies />
        {/* <Promos /> */}
        <TopRated />
      </div>
    </Layout>
  );
}

export default HomeScreen;
