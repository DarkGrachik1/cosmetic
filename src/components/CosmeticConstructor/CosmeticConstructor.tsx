import "./CosmeticConstructor.sass"
import {useCosmetic} from "../../hooks/cosmetics/useCosmetic";
import {Link} from "react-router-dom";

const CosmeticConstructor = () => {

    const {cosmetic_id} = useCosmetic()

    if (!cosmetic_id) {
        return (
            <div className="constructor-container disabled">
                <span className="title">Новая косметика</span>
            </div>
        )
    }

    return (
        <Link to={`/cosmetics/${cosmetic_id}`} className="constructor-container">
            <span className="title">Новая косметика</span>
        </Link>
    )
}

export default CosmeticConstructor