import "./SearchBar.sass"
import {FaSearch} from "react-icons/fa";

const SearchBar = ({ query, setQuery, onSubmit }) => {

    const handleChange = (value: string) => {
        setQuery(value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        onSubmit()
    }

    return (
        <form className="search-bar-wrapper" onSubmit={handleSubmit} >

            <input
                type="text"
                placeholder="Поиск..."
                name="name"
                autoComplete="off"
                value={query}
                onChange={(e) => handleChange(e.target.value)}
            />

            <button type="submit">
                <FaSearch className={"search-icon"}/>
            </button>

        </form>
    )
}

export default SearchBar;