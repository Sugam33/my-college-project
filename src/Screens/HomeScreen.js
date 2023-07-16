import React from "react";
import Banner from "../Components/Home/Banner";
import PopularMovies from "../Components/Home/PopularMovies";
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
    //  random movies lagi dispatch
    dispatch(getRandomMoviesAction());
    // sabai movies lai dispatch
    dispatch(getAllMoviesAction({}));
    //  top rated movies haru dispatch 
    dispatch(getTopRatedMovieAction());
    // errors
    if (isError || randomError || topError) {
      toast.error("Something is wrong");
    }
  }, [dispatch, isError, randomError, topError]);

  return (
    <Layout>
      <div className="container mx-auto min-h-screen px-2 mb-6">
        <Banner movies={movies} isLoading={isLoading} />
        <PopularMovies movies={randomMovies} isLoading={randomLoading} />
        <TopRated movies={topMovies} isLoading={topLoading} />
      </div>
    </Layout>
  );
}

export default HomeScreen;
