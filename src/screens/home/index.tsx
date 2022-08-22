import {
	Animated,
	StyleSheet,
	Text,
	TouchableOpacity,
	View
} from "react-native";
import React, { useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { SharedElement } from "react-navigation-shared-element";

// Data
import data from "./data";

// Utils
import {
	FULL_SIZE,
	ITEM_HEIGHT,
	ITEM_WIDTH,
	RADIUS,
	SPACING
} from "../../utils/theme";
import { StackNavigationProp } from "@react-navigation/stack";

// Type
import { NavigationList } from "../../navigation/types";

const Home = () => {
	const navigation = useNavigation<StackNavigationProp<NavigationList>>();
	const scrollX = useRef(new Animated.Value(0)).current;

	return (
		<SafeAreaView style={styles.safearea}>
			<Animated.FlatList
				horizontal
				showsHorizontalScrollIndicator={false}
				data={data}
				snapToInterval={FULL_SIZE}
				decelerationRate='fast'
				keyExtractor={item => String(item.key)}
				onScroll={Animated.event(
					[{ nativeEvent: { contentOffset: { x: scrollX } } }],
					{ useNativeDriver: true }
				)}
				renderItem={({ item, index }) => {
					const inputRange = [
						(index - 1) * FULL_SIZE,
						index * FULL_SIZE,
						(index + 1) * FULL_SIZE
					];

					const translateX = scrollX.interpolate({
						inputRange,
						outputRange: [
							ITEM_WIDTH / 2,
							index === data.length - 1 ? -ITEM_WIDTH / 2 / 1.9 : 0,
							-ITEM_WIDTH / 2
						]
					});

					const daysTranslateX = scrollX.interpolate({
						inputRange,
						outputRange: [
							ITEM_WIDTH,
							index === data.length - 1 ? -ITEM_WIDTH / 1.9 : 0,
							-ITEM_WIDTH
						]
					});

					const scale = scrollX.interpolate({
						inputRange,
						outputRange: [1, 1.2, 1]
					});

					return (
						<TouchableOpacity
							style={styles.card}
							onPress={() =>
								navigation.navigate("Details", {
									key: item.key,
									image: item.image,
									location: item.location
								})
							}
						>
							<SharedElement
								id={`item.${item.key}.photo`}
								style={styles.sharedElement}
							>
								<Animated.Image
									source={{ uri: item.image }}
									style={[
										styles.cardImage,
										{
											transform: [{ scale }]
										}
									]}
								/>
							</SharedElement>
							<LinearGradient
								colors={[item.color, "rgba(0,0,0,0)"]}
								start={{
									x: 0.5,
									y: 1
								}}
								end={{
									x: 0.5,
									y: 0.3
								}}
								style={styles.linearGradient}
							>
								<View style={styles.cardContent}>
									<SharedElement
										id={`item.${item.key}.location`}
										shouldRasterizeIOS={false}
									>
										<Animated.Text
											style={[styles.location, { transform: [{ translateX }] }]}
										>
											{item.location}
										</Animated.Text>
									</SharedElement>
									<Animated.View
										style={[
											styles.daysContainer,
											{ transform: [{ translateX: daysTranslateX }] }
										]}
									>
										<Text style={styles.number}>{item.numberOfDays}</Text>
										<Text style={styles.days}>days</Text>
									</Animated.View>
								</View>
							</LinearGradient>
						</TouchableOpacity>
					);
				}}
			/>
		</SafeAreaView>
	);
};

export default Home;

const styles = StyleSheet.create({
	safearea: {
		flex: 1
	},
	card: {
		height: ITEM_HEIGHT,
		width: ITEM_WIDTH,
		margin: SPACING,
		borderRadius: RADIUS,
		overflow: "hidden"
	},
	sharedElement: {
		...StyleSheet.absoluteFillObject
	},
	cardImage: {
		...StyleSheet.absoluteFillObject,
		resizeMode: "cover",
		borderRadius: RADIUS
	},
	linearGradient: {
		...StyleSheet.absoluteFillObject,
		position: "absolute",
		top: 0,
		left: 0,
		height: "100%",
		width: "100%"
	},
	cardContent: {
		...StyleSheet.absoluteFillObject,
		padding: SPACING * 2,
		justifyContent: "flex-end"
	},
	location: {
		fontSize: 25,
		color: "#fff",
		width: 0.8 * ITEM_WIDTH,
		textTransform: "uppercase",
		fontWeight: "bold"
	},
	daysContainer: {
		marginTop: SPACING / 2,
		flexDirection: "row"
	},
	days: {
		color: "#fff"
	},
	number: {
		color: "#fff",
		fontWeight: "bold",
		marginRight: SPACING / 2
	}
});
