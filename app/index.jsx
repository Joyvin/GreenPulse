// import { StyleSheet, Text, View, Image } from "react-native";
// import React from "react";
// import Wave from "../assets/images/wave1.jpeg";
// import { Pressable } from "react-native";
// import { router } from "expo-router";

// export default function Start() {
// 	return (
// 		<View className="flex-1 justify-center items-center">
// 			<Image
// 				className="w-full h-full absolute inset-0 top-0"
// 				source={Wave}
// 			/>
// 			<Pressable
// 				className="text-black"
// 				onPress={() => {
// 					router.replace("/maps");
// 				}}
// 			>
// 				<Text>Maps</Text>
// 			</Pressable>
// 			<Pressable
// 				className="text-black"
// 				onPress={() => {
// 					router.replace("/login");
// 				}}
// 			>
// 				<Text>Login</Text>
// 			</Pressable>
// 		</View>
// 	);
// }

// const styles = StyleSheet.create({});

import {
	SafeAreaView,
	View,
	Text,
	Image,
	StyleSheet,
	Button,
	Pressable,
} from "react-native";
import React from "react";
import Screen from "../assets/images/screen.png";
import Logo from "../assets/images/logoPulse.png";
import { router } from "expo-router";

export default function login() {
	return (
		<SafeAreaView className="flex-1 h-screen">
			<Image
				source={Screen}
				className="w-screen -z-1 h-screen bottom-0 absolute"
			/>
			<View style={styles.tContainer}>
				<Image source={Logo} style={styles.logo} />
				<Text style={styles.title}>Green Pulse</Text>
				<Button
					onPress={() => {
						router.replace("/maps");
					}}
					style={styles.btnn}
					title={"Let's Begin"}
				>
					Let's Begin
				</Button>
			</View>
			<View className="bg-indigo w-full"></View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	logoContainer: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "between",
		height: "auto",
		width: "100%",
	},
	subLC: {
		width: "25%",
		// objectFit: "contain",
		display: "flex",
		flexDirection: "row",
		justifyContent: "start",
	},
	tContainer: {
		height: "100vh",
		width: "100vw",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		marginTop: 200,
	},
	logo: { width: 150, height: 100 },
	title: {
		fontSize: 36,
		fontWeight: "700",
		color: "#000",
		paddingTop: 10,
		paddingBottom: 30,
	},
});
