import "./SubstancesPage.sass"
import {useAuth} from "../../hooks/users/useAuth";
import SubstancesList from "./SubstancesList/SubstancesList";
import SubstancesFilters from "./SubstancesFilters/SubstancesFilters";

const SubstancesPage = () => {

    const {is_moderator} = useAuth()

    return (
        <div className="substances-wrapper">

            <SubstancesFilters />

            {!is_moderator && <SubstancesList />}

        </div>
    )
}

export default SubstancesPage;