import {useEffect, useState} from "react";
import {useCosmetic} from "../../hooks/cosmetics/useCosmetic";
import {useNavigate, useParams} from "react-router-dom"
import SubstanceCard from "../../components/SubstanceCard/SubstanceCard";
import "./CosmeticPage.sass"
import {useAuth} from "../../hooks/users/useAuth";
import {STATUSES, variables} from "../../utils/consts";
import {ru} from "../../utils/momentLocalization";
import moment from "moment";
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomTextarea from "../../components/CustomTextarea/CustomTextarea";
import {pluralClinicalTrial} from "../../utils/utils";
import {api} from "../../utils/api";
import {useToken} from "../../hooks/users/useToken";

const CosmeticPage = () => {

    const {is_moderator} = useAuth()

    const navigate = useNavigate()

    const { id } = useParams<{id: string}>();

    const {cosmetic, setName, setDescription, fetchCosmetic, saveCosmetic, sendCosmetic, deleteCosmetic, setCosmetic, setSubstanceValue} = useCosmetic()

    useEffect(() => {
        id && fetchCosmetic(id)
        
        return () => {
            setCosmetic(undefined)
        };
    }, [])

    if (id == undefined || cosmetic == undefined)
    {
        return (
            <div className="cosmetic-page-wrapper">
                <h1>Пусто</h1>
            </div>
        )
    }

    const onSendCosmetic = async() => {
        await onSaveCosmetic()
        await sendCosmetic()
        navigate("/cosmetics")
    }

    const onDeleteCosmetic = async () => {
        await deleteCosmetic()
        navigate("/")
    }

    const onSaveCosmetic = async () => {
        cosmetic.substances.forEach(substance => {
            updateValue(substance.id, substance.percent_in)
        })

        await saveCosmetic()
    }

    const {access_token} = useToken()

    const updateValue = async (substance_id, value) => {
        const data = {
            'percent_in': value
        }

        await api.put(`cosmetics/${cosmetic.id}/update_substance/${substance_id}/`, data, {
            headers: {
                'authorization': access_token
            }
        })
    }

    const cards = cosmetic.substances.map(substance  => (
        <SubstanceCard substance={substance} key={substance.id} value={substance.percent_in} setValue={setSubstanceValue}/>
    ))

    const ButtonsContainer = () => {
        return (
            <div className="buttons-wrapper">

                <CustomButton onClick={onSaveCosmetic} bg={variables.green}>Сохранить</CustomButton>

                <CustomButton onClick={onSendCosmetic} bg={variables.primary}>Отправить</CustomButton>

                <CustomButton onClick={onDeleteCosmetic} bg={variables.red}>Удалить</CustomButton>

            </div>
        )
    }

    const is_draft = cosmetic.status == 1

    const completed = [3, 4].includes(cosmetic.status)

    return (
        <div className="cosmetic-page-wrapper">

            <div className="cosmetic-substances-wrapper">
                <div className="top">
                    <h3>{is_draft ? "Новая косметика" : cosmetic.name}</h3>
                </div>

                <div className="cosmetic-info-container">
                    <span>Статус: {STATUSES.find(status => status.id == cosmetic.status).name}</span>
                    <span>Дата создания: {moment(cosmetic.date_created).locale(ru()).format("D MMMM HH:mm")}</span>
                    {[2, 3, 4].includes(cosmetic.status) && <span>Дата формирования: {moment(cosmetic.date_formation).locale(ru()).format("D MMMM HH:mm")}</span>}
                    {completed && <span>Дата завершения: {moment(cosmetic.date_complete).locale(ru()).format("D MMMM HH:mm")}</span> }
                    {is_moderator && <span>Пользователь: {cosmetic.owner.name}</span> }
                    {[2, 3, 4].includes(cosmetic.status) && <span>Результаты клинических испытаний: {pluralClinicalTrial(cosmetic.clinical_trial)}</span>}
                </div>

                <div className="inputs-container">

                    <CustomInput placeholder="Название" value={cosmetic.name} setValue={setName} disabled={!is_draft}  />
                    <CustomTextarea placeholder="Описание" value={cosmetic.description} setValue={setDescription} disabled={!is_draft}  />

                </div>

                <div className="title">
                    <h3>Вещества</h3>
                </div>

                <div className="bottom">

                    {cards}

                </div>
            </div>

            {!is_moderator && is_draft && <ButtonsContainer />}

        </div>
    )
}

export default CosmeticPage