import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MovieCasts from "../Components/Single/MovieCasts";
import MovieInfo from "../Components/Single/MovieInfo";
import MovieRates from "../Components/Single/MovieRates";
import Layout from "../Layout/Layout";
import ShareMovieModal from "../Components/Modals/ShareModal";
import { useDispatch, useSelector } from "react-redux";
import { getMovieByIdAction } from "../Redux/Actions/MoviesActions";
import Loader from "../Components/Notifications/Loader";
import { RiMovie2Line } from "react-icons/ri";

function SingleMovie() {
  const [modalOpen, setModalOpen] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  const sameClass = "w-full gap-6 flex-colo min-h-screen";
  // useSelector
  const { isLoading, isError, movie } = useSelector(
    (state) => state.getMovieById
  );
  const { movies } = useSelector((state) => state.getAllMovies);

  const RelatedMovies = movies?.filter((m) => m.category === movie?.category);

  // useEffect
  useEffect(() => {
    // movie id
    dispatch(getMovieByIdAction(id));
  }, [dispatch, id]);

  return (
    <Layout>
      {isLoading ? (
        <div className={sameClass}>
          <Loader />
        </div>
      ) : isError ? (
        <div className={sameClass}>
          <div className="flex-colo w-24 h-24 p-5 mb-4 rounded-full bg-dry text-subMain text-4xl">
            <RiMovie2Line />
          </div>
          <p className="text-border text-sm">Something is Wrong</p>
        </div>
      ) : (
        <>
          <ShareMovieModal
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            movie={movie}
          />
          <MovieInfo movie={movie} setModalOpen={setModalOpen} />
          <div className="container mx-auto min-h-screen px-2 my-6">
            <MovieCasts movie={movie} />
            {/* rate */}
            <MovieRates movie={movie} />
          </div>
        </>
      )}
    </Layout>
  );
}

export default SingleMovie;
