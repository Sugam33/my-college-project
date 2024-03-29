import * as moviesConstants from "../Constants/MoviesConstants";
import * as moviesAPIs from "../APIs/MoviesServices";
import toast from "react-hot-toast";
import { ErrorsAction, tokenProtection } from "../Protection";

// yo sabai chai movies actions ho esma movie ko state chai kasto change vayo vanera dhekauna

// get all movies action
export const getAllMoviesAction =
  ({
    category = "",
    time = "",
    language = "",
    rate = "",
    year = "",
    search = "",
    pageNumber = "",
  }) =>
  async (dispatch) => {
    try {
      dispatch({ type: moviesConstants.MOVIES_LIST_REQUEST });
      const response = await moviesAPIs.getAllMoviesService(
        category,
        time,
        language,
        rate,
        year,
        search,
        pageNumber
      );
      dispatch({
        type: moviesConstants.MOVIES_LIST_SUCCESS,
        payload: response,
      });
    } catch (error) {
      ErrorsAction(error, dispatch, moviesConstants.MOVIES_LIST_FAIL);
    }
  };

// get random movies action
export const getRandomMoviesAction = () => async (dispatch) => {
  try {
    dispatch({ type: moviesConstants.MOVIES_RANDOM_REQUEST });
    const response = await moviesAPIs.getRandomMoviesService();
    dispatch({
      type: moviesConstants.MOVIES_RANDOM_SUCCESS,
      payload: response,
    });
  } catch (error) {
    ErrorsAction(error, dispatch, moviesConstants.MOVIES_RANDOM_FAIL);
  }
};

// get movie by id action
export const getMovieByIdAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: moviesConstants.MOVIE_DETAILS_REQUEST });
    const response = await moviesAPIs.getMovieByIdService(id);
    dispatch({
      type: moviesConstants.MOVIE_DETAILS_SUCCESS,
      payload: response,
    });
  } catch (error) {
    ErrorsAction(error, dispatch, moviesConstants.MOVIE_DETAILS_FAIL);
  }
};

// get top rated movie action
export const getTopRatedMovieAction = () => async (dispatch) => {
  try {
    dispatch({ type: moviesConstants.MOVIE_TOP_RATED_REQUEST });
    const response = await moviesAPIs.getTopRatedMovieService();
    dispatch({
      type: moviesConstants.MOVIE_TOP_RATED_SUCCESS,
      payload: response,
    });
  } catch (error) {
    ErrorsAction(error, dispatch, moviesConstants.MOVIE_TOP_RATED_FAIL);
  }
};

// review movie action
export const reviewMovieAction =
  ({ id, review }) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: moviesConstants.CREATE_REVIEW_REQUEST });
      const response = await moviesAPIs.reviewMovieService(
        tokenProtection(getState),
        id,
        review
      );
      dispatch({
        type: moviesConstants.CREATE_REVIEW_SUCCESS,
        payload: response,
      });
      toast.success("Review added");
      dispatch({ type: moviesConstants.CREATE_REVIEW_RESET });
      dispatch(getMovieByIdAction(id));
    } catch (error) {
      ErrorsAction(error, dispatch, moviesConstants.CREATE_REVIEW_FAIL);
    }
  };

// delete movie action
export const deleteMovieAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: moviesConstants.DELETE_MOVIE_REQUEST });
    const response = await moviesAPIs.deleteMovieService(
      tokenProtection(getState),
      id
    );
    dispatch({
      type: moviesConstants.DELETE_MOVIE_SUCCESS,
      payload: response,
    });
    toast.success("Movie Deleted Successfully");
    dispatch(getAllMoviesAction({}));
  } catch (error) {
    ErrorsAction(error, dispatch, moviesConstants.DELETE_MOVIE_FAIL);
  }
};

// delete all movies actiion
export const deleteAllMoviesAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: moviesConstants.DELETE_ALL_MOVIES_REQUEST });
    const response = await moviesAPIs.deleteAllMoviesService(
      tokenProtection(getState)
    );
    dispatch({
      type: moviesConstants.DELETE_ALL_MOVIES_SUCCESS,
      payload: response,
    });
    toast.success("All Movies Deleted");
    dispatch(getAllMoviesAction({}));
  } catch (error) {
    ErrorsAction(error, dispatch, moviesConstants.DELETE_ALL_MOVIES_FAIL);
  }
};

// create movie action
export const createMovieAction = (movie) => async (dispatch, getState) => {
  try {
    dispatch({ type: moviesConstants.CREATE_MOVIE_REQUEST });
    const response = await moviesAPIs.createMovieFunction(
      tokenProtection(getState),
      movie
    );
    dispatch({
      type: moviesConstants.CREATE_MOVIE_SUCCESS,
      payload: response,
    });
    toast.success("Movie created");
     dispatch(deleteCastsAction());
  } catch (error) {
    ErrorsAction(error, dispatch, moviesConstants.CREATE_MOVIE_FAIL);
  }
};

// add casts
export const addCastAction = (cast) => async (dispatch, getState) => {
  dispatch({ type: moviesConstants.ADD_CAST, payload: cast });
  localStorage.setItem("casts", JSON.stringify(getState().casts.casts));
};

// remove casts
export const removeCastAction = (id) => async (dispatch, getState) => {
  dispatch({ type: moviesConstants.DELETE_CAST, payload: id });
  localStorage.setItem("casts", JSON.stringify(getState().casts.casts));
};

// update casts
export const updateCastAction = (cast) => async (dispatch, getState) => {
  dispatch({ type: moviesConstants.EDIT_CAST, payload: cast });
  localStorage.setItem("casts", JSON.stringify(getState().casts.casts));
};

// delete casts
export const deleteCastsAction = () => async (dispatch) => {
  dispatch({ type: moviesConstants.RESET_CAST });
  localStorage.removeItem("casts");
};
