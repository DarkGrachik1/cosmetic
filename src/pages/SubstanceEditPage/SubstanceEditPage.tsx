import "./SubstanceEditPage.sass"
import {useParams, useNavigate} from "react-router-dom";
import {useSubstance} from "../../hooks/substances/useSubstance";
import React, {useEffect, useState} from "react";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomTextarea from "../../components/CustomTextarea/CustomTextarea";
import CustomButton from "../../components/CustomButton/CustomButton";
import {api} from "../../utils/api";
import {useToken} from "../../hooks/users/useToken";
import UploadButton from "../../components/UploadButton/UploadButton";
import {variables} from "../../utils/consts";
import {useSubstances} from "../../hooks/substances/useSubstances";

const SubstanceEditPage = () => {

    const navigate = useNavigate()

    const {access_token} = useToken()

    const {deleteSubstance} = useSubstances()

    const { id } = useParams<{id: string}>();

    const {
        substance,
        fetchSubstance,
        setName,
        setDescription,
        setImage
    } = useSubstance()

    useEffect(() => {
        id && fetchSubstance(id)
    }, [])

    const [img, setImg] = useState<File | undefined>(undefined)

    const handleFileChange = (e) => {
        if (e.target.files) {
            const img = e.target?.files[0]
            setImg(img)
            setImage(URL.createObjectURL(img))
        }
    }

    const saveSubstance = async() => {
        let form_data = new FormData()

        form_data.append('name', substance.name)
        form_data.append('description', substance.description)

        if (img != undefined) {
            form_data.append('image', img, img.name)
        }

        const response = await api.put(`substances/${substance.id}/update/`, form_data, {
            headers: {
                'content-type': 'multipart/form-data',
                'authorization': access_token
            }
        })

        if (response.status == 200) {
            setImg(undefined)
            navigate("/")
        }
    }

    const handleDeleteSubstance = async () => {
        await deleteSubstance(substance)
        setImg(undefined)
        navigate("/")
    }

    if (id == undefined) {
        return (
            <div>

            </div>
        )
    }

    if (substance == undefined) {
        return (
            <div>

            </div>
        )
    }

    return (
        <div className="edit-page-wrapper">

            <div className="left">

                <img src={substance.image} alt=""/>

                <UploadButton handleFileChange={handleFileChange} />

            </div>

            <div className="right">

                <div className="info-container">

                    <CustomInput placeholder="Название" value={substance.name} setValue={setName} />

                    <CustomTextarea placeholder="Описание" value={substance.description} setValue={setDescription} />

                    <div className="buttons-container">

                        <CustomButton bg={variables.green} onClick={saveSubstance}>
                            Сохранить
                        </CustomButton>

                        <CustomButton bg={variables.red} onClick={handleDeleteSubstance}>
                            Удалить
                        </CustomButton>

                    </div>

                </div>

            </div>
        </div>
    )
}

export default SubstanceEditPage