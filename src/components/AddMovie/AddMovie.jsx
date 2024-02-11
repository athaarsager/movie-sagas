import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";

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
            <TextField size="small" label="Movie Title" className="movie-input" id="title" name="title" type="text" placeholder="Movie Title" value={newMovie.title} onChange={handleChange} required/><br/>
            <TextField size="small" label="Poster Url" id="url" name="poster" type="url" placeholder="https://m.media-amazon.com/images/I/51XhnMdSQdL._AC_UF894,1000_QL80_.jpg" value={newMovie.poster} onChange={handleChange} required/><br/>
            <TextField size="small" label="Description" id="description" name="description" type="text" placeholder="Kung Fu Panda is a children's animated movie starring Jack Black as the titular character: Po. It follows Po on his quest to become the Dragon Warrior..." value={newMovie.description} onChange={handleChange} required/><br/>
            <TextField size="small" sx={{ width: "22ch"}} select label="Select Genre" id="genre" name="genre_id" onChange={handleChange} required>
                {/*  Hidden prevents option from showing up in the dropdown menu and allows it to be the default value */}
                {genres.map(genre => (
                    <MenuItem key={genre.id} value={genre.id}>{genre.name}</MenuItem>
                ))}
            </TextField><br/>
            <Button sx={{ marginBottom: 1, marginTop: 1}} variant="contained" onClick={addMovie}>Save</Button><br/>
            <Button variant="contained" color="inherit" onClick={() => history.goBack()} type="button">Cancel (Return to Home)</Button>
        </form>
    )
}

export default AddMovie;