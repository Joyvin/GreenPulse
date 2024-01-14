import { SafeAreaView, View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import Screen from "../assets/images/screen.png";
import Logo from "../assets/images/logoPulse.png";

export default function login() {
	return (
		<SafeAreaView className="flex-1 h-screen">
			<Image
				source={Screen}
				className="w-screen -z-1 h-screen bottom-0 absolute"
			/>
			<View style={styles.logoContainer}>
				{/* <View style={styles.subLC}> */}
				<Image source={Logo} style={styles.logo} />
				{/* </View> */}
			</View>
			<View>
				<Text style={styles.title}>Green Pulse</Text>
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
	logo: {
		width: "300px",
		height: "200px",
		aspectRatio: "316/205",
	},
	tContainer: {
		height: "100vh",
		width: "100vw",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},

	title: {
		fontSize: 36,
		fontWeight: "700",
		color: "#000",
	},
});
