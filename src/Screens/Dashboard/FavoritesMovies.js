import React from "react";
import Table from "../../Components/Table";
import SideBar from "./SideBar";
import { Movies } from "../../Data/MovieData";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getFavoriteMoviesAction } from "../../Redux/Actions/userActions";
import { toast } from "react-hot-toast";
import  Loader from "../../Components/Notifications/Loader";

function FavoritesMovies() {
  const dispatch = useDispatch();

  const { isLoading, isError, likedMovies } = useSelector(
    (state) => state.userGetFavoriteMovies
  );

  // useEffect
  useEffect(() => {
    dispatch(getFavoriteMoviesAction());
    if (isError) {
      toast.error(isError);
      dispatch({ type: "GET_FAVORITE_MOVIES_RESET" });
    }
  }, [dispatch, isError]);

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
