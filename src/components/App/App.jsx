import { Route, HashRouter as Router } from 'react-router-dom';
import MovieList from '../MovieList/MovieList';
import MovieDetails from '../MovieDetails/MovieDetails';
import EditDetails from '../MovieDetails/EditDetails';
import AddMovie from '../AddMovie/AddMovie';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
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
        <Route path="/movie/:movie_id/edit">
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
