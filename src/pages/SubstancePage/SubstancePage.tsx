import "./SubstancePage.sass"
import {Dispatch, useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {iSubstancesMock, requestTime} from "../../utils/consts";
import {Substance} from "../../utils/types";
import mockImage from "/src/assets/mock.png"

const SubstancePage = ({ selectedSubstance, setSelectedSubstance }: { selectedSubstance:Substance | undefined, setSelectedSubstance: Dispatch<Substance| undefined>}) => {

    const { id } = useParams<{id: string}>();

    const [isMock, setIsMock] = useState<boolean>(false);

    useEffect(() => {
        fetchData()
    }, [])

    if (id == undefined){
        return;
    }

    const fetchData = async () => {

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/substances/${id}`, {
                method: "GET",
                signal: AbortSignal.timeout(requestTime)
            });

            if (!response.ok)
            {
                CreateMock()
                return;
            }

            const service: Substance = await response.json()

            setSelectedSubstance(service)

            setIsMock(false)

        } catch
        {
            CreateMock()
        }

    };

    const CreateMock = () => {
        setSelectedSubstance(iSubstancesMock.find((service:Substance) => service?.id == parseInt(id)))
        setIsMock(true)
    }

    const img = `http://127.0.0.1:8000/api/substances/${id}/image/`

    if (selectedSubstance == undefined) {
        return (
            <div className="page-details-wrapper">

                <Link className="return-link" to="/">
                    Назад
                </Link>

            </div>
        )
    }

    return (
        <div className="page-details-wrapper">

            <Link className="return-link" to="/">
                Назад
            </Link>

            <div className="left">

                <img src={isMock ? mockImage : img}  alt=""/>

            </div>

            <div className="right">

                <div className="info-container">

                    <h2 className="name">{selectedSubstance.name}</h2>

                    <br />

                    <span>{selectedSubstance.description}</span>


                </div>

            </div>

        </div>
    )
}

export default SubstancePage;