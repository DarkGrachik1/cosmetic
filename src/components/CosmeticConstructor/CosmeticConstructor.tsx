import "./CosmeticConstructor.sass"
import {useCosmetic} from "../../hooks/cosmetics/useCosmetic";
import {Link} from "react-router-dom";

const CosmeticConstructor = () => {

    const {cosmetic} = useCosmetic()

    if (cosmetic == undefined) {
        return (
            <div className="constructor-container disabled">
                <span className="title">Новая косметика</span>
            </div>
        )
    }

    return (
        <Link to={`/cosmetics/${cosmetic.id}`} className="constructor-container">
            <span className="title">Новая косметика</span>
            {cosmetic.substances.length > 0 && <span className="badge">{cosmetic.substances.length}</span>}
        </Link>
    )
}

export default CosmeticConstructor