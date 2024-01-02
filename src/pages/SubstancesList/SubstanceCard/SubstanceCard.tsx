import "./SubstanceCard.sass"
import {Substance} from "../../../utils/types";
import {Link} from "react-router-dom";
import mockImage from "/src/assets/mock.png"

const SubstanceCard = ({ substance, isMock }: {substance:Substance, isMock:boolean }) => {


    return (
        <div className="card-wrapper">

            <div className="preview">
                <img src={isMock ? mockImage : substance.image}  alt=""/>
            </div>

            <div className="card-content">

                <div className="content-top">

                    <h3 className="title">{substance.name}</h3>

                </div>

                <div className="content-bottom">

                    <Link to={`/substances/${substance.id}`}>
                        Подробнее
                    </Link>

                </div>

            </div>

        </div>
    )
}

export default SubstanceCard;