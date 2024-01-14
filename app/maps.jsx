import { View, Text, Image, Dimensions, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import MapView, { Marker, Polyline } from "react-native-maps";
import * as Location from "expo-location";
import MapViewDirections from "react-native-maps-directions";
import Warehouse from "../assets/images/warehouse.png";
import Vehicle1 from "../assets/images/trucks/1.png";
import Vehicle2 from "../assets/images/trucks/2.png";
import Vehicle3 from "../assets/images/trucks/3.png";
import Vehicle4 from "../assets/images/trucks/4.png";
import axios from "axios";
import { decode } from "@googlemaps/polyline-codec";

export default function Map() {
	const [location, setLocation] = useState(null);
	const [coords, setCoords] = useState([]);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [markerPosition, setMarkerPosition] = useState({
		latitude: 19.009220083679345,
		longitude: 73.02773862632445,
	});
	const [trucks, setTrucks] = useState([
		{ loc: { latitude: 19.076, longitude: 72.8777 }, mark: Vehicle1 },
		{ loc: { latitude: 19.2183, longitude: 72.9781 }, mark: Vehicle3 },
		{ loc: { latitude: 19.0621, longitude: 72.8617 }, mark: Vehicle2 },
		{ loc: { latitude: 19.1997, longitude: 72.7709 }, mark: Vehicle2 },
		{ loc: { latitude: 19.0762, longitude: 72.8751 }, mark: Vehicle4 },
	]);

	const [wh, setWh] = useState([
		{
			name: "Bhiwandi",
			loc: { latitude: 19.2813, longitude: 73.0485 },
		},
		{
			name: "Andheri East",
			loc: { latitude: 19.1157, longitude: 72.8546 },
		},
		{
			name: "Vikhroli",
			loc: { latitude: 19.0923, longitude: 72.9188 },
		},
		{
			name: "Kalamboli",
			loc: { latitude: 19.0247, longitude: 73.1092 },
		},
		{
			name: "Ghodbunder Road, Thane",
			loc: { latitude: 19.2183, longitude: 72.9781 },
		},
	]);

	useEffect(() => {
		(async () => {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== "granted") {
				setErrorMsg("Permission to access location was denied");
				return;
			}

			let locationNow = await Location.getCurrentPositionAsync({});
			setLocation(locationNow);
		})();
	}, []);

	const moveMarkerAlongPolyline = () => {
		const nextIndex = currentIndex + 1;
		console.log(nextIndex);
		if (nextIndex < coords.length) {
			const nextCoordinate = coords[nextIndex];
			setMarkerPosition(nextCoordinate);
			setCurrentIndex(nextIndex);
		}
	};
	const intervalId = setInterval(moveMarkerAlongPolyline, 10000); // Adjust the interval as needed
	useEffect(() => {
		return () => clearInterval(intervalId);
	}, [currentIndex, coords]);

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
		setCoords(decode(res));
	};

	points();

	return (
		<View className="flex-1">
			{location ? (
				<MapView
					loadingEnabled={true}
					minZoomLevel={12}
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
					{trucks.map((v, i) => {
						return (
							<Marker key={i} flat={true} coordinate={v.loc}>
								<Image
									resizeMode="contain"
									resizeMethod="resize"
									source={v.mark}
								/>
							</Marker>
						);
					})}

					{wh.map((v, i) => {
						return (
							<Marker key={i} flat={true} coordinate={v.loc}>
								<Image
									resizeMode="contain"
									resizeMethod="resize"
									source={Warehouse}
								/>
							</Marker>
						);
					})}

					{coords ? (
						<View>
							<Polyline
								coordinates={coords.map((c) => ({
									latitude: c[0],
									longitude: c[1],
								}))}
								strokeWidth={4}
							/>
							<Marker flat={true} coordinate={markerPosition}>
								<Image
									resizeMode="contain"
									resizeMethod="resize"
									source={Vehicle4}
								/>
							</Marker>
							<Marker coordinate={dest} />
						</View>
					) : (
						""
					)}
				</MapView>
			) : (
				""
			)}
		</View>
	);
}
