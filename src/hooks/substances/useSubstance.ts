import {useDispatch, useSelector} from 'react-redux';
import {
	updateSubstance,
	updateName,
	updateDescription,
	updateHeatOutput,
	updateImage
} from "../../store/substances/substanceSlice";
import {api} from "../../utils/api";

export function useSubstance() {
	const substance = useSelector(state => state.substance.substance);

	const dispatch = useDispatch()

	const setSubstance = (value) => {
		dispatch(updateSubstance(value))
	}

	const setName = (value) => {
		dispatch(updateName(value))
	}

	const setDescription = (value) => {
		dispatch(updateDescription(value))
	}

	const setHeatOutput = (value) => {
		dispatch(updateHeatOutput(value))
	}

	const setImage = (value) => {
		dispatch(updateImage(value))
	}

	const fetchSubstance = async (id) => {

		const {data} = await api.get(`substances/${id}`);

		setSubstance(data)

	};

	return {
		substance,
		setSubstance,
		fetchSubstance,
		setName,
		setDescription,
		setHeatOutput,
		setImage
	};
}