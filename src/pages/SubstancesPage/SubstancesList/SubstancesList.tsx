import "./SubstancesList.sass"
import {useEffect} from "react";
import SubstanceCard from "../../../components/SubstanceCard/SubstanceCard";
import {useSubstances} from "../../../hooks/substances/useSubstances";

const SubstancesList = () => {

    const {substances, fetchSubstances} = useSubstances()

    useEffect(() => {
        fetchSubstances()
    }, [])

    const cards = substances.map(substance  => (
        <SubstanceCard substance={substance} key={substance.id}/>
    ))

    return (
        <div className="substances-list">

            { cards }

        </div>
    )
}

export default SubstancesList;