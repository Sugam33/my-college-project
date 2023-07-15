import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { likedMovieAction } from "../Redux/Actions/userActions";

// check if movie is added to watch list
const IfLikedMovie = (movie) => {
  const { likedMovies } = useSelector((state) => state.userGetFavoriteMovies);
  return likedMovies?.find((likedMovie) => likedMovie?._id === movie._id);
};

// liked movie functionality
const likedMovie = (movie, dispatch, userInfo) => {
  return !userInfo
    ? toast.error("Login in to add movie to watchlist")
    : dispatch(
        likedMovieAction({
          movieId: movie._id,
        })
      );
};

export { IfLikedMovie, likedMovie };
