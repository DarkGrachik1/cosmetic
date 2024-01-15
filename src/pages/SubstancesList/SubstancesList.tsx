import "./SubstancesList.sass"
import SearchBar from "../../components/SearchBar/SearchBar";
import React, {useEffect, useState} from "react";
import SubstanceCard from "./SubstanceCard/SubstanceCard";
import {iSubstancesMock, requestTime} from "../../utils/consts";
import {Substance} from "../../utils/types";

const SubstancesList = () => {

    const [Substances, setSubstances] = useState<Substance[]>([]);

    const [query, setQuery] = useState<string>("");

    const [isMock, setIsMock] = useState<boolean>(false);

    const searchSubstances = async () => {

        try {

            const response = await fetch(`http://localhost:8000/api/substances/search/?&query=${query}`, {
                method: "GET",
                signal: AbortSignal.timeout(requestTime)
            })

            if (!response.ok){
                createMock();
                return;
            }

            const raw = await response.json()
            const substances: Substance[] = raw["substances"]

            setSubstances(substances)
            setIsMock(false)

        } catch (e) {

            createMock()

        }
    }

    const createMock = () => {

        setIsMock(true);
        setSubstances(iSubstancesMock.filter(substance => substance.name.toLowerCase().includes(query)))

    }

    useEffect(() => {
        searchSubstances()
    }, [])

    const cards = Substances.map(substance  => (
        <SubstanceCard substance={substance} key={substance.id} isMock={isMock}/>
    ))

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        searchSubstances()
    }

    return (
        <div className="cards-list-wrapper">

            <form className="top" onSubmit={(e) => handleSubmit(e)}>

                <h2>Поиск веществ</h2>

                <SearchBar query={query} setQuery={setQuery} />

            </form>

            <div className="bottom">

                { cards }

            </div>

        </div>
    )
}

export default SubstancesList;