import { Route, HashRouter as Router } from 'react-router-dom';
import MovieList from '../MovieList/MovieList';
import MovieDetails from '../MovieDetails/MovieDetails';
import EditDetails from '../MovieDetails/EditDetails';
import AddMovie from '../AddMovie/AddMovie';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>The Movies Saga!</h1>
      <Router>        
        <Route path="/" exact>
          <MovieList />
        </Route>
        <Route path="/movies/:movie_id">
          <MovieDetails />
        </Route>
        <Route path="/movies/:movie_id/edit">
          <EditDetails />
        </Route>
        <Route path="/add_movie">
          <AddMovie />
        </Route>
      </Router>
    </div>
  );
}

export default App;
