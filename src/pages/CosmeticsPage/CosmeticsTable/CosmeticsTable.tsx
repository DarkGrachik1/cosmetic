import React from "react";
import "./CosmeticsTable.sass"
import {STATUSES} from "/src/utils/consts";
import {ru} from "/src/utils/momentLocalization";
import moment from "moment";
import {useQuery} from "react-query";
import {useCosmetics} from "../../../hooks/cosmetics/useCosmetics";
import {useCustomTable} from "../../../hooks/other/useCustomTable";
import CustomTable from "../../../components/CustomTable/CustomTable";
import {useNavigate} from "react-router-dom"
import CosmeticsFilters from "../CosmeticsFilters/CosmeticsFilters";

const CosmeticsTable = () => {

    const navigate = useNavigate()

    const {searchCosmetics} = useCosmetics()

    const columns = [
        {
            Header: "№",
            accessor: "id"
        },
        {
            Header: "Название",
            accessor: "name",
            Cell: ({ value }) => { return value }
        },
        {
            Header: "Статус",
            accessor: "status",
            Cell: ({ value }) => { return STATUSES.find(status => status.id == value).name }
        },
        {
            Header: "Дата формирования",
            accessor: "date_formation",
            Cell: ({ value }) => { return moment(value).locale(ru()).format("D MMMM HH:mm") }
        }
    ]

    const { isLoading, data, isSuccess, refetch } = useQuery(
        ["cosmetics"],
        () => searchCosmetics(),
        {
            keepPreviousData: true,
        }
    );

    const {
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow
    } = useCustomTable(
        columns,
        isSuccess,
        data
    )

    const handleClick = (cosmetic_id) => {
        navigate(`/cosmetics/${cosmetic_id}`)
    }

    return (
        <div>

            <CustomTable
                getTableBodyProps={getTableBodyProps}
                headerGroups={headerGroups}
                page={page}
                prepareRow={prepareRow}
                isLoading={isLoading}
                onClick={handleClick}
            >
                <CosmeticsFilters refetch={refetch}/>
            </CustomTable>

        </div>
    )
}

export default CosmeticsTable