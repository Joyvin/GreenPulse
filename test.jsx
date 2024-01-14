import { View, Text, Image, Dimensions, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import MapView, { Marker, Polyline } from "react-native-maps";
import * as Location from "expo-location";
import { decode } from "@googlemaps/polyline-codec";
import Vehicle from "../../assets/images/vehicle.png";
import axios from "axios";

export default async function Map() {
	const [location, setLocation] = useState(null);
	const [polylineIndex, setPolylineIndex] = useState(0);
	const [markerPosition, setMarkerPosition] = useState(src);

	const updateMarkerPosition = () => {
		if (polylineIndex < polylineCoords.length - 1) {
			const nextIndex = polylineIndex + 1;
			const nextPosition = polylineCoords[nextIndex];
			setMarkerPosition(nextPosition);
			setPolylineIndex(nextIndex);
		}
	};

	useEffect(() => {
		(async () => {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== "granted") {
				setErrorMsg("Permission to access location was denied");
				return;
			}

			let locationNow = await Location.getCurrentPositionAsync({});
			console.log(locationNow);
			setLocation(locationNow);
		})();
	}, []);

	useEffect(() => {
		const intervalId = setInterval(updateMarkerPosition, 1000);
		return () => clearInterval(intervalId);
	}, [polylineIndex]);

	const src = {
		latitude: 19.009220083679345,
		longitude: 73.02773862632445,
	};

	const dest = { latitude: 18.650219491817804, longitude: 73.28008537392401 };
	const points = async () => {
		const url =
			"https://maps.googleapis.com/maps/api/directions/json?destination=18.650219491817804,73.28008537392401&origin=19.009220083679345,73.02773862632445&key=" +
			process.env.EXPO_PUBLIC_API_KEY;
		var res = await axios.post(url).then((e) => {
			return e.data.routes[0].overview_polyline.points;
		});
		return res;
	};

	let coords = decode(await points(), 5);

	return (
		<View className="flex-1">
			{location ? (
				<MapView
					loadingEnabled={true}
					minZoomLevel={10}
					rotateEnabled={false}
					mapType="terrain"
					className="flex-1"
					initialRegion={{
						latitude: location.coords.latitude,
						longitude: location.coords.longitude,
						latitudeDelta: 0.04,
						longitudeDelta: 0.05,
					}}
				>
					<Polyline
						coordinates={coords.map((c) => ({
							latitude: c[0],
							longitude: c[1],
						}))}
						strokeWidth={4}
						strokeColor="green"
					/>
					<Marker coordinate={markerPosition}>
						<Image
							resizeMode="contain"
							resizeMethod="resize"
							source={Vehicle}
						/>
					</Marker>

					<Marker coordinate={dest} />
				</MapView>
			) : (
				<Text>{JSON.stringify("")}</Text>
			)}
		</View>
	);
}
