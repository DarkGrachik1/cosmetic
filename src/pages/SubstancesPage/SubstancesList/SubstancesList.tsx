import "./SubstancesList.sass"
import SubstanceCard from "../../../components/SubstanceCard/SubstanceCard";
import {useSubstances} from "../../../hooks/substances/useSubstances";
import {useQuery} from "react-query";
import SubstancesFilters from "../SubstancesFilters/SubstancesFilters";

const SubstancesList = () => {

    const {searchSubstances} = useSubstances()

    const { isLoading, data, refetch } = useQuery(
        ["substances"],
        () => searchSubstances(),
        {
            keepPreviousData: false,
        }
    )

    if (isLoading) {
        return (
            <div>

            </div>
        )
    }

    const cards = data.map(substance  => (
        <SubstanceCard substance={substance} key={substance.id} refetch={refetch}/>
    ))

    return (
        <div className="substances-wrapper">
            <div className="substances-list-wrapper">

                <SubstancesFilters refetch={refetch}/>

                <div className="substances-list">
                    { cards }
                </div>

            </div>
        </div>
    )
}

export default SubstancesList;