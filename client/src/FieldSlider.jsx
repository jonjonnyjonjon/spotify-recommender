import {
	Slider,
	SliderTrack,
	SliderFilledTrack,
	SliderThumb,
	SliderMark,
	Tooltip,
} from "@chakra-ui/react";
import { useState } from "react";

const FieldSlider = ({ fieldValue, fieldFn }) => {
	const [showTooltip, setShowTooltip] = useState(false);

	return (
		<Slider
			id="slider"
			defaultValue={50}
			min={0}
			max={100}
			mt={10}
			mb={10}
			colorScheme="teal"
			onChange={(v) => fieldFn(v/100)}
			onMouseEnter={() => setShowTooltip(true)}
			onMouseLeave={() => setShowTooltip(false)}
		>
			<SliderMark value={25} mt="1" ml="-2.5" fontSize="sm">
				0.25
			</SliderMark>
			<SliderMark value={50} mt="1" ml="-2.5" fontSize="sm">
				0.5
			</SliderMark>
			<SliderMark value={75} mt="1" ml="-2.5" fontSize="sm">
				0.75
			</SliderMark>
			<SliderTrack>
				<SliderFilledTrack />
			</SliderTrack>
			<Tooltip
				hasArrow
				bg="teal.500"
				color="white"
				placement="top"
				isOpen={showTooltip}
				label={`${fieldValue}`}
			>
				<SliderThumb />
			</Tooltip>
		</Slider>
	);
};

export default FieldSlider;
