import CosmeticsTable from "./CosmeticsTable/CosmeticsTable";
import {useAuth} from "../../hooks/users/useAuth";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom"

const CosmeticsPage = () => {    

    const {is_authenticated} = useAuth()

    const navigate = useNavigate()

    useEffect(() => {
        if (!is_authenticated) {
            navigate("/substances")
        }
    }, [])

    return (
        <div>
            <CosmeticsTable />
        </div>
    )
}

export default CosmeticsPage;

