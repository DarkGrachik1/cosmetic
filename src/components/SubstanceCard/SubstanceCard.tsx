import "./SubstanceCard.sass"
import {Substance} from "../../utils/types";
import {Link} from "react-router-dom";
import {useAuth} from "../../hooks/users/useAuth";
import {useCosmetic} from "../../hooks/cosmetics/useCosmetic";
import CustomButton from "../CustomButton/CustomButton";
import {variables} from "../../utils/consts";
import {api} from "../../utils/api";
import {useEffect, useState} from "react";
import {useToken} from "../../hooks/users/useToken";
import CustomInput from "../CustomInput/CustomInput";

const SubstanceCard = ({ substance, flag }: {substance:Substance}) => {
    
    const {is_authenticated, is_moderator} = useAuth()

    const {cosmetic, is_draft, addSubstanceToCosmetic, deleteSubstanceFromCosmetic} = useCosmetic()

    const handleAddSubstance = (e) => {
        e.preventDefault()
        addSubstanceToCosmetic(substance)
    }

    const handleDeleteSubstance = (e) => {
        deleteSubstanceFromCosmetic(substance)
    }

    const {access_token} = useToken()

    const updateIndicatorValue = async () => {
        const form_data = new FormData()

        form_data.append('percent_in', value)

        await api.put(`cosmetics/${cosmetic.id}/update_substance/${substance.id}/`, form_data, {
            headers: {
                'authorization': access_token
            }
        })
    }

    const fetchIndicatorValue = async () => {
        const {data} = await api.get(`cosmetics/${cosmetic.id}/substances/${substance.id}/`, {
            headers: {
                'authorization': access_token
            }
        })
        setValue(data)
    }

    const [value, setValue] = useState()

    useEffect(() => {
        location.pathname.includes("cosmetics") && fetchIndicatorValue()
    }, [])

    useEffect(() => {
        value && updateIndicatorValue()
    }, [flag])
    
    const is_chosen = cosmetic?.substances.find(g => g.id == substance.id)

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
                        <CustomInput placeholder="Процентное содержание" value={value} setValue={setValue} disabled={!is_draft}/>
                    </div>
                }

                <div className="content-bottom">

                    <Link to={`/substances/${substance.id}`}>
                        <CustomButton bg={variables.primary}>
                            Подробнее
                        </CustomButton>
                    </Link>
                    
                    {is_authenticated && !is_chosen && !is_moderator && location.pathname.includes("substances") &&
                        <CustomButton onClick={handleAddSubstance} bg={variables.green}>Добавить</CustomButton>
                    }

                    {is_authenticated && is_chosen && location.pathname.includes("substances") &&
                        <CustomButton onClick={handleDeleteSubstance} bg={variables.red} >Удалить</CustomButton>
                    }

                    {is_authenticated && !is_moderator && is_draft && location.pathname.includes("cosmetics") &&
                        <CustomButton onClick={handleDeleteSubstance} bg={variables.red}>Удалить</CustomButton>
                    }

                </div>

            </div>

        </div>
    )
}

export default SubstanceCard;