import React, { useState } from "react";
import Filters from "../Components/Filters";
import Layout from "../Layout/Layout";
import Movie from "../Components/Movie";
import { Movies } from "../Data/MovieData";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { getAllMoviesAction } from "../Redux/Actions/MoviesActions";
// import { CgSpinner } from "react-icons/cg";

function MoviesPage() {
  const dispatch = useDispatch();

  // all movies
  const { isLoading, isError, movies, pages, page } = useSelector(
    (state) => state.getAllMovies
  );
  // get all categories
  const { categories } = useSelector((state) => state.categoryGetAll);

  // useEffect
  useEffect(() => {
    // errors
    if (isError) {
      toast.error(isError);
    }
    // get all movies
    dispatch(getAllMoviesAction());
  }, [dispatch, isError]);

  return (
    <Layout>
      <div className="min-height-screen container mx-auto px-2 my-6">
        <Filters categories={categories} />
        <p className="text-lg font-medium my-6">
          Total{" "}
          <span className="font-bold text-subMain">
            {movies ? movies?.length : 0}
          </span>{" "}
          items Found
        </p>
        <div className="grid sm:mt-10 mt-6 xl:grid-cols-4 2xl:grid-cols-5 lg:grid-cols-3 sm:grid-cols-2 gap-6">
          {Movies.slice(0, page)?.map((movie, index) => (
            <Movie key={index} movie={movie} />
          ))}
        </div>
        {/* Loading More */}
        <div className="w-full flex-colo md:my-20 my-10"></div>
      </div>
    </Layout>
  );
}

export default MoviesPage;
