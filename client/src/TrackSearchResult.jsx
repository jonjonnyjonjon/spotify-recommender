import React from "react";
import { Box } from "@chakra-ui/react";

import {
	ResultContainer,
	ResultImage,
	SongContainer,
	TitleText,
	ArtistText,
} from "./styles/TrackSearchResults.styles";

import { AiFillPlayCircle } from "react-icons/ai";

const TrackSearchResult = ({ track, current, setPlayingTrack }) => {
	function playTrack() {
		current.pause();
		current.currentTime = 0;
		const newTrack = new Audio(track.preview_url);
		newTrack.play();
		setPlayingTrack(newTrack);
	}

	return (
		<ResultContainer>
			<ResultImage src={track.album.images[0].url} />
			<SongContainer>
				<TitleText>{track.name}</TitleText>
				<ArtistText>{track.artists[0].name}</ArtistText>
			</SongContainer>
			<Box>
				<AiFillPlayCircle
					style={{ cursor: "pointer" }}
					onClick={() => playTrack()}
				/>
			</Box>
		</ResultContainer>
	);
};

export default TrackSearchResult;
