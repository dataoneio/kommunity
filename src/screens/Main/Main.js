import React, { Component } from "react";
import {
	Platform,
	StyleSheet,
	Text,
	View,
	AsyncStorage,
	Image,
	Dimensions
} from "react-native";
import ContentLoader from "react-native-content-loader";
import { Circle, Rect } from "react-native-svg";
const win = Dimensions.get("window");

import firebase from "../../../Firebase";

export default class Main extends Component {
	constructor(props) {
		super(props);
		this.state = {
			setToken: "",
			getToken: ""
		};
	}

	isToken() {
		if (this.state.getToken === null) {
			setTimeout(() => {
				console.log("value not  already stored");
				this.props.navigation.navigate("CommunityList");
			}, 3000);
		} else {
			var { screenProps } = this.props;
			AsyncStorage.getItem("CommunityName").then(value => {
				(screenProps.user.CommunityName = value),
					console.log("community name -------" + value);
				console.log(screenProps.user.CommunityName + "rerere");
				firebase
					.database()
					.ref(
						"app/" +
							screenProps.user.CommunityName +
							"/Blocked_Users"
					)
					.orderByChild("Blocked_Number")
					.equalTo(this.state.getToken)
					.once("value", snapshot => {
						if (snapshot.exists()) {
							alert(
								"This number has been blocked. Please contact Admin for more information."
							);
							setTimeout(() => {
								console.log("number is blocked!!!");
								AsyncStorage.removeItem("token");
								this.props.navigation.navigate("Main");
							}, 3000);
						} else {
							setTimeout(() => {
								console.log("number is not bloked!");
								this.props.navigation.navigate("HomeNavigator");
							}, 3000);
						}
					});
			});
		}
	}

	componentDidMount() {
		console.log("did mount");
		this.getValueLocally();
	}

	getValueLocally = () => {
		AsyncStorage.getItem("token").then(value =>
			this.setState({ getToken: value }, () => this.isToken())
		);
	};

	render() {
		return (
			<View
				style={{
					flex: 1,
					padding: 0,
					backgroundColor: "#C60C31",
					justifyContent: "flex-end",
					alignItems: "center"
				}}
			>
				<View
					style={{
						width: 150,
						height: 150,
						//borderRadius: 150,
						//backgroundColor: "white",
						justifyContent: "center"
					}}
				>
					<Image
						style={styles.logoStyle}
						source={require("../../assets/SplashLogo.png")}
					/>
				</View>
				<Image
					style={styles.Image}
					source={require("../../assets/main.png")}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		//justifyContent: "center",
		alignItems: "center",
		backgroundColor: "black"
	},
	logoStyle: {
		alignSelf: "center",
		// position: "relative",
		height: 200,
		width: 200
		//top:10,
	},
	Image: {
		marginLeft: 0,
		justifyContent: "center",
		justifyContent: "flex-end",
		width: win.width / 2 + 150,
		height: win.height / 2 + 40
	}
});
