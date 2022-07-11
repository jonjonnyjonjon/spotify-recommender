import { Box, Text } from "@chakra-ui/react"
import FieldSlider from "./FieldSlider"

const SongFields = ({ fieldValues, setFn }) => {
    const fields = ["Energy", "Danceability"];
	return (
		<Box w="60%">
			{setFn.map((fn, idx) => {
				return (
					<Box key={fields[idx]}>
						<Text>Field: {fields[idx]}</Text>
						<FieldSlider fieldValue={fieldValues[idx]} fieldFn={fn} />
					</Box>
				);
			})}
		</Box>
	);
};

export default SongFields