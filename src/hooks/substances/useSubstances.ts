import {useDispatch, useSelector} from 'react-redux';
import {
	updateSubstances,
	updateQuery
} from "../../store/substances/substancesSlice";
import {api} from "../../utils/api";
import {useCosmetic} from "../cosmetics/useCosmetic";
import {useToken} from "../users/useToken";
import {AxiosRequestConfig} from "axios";

export function useSubstances() {
	const substances = useSelector(state => state.substances.substances);
	const query = useSelector(state => state.substances.query);

	const {access_token} = useToken()

	const {fetchCosmetic} = useCosmetic()

	const dispatch = useDispatch()

	const setSubstances = (value) => {
		dispatch(updateSubstances(value))
	}

	const setQuery = (value) => {
		dispatch(updateQuery(value))
	}

	const searchSubstances = async () => {
		
		const {data} = await api.get(`substances/search`, {
			params: {
				query: query
			},
			headers: {
				'authorization': access_token
			}
		})

		const draft_cosmetic_id = data["draft_cosmetic_id"]
		draft_cosmetic_id && fetchCosmetic(draft_cosmetic_id)

		return data["substances"]
	}

	const fetchSubstances = async () => {
		searchSubstances().then(data => setSubstances(data))
	}

	return {
		substances,
		setSubstances,
		query,
		setQuery,
		searchSubstances,
		fetchSubstances
	};
}