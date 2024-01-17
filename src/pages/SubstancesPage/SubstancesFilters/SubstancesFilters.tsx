import "./SubstancesFilters.sass"
import SearchBar from "../../../components/SearchBar/SearchBar";
import {useSubstances} from "../../../hooks/substances/useSubstances";
import {useAuth} from "../../../hooks/users/useAuth";
import LinkButton from "../../../components/LinkButton/LinkButton";
import {variables} from "../../../utils/consts";
import CustomButton from "../../../components/CustomButton/CustomButton";

const SubstancesFilters = ({refetch}) => {

    const {is_moderator} = useAuth()

    const {query, setQuery} = useSubstances()

    const handleSubmit = (e) => {
        e.preventDefault()
        refetch()
    }

    return (
        <div className="substances-filters">

            <h2>Поиск веществ</h2>

            <div className="right-container" >

                {is_moderator &&
                    <LinkButton to="/substances/add" bg={variables.primary}>
                        Добавить вещество
                    </LinkButton>
                }

                <form className="search-form" onSubmit={handleSubmit}>

                    <SearchBar query={query} setQuery={setQuery} placeholder={"Поиск..."} />

                    <CustomButton bg={variables.primary} >
                        Применить
                    </CustomButton>

                </form>

            </div>
        </div>
    )
}

export default SubstancesFilters