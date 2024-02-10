import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

function AddMovie() {
    const dispatch = useDispatch();
    const history = useHistory();
    const genres = useSelector(store => store.genres);

    //need to fetch genres right away so drop down has something to display
    useEffect(() => {
        //Path="FETCH_GENRES"
         dispatch({type: "FETCH_GENRES"});
    }, []);
    // TO-DO:
    // Make dispatch work

    const addMovie = (e) => {
        e.preventDefault();
        // Path="ADD_MOVIE"
        // Send all the movie info as an object
    }

    return (
        <form>
            <label htmlFor="title">Movie Title</label><br/>
            <input id="title" name="title" type="text" placeholder="Movie Title" required/><br/>
            <label htmlFor="url">Poster Url</label><br/>
            <input id="url" name="url" type="url" placeholder="https://m.media-amazon.com/images/I/51XhnMdSQdL._AC_UF894,1000_QL80_.jpg" required/><br/>
            <label htmlFor="description">Description</label><br/>
            <input id="description" name="description" type="text" placeholder="Kung Fu Panda is a children's animated movie starring Jack Black as the titular character: Po. It follows Po on his quest to become the Dragon Warrior..." required/><br/>
            <label htmlFor="genre">Genre</label><br/>
            <select id="genre" name="genre" required>
                {/* Selected sets the below option as the default. Disabled prevents users from clicking it. Hidden prevents it from showing up in the dropdown menu */}
                <option value="" selected disabled hidden>--Select Genre--</option>
                {genres.map(genre => (
                    <option value={genre.name}>{genre.name}</option>
                ))}
            </select><br/>
            <button>Save</button>
            <button type="button">Cancel</button>
        </form>
    )
}

export default AddMovie;