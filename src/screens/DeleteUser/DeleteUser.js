import React, { Component } from "react";

import { Icon } from "react-native-elements";

import {
	CountryDropdown,
	RegionDropdown,
	CountryRegionData
} from "react-country-region-selector";
import {
	Platform,
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	ScrollView,
	Button,
	TextInput
} from "react-native";
// import { TextInput } from "react-native-paper";
import Joining_Requests from "../../components/JoiningRequests/JoiningRequests";
import firebase from "../../../Firebase";
import SendSMS from "react-native-sms";

export default class UserNotification extends React.Component {
	constructor(props) {
		super(props);

		this.state = {};
	}
	componentDidMount() {
		var { screenProps } = this.props;
		console.log(screenProps.user.id + "++++++userid++++");
	}

  goback() {
    this.props.navigation.navigate("HomeNavigator");
  }

	render() {
		return (
			<View style={{ flex: 1, backgroundColor: "#fff" }}>
				<View style={styles.header}>
					<View>
						<TouchableOpacity
							title=""
							onPress={this.goback.bind(this)}
						>
							<Icon name="arrow-back" color="white" size={30} />
						</TouchableOpacity>
					</View>
					<Text style={styles.home}>Delete User</Text>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-between"
						}}
					/>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#F5FCFF"
	},

	home: {
		fontFamily: "lucida grande",
		justifyContent: "center",
		fontWeight: "bold",
		fontSize: 22,
		color: "white"
	},
	header: {
		backgroundColor: "#C60C31",
		borderBottomWidth: 2,
		borderBottomColor: "white",
		padding: 10,
		flexDirection: "row",
		justifyContent: "space-between"
	}
});
