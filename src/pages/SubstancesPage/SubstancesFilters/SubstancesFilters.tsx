import "./SubstancesFilters.sass"
import SearchBar from "../../../components/SearchBar/SearchBar";
import {useSubstances} from "../../../hooks/substances/useSubstances";

const SubstancesFilters = () => {

    const {query, setQuery, fetchSubstances} = useSubstances()

    const handleSubmit = () => fetchSubstances()

    return (
        <div className="substances-filters">

            <h2>Поиск веществ</h2>

            <SearchBar query={query} setQuery={setQuery} onSubmit={handleSubmit} />

        </div>
    )
}

export default SubstancesFilters