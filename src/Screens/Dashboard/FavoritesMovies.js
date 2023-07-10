import React from "react";
import Table from "../../Components/Table";
import SideBar from "./SideBar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  deleteFavoriteMoviesAction,
  getFavoriteMoviesAction,
} from "../../Redux/Actions/userActions";
import { toast } from "react-hot-toast";
import Loader from "../../Components/Notifications/Loader";

function FavoritesMovies() {
  const dispatch = useDispatch();

  const { isLoading, isError, likedMovies } = useSelector(
    (state) => state.userGetFavoriteMovies
  );

  // delete
  const {
    isLoading: deleteLoading,
    isError: deleteError,
    isSuccess,
  } = useSelector((state) => state.userDeleteFavoriteMovies);

  // delete movie handler
  const deleteMoviesHandler = () => {
    window.confirm("Are you sure you want to delete all movies?") &&
      dispatch(deleteFavoriteMoviesAction());
  };

  // useEffect
  useEffect(() => {
    dispatch(getFavoriteMoviesAction());
    if (isError || deleteError) {
      toast.error(isError || deleteError);
      dispatch({
        type: isError
          ? "GET_FAVORITE_MOVIES_RESET"
          : "DELETE_FAVORITE_MOVIES_RESET",
      });
    }
  }, [dispatch, isError, deleteError]);

  return (
    <SideBar>
      <div className="flex flex-col gap-6">
        <div className="flex-btn gap-2">
          <h2 className="text-xl font-bold">Favorites Movies</h2>
          <button className="bg-main font-medium transitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded">
            Delete All
          </button>
        </div>
        {isLoading ? (
          <Loader />
        ) : likedMovies.length > 0 ? (
          <Table data={likedMovies} admin={false} />
        ) : (
          <p>Empty</p>
        )}
      </div>
    </SideBar>
  );
}

export default FavoritesMovies;
