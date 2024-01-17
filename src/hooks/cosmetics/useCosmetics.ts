import {useDispatch, useSelector} from 'react-redux';
import {
	updateStatus,
	updateDateStart,
	updateDateEnd,
	updateUser
} from "../../store/cosmetics/cosmeticsSlice";
import {api} from "../../utils/api";
import {useToken} from "../users/useToken";

export function useCosmetics() {
	const status = useSelector(state => state.cosmetics.status)
	const date_start = useSelector(state => state.cosmetics.date_start)
	const date_end = useSelector(state => state.cosmetics.date_end)
	const user = useSelector(state => state.cosmetics.user)

	const dispatch = useDispatch()

	const {access_token} = useToken()

	const setStatus = (value) => {
		dispatch(updateStatus(value))
	}

	const setDateStart = (value) => {
		dispatch(updateDateStart(value))
	}

	const setDateEnd = (value) => {
		dispatch(updateDateEnd(value))
	}

	const setUser = (value) => {
		dispatch(updateUser(value))
	}

	const searchCosmetics = async () => {

		const {data} = await api.get(`cosmetics/search/`, {
			params: {
				status: status,
				date_start: new Date(date_start),
				date_end: new Date(date_end)
			},
			headers: {
				'authorization': access_token
			}
		})

		// data = data.filter(cosmetic => cosmetic.employer.name.includes(user))

		return data

	}

	return {
		status,
		date_start,
		date_end,
		setStatus,
		searchCosmetics,
		setDateStart,
		setDateEnd,
		setUser
	};
}