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
    }, []);

    return (
        <form>
            <label htmlFor="title">Movie Title</label><br/>
            <input id="title" name="title" type="text" placeholder="Movie Title"/><br/>
            <label htmlFor="url">Poster Url</label><br/>
            <input id="url" name="url" type="url" placeholder="https://m.media-amazon.com/images/I/51XhnMdSQdL._AC_UF894,1000_QL80_.jpg"/><br/>
            <label htmlFor="description">Description</label><br/>
            <input id="description" name="description" type="text" placeholder="Kung Fu Panda is a children's animated movie starring Jack Black as the titular character: Po. It follows Po on his quest to become the Dragon Warrior..."/><br/>
            <label htmlFor="genre">Genre</label><br/>
            <select id="genre" name="genre">
                {genres.map(genre => (
                    <option value={genre}>{genre}</option>
                ))}
            </select>
        </form>
    )
}

export default AddMovie;