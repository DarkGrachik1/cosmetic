import {useDispatch, useSelector} from 'react-redux';
import {
	updateSubstance
} from "../../store/substances/substanceSlice";
import {api} from "../../utils/api";

export function useSubstance() {
	const substance = useSelector(state => state.substance.substance);

	const dispatch = useDispatch()

	const setSubstance = (value) => {
		dispatch(updateSubstance(value))
	}

	const fetchSubstance = async (id) => {

		const {data} = await api.get(`substances/${id}`);

		setSubstance(data)

	};

	return {
		substance,
		setSubstance,
		fetchSubstance
	};
}