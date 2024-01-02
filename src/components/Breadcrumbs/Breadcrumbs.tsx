import "./Breadcrumbs.sass"
import {Dispatch} from "react";
import { Link, useLocation } from "react-router-dom";
import {FaChevronRight} from "react-icons/fa6";
import {FaHome} from "react-icons/fa";
import { Substance } from "../../utils/types";
 

const Breadcrumbs = ({ selectedSubstance, setSelectedSubstance }: { selectedSubstance:Substance| undefined, setSelectedSubstance:Dispatch<Substance| undefined> }) => {

    const location = useLocation()

    let currentLink = ''

    const topics: Record<string, string> = {
        "substances": "Вещества для производства косметики",
        "profile": "Личный кабинет"
    }

    const resetSelectedSubstance = () => setSelectedSubstance(undefined)

    const crumbs = location.pathname.split('/').filter(crumb => crumb !== '').map(crumb => {

        currentLink += `/${crumb}`

        if (Object.keys(topics).find(x => x == crumb))
        {
            return (
                <div className={"crumb"} key={crumb}>

                    <Link to={currentLink} onClick={resetSelectedSubstance}>
                        { (topics as never)[crumb] }
                    </Link>

                    <FaChevronRight className={"chevron-icon"}/>

                </div>
            )
        }

        if (currentLink.match(new RegExp('substances/(d*)')))
        {
            return (
                <div className={"crumb"} key={crumb}>

                    <Link to={currentLink}>
                        { selectedSubstance?.name }
                    </Link>

                    <FaChevronRight className={"chevron-icon"}/>

                </div>
            )
        }
    });

    return (
        <div className="breadcrumbs-wrapper">
            <div className="breadcrumbs">

                <div className="crumb">

                    <Link to={"/substances"}>
                        <FaHome className="home-icon" />
                    </Link>

                    <FaChevronRight className="chevron-icon" />

                </div>

                {crumbs}

            </div>
        </div>
    )
}

export default Breadcrumbs;