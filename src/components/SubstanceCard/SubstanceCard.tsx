import "./SubstanceCard.sass"
import {Substance} from "../../utils/types";
import {Link} from "react-router-dom";
import {useAuth} from "../../hooks/users/useAuth";
import {useCosmetic} from "../../hooks/cosmetics/useCosmetic";
import CustomButton from "../CustomButton/CustomButton";
import {variables} from "../../utils/consts";
import {useState} from "react";
import CustomInput from "../CustomInput/CustomInput";
import {useSubstances} from "../../hooks/substances/useSubstances";

const SubstanceCard = ({ substance, refetch }: {substance:Substance}) => {

    const {is_authenticated, is_moderator} = useAuth()

    const {searchSubstances, deleteSubstance} = useSubstances()

    const {is_draft, addSubstanceToCosmetic, deleteSubstanceFromCosmetic, setSubstanceValue} = useCosmetic()

    const handleAddSubstance = async (e) => {
        e.preventDefault()
        await addSubstanceToCosmetic(substance)
        await searchSubstances()
    }

    const handleDeleteSubstanceFromCosmetic = async (e) => {
        e.preventDefault()
        await deleteSubstanceFromCosmetic(substance)
    }

    const [value, setValue] = useState(substance.percent_in)

    const updateValue = (value) => {
        const item = {
            id: substance.id,
            image: substance.image,
            description: substance.description,
            name: substance.name,
            status: substance.status,
            percent_in: value
        }

        setValue(value)
        setSubstanceValue(item)
    }

    const handleDeleteSubstance = async (e) => {
        e.preventDefault()
        await deleteSubstance(substance)
        refetch()
    }

    return (
        <div className="card-wrapper">

            <div className="preview">
                <img src={substance.image}  alt=""/>
            </div>

            <div className="card-content">

                <div className="content-top">

                    <h3 className="title"> {substance.name} </h3>

                </div>

                {location.pathname.includes("cosmetics") &&
                    <div className="card-inputs-container">
                        <CustomInput placeholder="Процентное содержание" value={value} setValue={updateValue} disabled={!is_draft}/>
                    </div>
                }

                <div className="content-bottom">

                    {!is_moderator &&
                        <Link to={`/substances/${substance.id}`}>
                            <CustomButton bg={variables.primary}>
                                Подробнее
                            </CustomButton>
                        </Link>
                    }

                    {is_authenticated && !is_moderator && location.pathname.includes("substances") &&
                        <CustomButton onClick={handleAddSubstance} bg={variables.green}>Добавить</CustomButton>
                    }

                    {is_authenticated && !is_moderator && is_draft && location.pathname.includes("cosmetics") &&
                        <CustomButton onClick={handleDeleteSubstanceFromCosmetic} bg={variables.red}>Удалить</CustomButton>
                    }

                    {is_authenticated && is_moderator && location.pathname.includes("substances-list") &&
                        <Link to={`/substances/${substance.id}/edit`}>
                            <CustomButton bg={variables.primary}>Редактировать</CustomButton>
                        </Link>
                    }

                    {is_authenticated && is_moderator && location.pathname.includes("substances-list") &&
                        <CustomButton onClick={handleDeleteSubstance} bg={variables.red}>Удалить</CustomButton>
                    }
                </div>

            </div>

        </div>
    )
}

export default SubstanceCard;