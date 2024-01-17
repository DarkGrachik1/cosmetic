import {useSubstances} from "../../../hooks/substances/useSubstances";
import {useQuery} from "react-query";
import SubstancesTable from "./SubstancesTable/SubstancesTable";
import {useEffect} from "react";
import {useAuth} from "../../../hooks/users/useAuth";
import {useNavigate} from "react-router-dom"

const SubstancesTableWrapper = () => {

    const {searchSubstances} = useSubstances()

    const {is_moderator} = useAuth()

    const navigate = useNavigate()

    const { isLoading, data, isSuccess, refetch } = useQuery(
        ["substances"],
        () => searchSubstances(),
        {
            keepPreviousData: true,
        }
    )

    useEffect(() => {
        if (!is_moderator) {
            navigate("/")
        }
    }, [])

    if (isLoading) {
        return (
            <div>

            </div>
        )
    }

    return (
        <div className="substances-wrapper">
            <SubstancesTable isLoading={isLoading} data={data} isSuccess={isSuccess} refetch={refetch} />
        </div>
    )
}

export default SubstancesTableWrapper