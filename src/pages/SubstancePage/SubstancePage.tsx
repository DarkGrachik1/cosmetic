import "./SubstancePage.sass"
import {useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import {useSubstance} from "../../hooks/substances/useSubstance";

const SubstancePage = () => {

    const { id } = useParams<{id: string}>();
    
    const {substance, fetchSubstance} = useSubstance()
    
    useEffect(() => {
        id && fetchSubstance(id)
    }, [])

    if (substance == undefined) {
        return (
            <div>

            </div>
        )
    }

    const img = `http://127.0.0.1:8000/api/substances/${id}/image/`

    return (
        <div className="page-details-wrapper">

            <Link className="return-link" to="/">
                Назад
            </Link>

            <div className="left">

                <img src={img}  alt=""/>

            </div>

            <div className="right">

                <div className="info-container">

                    <h2 className="name">{substance.name}</h2>

                    <br />

                    <span className="description">{substance.description}</span>

                    <br />

                </div>

            </div>

        </div>
    )
}

export default SubstancePage;