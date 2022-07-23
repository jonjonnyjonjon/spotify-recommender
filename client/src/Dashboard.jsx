import { useState, useEffect } from "react";
import useAuth from "./hooks/useAuth";
import TrackSearchResult from "./TrackSearchResult";
import SpotifyWebApi from "spotify-web-api-js";
import { ResultsContainer } from "./styles/Dashboard.styles";
import {
	Avatar,
	Box,
	HStack,
	Image,
	Input,
	Tag,
	TagLabel,
	Text,
	VStack,
} from "@chakra-ui/react";
import SongFields from "./SongFields";

// const spotifyApi = new SpotifyWebApi({
// 	clientId: process.env.REACT_APP_CLIENT_ID,
// });

var spotifyApi = new SpotifyWebApi();

const Dashboard = ({ code }) => {
	const accessToken = useAuth(code);
	const [searchResults, setSearchResults] = useState([]);
	const [playingTrack, setPlayingTrack] = useState(new Audio(""));
	const [searchArtist, setSearchArtist] = useState("");
	const [seedArtists, setSeedArtists] = useState([]);
	const [searchArtistResult, setSearchArtistResult] = useState([]);
	const [minEnergy, setMinEnergy] = useState(0.5);
	const [minDanceability, setMinDanceability] = useState(0.5);

	useEffect(() => {
		if (!accessToken) return;
		spotifyApi.setAccessToken(accessToken);
		spotifyApi
			.getRecommendations({
				min_energy: minEnergy,
				seed_artists: ["6mfK6Q2tzLMEchAr0e9Uzu", "4DYFVNKZ1uixa6SQTvzQwJ"],
				min_danceability: minDanceability,
			})
			.then(
				(data) => {
					let recommendations = data.tracks;
					setSearchResults(recommendations);
				},
				function (err) {
					console.log("Something went wrong!", err);
				}
			);
	}, [accessToken, minEnergy, minDanceability]);

	const artistInputChange = (event) => {
		if (!accessToken) return;
		spotifyApi.setAccessToken(accessToken);
		setSearchArtist(event.target.value);
		if (searchArtist === "") setSearchArtistResult([]);
		spotifyApi.searchArtists(searchArtist, { limit: 10 }).then(
			(data) => {
				// console.log(data.artists.items);
				setSearchArtistResult(data.artists.items);
			},
			(err) => console.log(err)
		);
	};

	return (
		<Box m={10}>
			<Box>
				<Text>Dashboard page</Text>
			</Box>
			<Box>
				<Box>
					<HStack>
						<Text>Choose at least 1 artist: </Text>
						{seedArtists.map((artist) => (
							<Tag size="lg" colorScheme="red" borderRadius="full" key={artist.name}>
								<Avatar
									src={artist.images !== null ? artist.images[0].url : null}
									size="xs"
									name={artist.name}
									ml={-1}
									mr={2}
								/>
								<TagLabel>{artist.name}</TagLabel>
							</Tag>
						))}
					</HStack>
					<Input onChange={(event) => artistInputChange(event)} />
					<VStack align="left" shadow="md">
						{(searchArtistResult.length === 0) & (searchArtist !== "") ? (
							<Text>No results found!</Text>
						) : (
							searchArtistResult.map((artist) => (
								<HStack shadow="md">
									<Image
										boxSize="50px"
										src={
											artist.images.length !== 0 ? artist.images[0].url : null
										}
									/>
									<Text>{artist.name}</Text>
								</HStack>
							))
						)}
					</VStack>
				</Box>
				<SongFields
					fieldValues={[minEnergy, minDanceability]}
					setFn={[setMinEnergy, setMinDanceability]}
				/>
			</Box>

			<ResultsContainer>
				{searchResults.map((track) => (
					<TrackSearchResult
						track={track}
						key={track.uri}
						current={playingTrack}
						setPlayingTrack={setPlayingTrack}
					/>
				))}
			</ResultsContainer>
		</Box>
	);
};

export default Dashboard;
