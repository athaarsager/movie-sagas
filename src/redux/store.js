import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

// Create the rootSaga generator function
function* rootSaga() {
  yield takeEvery('FETCH_MOVIES', fetchAllMovies);
  yield takeEvery("FETCH_GENRES", fetchGenresSaga);
  yield takeEvery("GET_DETAILS", getDetailsSaga);
  yield takeEvery("ADD_MOVIE", addMovieSaga);
  yield takeEvery("EDIT_MOVIE", editMovieSaga);
}

function* fetchAllMovies() {
  try {
    // Get the movies:
    const moviesResponse = yield axios.get('/api/movies');
    // Set the value of the movies reducer:
    yield put({
      type: 'SET_MOVIES',
      payload: moviesResponse.data
    });
  } catch (error) {
    console.log('fetchAllMovies error:', error);
  }
}

function* fetchGenresSaga() {
  try {
    const response = yield axios.get("/api/genres");
    yield put({ type: "SET_GENRES", payload: response.data});
  } catch (error) {
    console.error("ERROR in fetchGenresSaga:", error);
  }
}

function* getDetailsSaga(action) {
  try {
    // Receive movie id in action.payload. Send this to router in url
    const response = yield axios.get(`/api/movies/${action.payload}`);
    yield put({ type: "DISPLAY_MOVIE_DETAILS", payload: response.data });
  } catch (error) {
    console.error("ERROR in getDetailsSaga GET:", error);
  }
}

function* addMovieSaga(action) {
  try {
    yield axios.post("/api/movies", action.payload);
  } catch (error) {
    console.error("ERROR in addMovieSaga POST:", error);
  }
}

function* editMovieSaga(action) {
  try {
    yield axios.put(`/api/movies/${action.payload.id}`, action.payload);
  } catch (error) {
    console.error("ERROR in editMovieSaga PUT:", error);
  }
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store movies returned from the server
const movies = (state = [], action) => {
  switch (action.type) {
    case 'SET_MOVIES':
      return action.payload;
    default:
      return state;
  }
}

// Used to store the movie genres
const genres = (state = [], action) => {
  switch (action.type) {
    case 'SET_GENRES':
      return action.payload;
    default:
      return state;
  }
}

const movieDetails = (state = [], action) => {
  switch (action.type) {
    case "DISPLAY_MOVIE_DETAILS":
      return action.payload[0];
    default:
      return state;
  }
}

// Create one store that all components can use
const storeInstance = createStore(
  combineReducers({
    movies,
    genres,
    movieDetails
  }),
  // Add sagaMiddleware to our store
  applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

export default storeInstance;
