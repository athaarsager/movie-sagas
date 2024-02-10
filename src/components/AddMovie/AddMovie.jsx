import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

function AddMovie() {
    const dispatch = useDispatch();
    const history = useHistory();
    const genres = useSelector(store => store.genres);
    const [newMovie, setNewMovie] = useState({
        title: "",
        poster: "",
        description: "",
        genre_id: ""
    });

    const handleChange = (e) => {
        
        // Can't just alter object keys directly
        // This variable stores the name and value from the target
        const { name, value } = e.target;

        // This populates the newMovie object with all other info using the spread operator, 
        // and adds the values declared in the object above
        setNewMovie((currentInfo) => ({ ...currentInfo, [name]: value}));

        // Potentially add input validation here
    }

    const addMovie = (e) => {
        e.preventDefault();
        // Send all the movie info as an object
        dispatch({type: "ADD_MOVIE", payload: newMovie });
        Swal.fire({
            title: "Success!",
            text: "Movie Added! Returning to Main Page",
            icon: "success",
            confirmButtonColor: "#000080"
          });
        history.push("/");
    }

    //need to fetch genres right away so drop down has something to display
    useEffect(() => {
        //Path="FETCH_GENRES"
         dispatch({type: "FETCH_GENRES"});
    }, []);

    

    return (
        <form>
            <label htmlFor="title">Movie Title</label><br/>
            <input className="movie-input" id="title" name="title" type="text" placeholder="Movie Title" value={newMovie.title} onChange={handleChange} required/><br/>
            <label htmlFor="url">Poster Url</label><br/>
            <input id="url" name="poster" type="url" placeholder="https://m.media-amazon.com/images/I/51XhnMdSQdL._AC_UF894,1000_QL80_.jpg" value={newMovie.poster} onChange={handleChange} required/><br/>
            <label htmlFor="description">Description</label><br/>
            <input id="description" name="description" type="text" placeholder="Kung Fu Panda is a children's animated movie starring Jack Black as the titular character: Po. It follows Po on his quest to become the Dragon Warrior..." value={newMovie.description} onChange={handleChange} required/><br/>
            <label htmlFor="genre">Genre</label><br/>
            <select id="genre" name="genre_id" onChange={handleChange} required>
                {/*  Hidden prevents option from showing up in the dropdown menu and allows it to be the default value */}
                <option hidden>--Select Genre--</option>
                {genres.map(genre => (
                    <option key={genre.id} value={genre.id}>{genre.name}</option>
                ))}
            </select><br/>
            <button onClick={addMovie}>Save</button>
            <button onClick={() => history.goBack()} type="button">Cancel (Return to Home)</button>
        </form>
    )
}

export default AddMovie;