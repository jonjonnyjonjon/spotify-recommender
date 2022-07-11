import React, { useState, useEffect, usePrevious } from "react";

import useAuth from './hooks/useAuth';
import Player from './Player';
import TrackSearchResult from './TrackSearchResult';
import SpotifyWebApi from 'spotify-web-api-node';
import axios from 'axios';
import {
  DashBoardContainer,
  ResultsContainer,
  PlayerContainer,
} from './styles/Dashboard.styles';
import { Box, Text } from '@chakra-ui/react';
import SongFields from "./SongFields";

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.REACT_APP_CLIENT_ID,
});

const Dashboard = ({ code }) => {
  const accessToken = useAuth(code);
  const [searchResults, setSearchResults] = useState([]);
  const [playingTrack, setPlayingTrack] = useState(new Audio(''));

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
					let recommendations = data.body.tracks;
          // console.log(recommendations);
					setSearchResults(recommendations);
				},
				function (err) {
					console.log("Something went wrong!", err);
				}
			);
	}, [accessToken, minEnergy, minDanceability]);


  return (
		<Box m={10}>
			<Box>
				<Text>Dashboard page</Text>
			</Box>
			<Box>
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
