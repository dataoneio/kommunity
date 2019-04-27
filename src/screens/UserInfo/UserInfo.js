import React, { Component } from "react";
import Image from "react-native-image-progress";
import * as Progress from "react-native-progress";
import { Icon } from "react-native-elements";
import renderIf from "../../components/ViewFeed/renderIf";
import { Dropdown } from "react-native-material-dropdown";
import {
	Platform,
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	ScrollView,
	Button,
	Linking
} from "react-native";
import { TextInput } from "react-native-paper";
import firebase from "../../../Firebase";
import ImagePicker from "react-native-image-picker";
import RNFetchBlob from "rn-fetch-blob";
import fs from "react-native-fs";
import styles from "./UserInfoStyle";
const Blob = RNFetchBlob.polyfill.Blob;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;
export default class UserInfo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			country: "",
			region: "",
			txtvalue: "",
			imageurl: "",
			profession: "",
			mobileNo: "",
			BloodGroup: "",
			Gender: "",
			businessStatus: false,
			BusinessName: "",
			BusinessMobileNo: "",
			BusinessCategory: "",
			Type: "",
			city: "",
			states: "",
			addr_line1: "",
			businessAddr_line1: "",
			businessAddr_line2: "",
			UserId: "",
			admins: [],
			isAdmin: "false",
			getToken: "",
			isProfileAdmin: "false",
			postsArr: [],
			lastestPostKey: "",
			commentsArr: []
		};
	}
	componentDidMount() {
		const { navigation } = this.props;
		var { screenProps } = this.props;

		var EventId = navigation.getParam("EventId", "No event found");
		var actualuserId = navigation.getParam("UserId", "No User found");
		console.log("eventId" + EventId);
		console.log("userId" + actualuserId);

		this.setState({ getToken: screenProps.user.number }, () => {
			console.log("from uesrinfo" + this.state.getToken);
			this.getAdminsfromfirebase();
			if (EventId == "No event found") {
				this.setState({ UserId: actualuserId });
				this.getData(actualuserId);
			} else if (actualuserId == "No User found") {
				console.log("hellop1" + EventId);
				firebase
					.database()
					.ref(
						"app/" +
							screenProps.user.CommunityName +
							"/Event details/" +
							EventId
					)
					.on("value", data => {
						var val1 = data.toJSON();
						if (!val1) {
							this.props.navigation.navigate("HomeNavigator");
						} else {
							this.setState({ UserId: val1.UserId });
							this.getData(val1.UserId);
						}
					});
			}
		});
	}

	getAdminsfromfirebase() {
		let arr1 = [];
		var d = new Date();
		var { screenProps } = this.props;
		firebase
			.database()
			.ref("app/" + screenProps.user.CommunityName + "/Admins")
			.on("child_added", data => {
				var result = [];
				var key1 = [];
				key1.push(data.key);
				let arr = data.toJSON();
				for (var i in arr) {
					result.push(arr[i]);
				}
				arr1.push(result[1].toString());
				console.log("Admins are " + JSON.stringify(arr1));
				this.setState({ Admins: arr1 }, () => {
					this.checkAdmin();
				});
				this.setState({ isLoading: false });
			});
	}
	checkAdmin() {
		var { screenProps } = this.props;
		console.log("CHCEK ADMINNNNN" + screenProps.user.number);
		var a = JSON.stringify(this.state.getToken);
		console.log("a" + a);
		for (let i = 0; i < this.state.Admins.length; i++) {
			if (JSON.stringify(this.state.Admins[i]) == a) {
				//console.log("true");
				this.setState({ isAdmin: true });
				return true;
			} else {
				this.setState({ isAdmin: false });
			}
			console.log(
				JSON.stringify(this.state.Admins[i]) +
					" these are for loop admins"
			);
		}
	}

	checkProfileAdmin() {
		var { screenProps } = this.props;
		console.log("checkProfileAdmin123123" + this.state.mobileNo);
		var a = JSON.stringify(this.state.mobileNo);
		console.log("a" + a);
		for (let i = 0; i < this.state.Admins.length; i++) {
			console.log(this.state.Admins[i]);
			console.log("inside" + a);
			if (JSON.stringify(this.state.Admins[i]) == a) {
				this.setState({ isProfileAdmin: true }, () => {
					console.log(
						"user 45445 profile is admin" + a + this.state.Admins[i]
					);
				});
				return true;
			} else {
				this.setState({ isProfileAdmin: false });
				console.log("user profile is not admin");
			}
			console.log(
				JSON.stringify(this.state.Admins[i]) +
					" these are for loop profile admins"
			);
		}
	}

	sendWhatsAppMessage = link => {
		Linking.canOpenURL(link).then(supported => {
			if (!supported) {
				alert(
					"Please install whatsapp to send direct message via whatsapp!"
				);
			} else {
				return Linking.openURL(link);
			}
		});
	};
	shareToWhatsAppWithContact = () => {
		this.sendWhatsAppMessage(
			"whatsapp://send?phone=" + this.state.mobileNo
		);
	};
	businessDetails() {
		this.setState({ businessStatus: true });
	}

	getlastestPostKey() {
		console.log("getlastestPostKey_Started");
		var index1 = 0;
		var { navigation } = this.props;
		var { screenProps } = this.props;
		let commentsArrLocal = [];
		let userLocal = this.state.UserId;
		firebase
			.database()
			.ref("app/" + screenProps.user.CommunityName + "/Event details/")
			.orderByKey()
			.limitToLast(1)
			.on(
				"child_added",
				function(snap) {
					this.setState({ lastestPostKey: snap.key }, () => {
						// console.log(this.state.lastestPostKey);
						firebase
							.database()
							.ref(
								"app/" +
									screenProps.user.CommunityName +
									"/Event details/"
							)
							.orderByKey()
							.on(
								"child_added",
								function(snapshot) {
									if (snapshot.val().Comments != "") {
										commentsArrLocal[index1] = snapshot.key;
										index1++;
										// console.log("insideChildAdded");
									}
									if (
										snapshot.key ===
										this.state.lastestPostKey
									) {
										// console.log("loopEnded");
										this.setState(
											{ commentsArr: commentsArrLocal },
											() => {
												this.deleteComments();
												console.log("console2$");
												this.deletePosts();
												console.log("console3$");
												this.deleteUser();
												console.log("console4$");
											}
										);
									}
								}.bind(this)
							);
					});
				}.bind(this)
			);
		console.log("getlastestPostKey_Ended");
	}

	deleteComments() {
		console.log("deleteComments_Started");
		var { screenProps } = this.props;
		// console.log("console 2");
		for (var i = 0; i < this.state.commentsArr.length; i++) {
			firebase
				.database()
				.ref(
					"app/" +
						screenProps.user.CommunityName +
						"/Event details/" +
						this.state.commentsArr[i] +
						"/Comments/"
				)
				.orderByKey()
				.on(
					"child_added",
					function(snap) {
						if (snap.val().Id === this.state.UserId) {
							// console.log(snap.val().text);
							firebase
								.database()
								.ref(
									"app/" +
										screenProps.user.CommunityName +
										"/Event details/" +
										this.state.commentsArr[i] +
										"/Comments/" +
										snap.key
								)
								.remove();
						}
					}.bind(this)
				);
		}

		console.log("deleteComments_Ended");
	}

	deletePosts() {
		console.log("deletePosts_Started");
		var index1 = 0;
		var { navigation } = this.props;
		var { screenProps } = this.props;
		let postsArrLocal = [];
		let userLocal = this.state.UserId;
		firebase
			.database()
			.ref("app/" + screenProps.user.CommunityName + "/Event details/")
			.orderByKey()
			.limitToLast(1)
			.on(
				"child_added",
				function(snap) {
					this.setState({ lastestPostKey: snap.key }, () => {
						firebase
							.database()
							.ref(
								"app/" +
									screenProps.user.CommunityName +
									"/Event details/"
							)
							.on(
								"child_added",
								function(snapshot) {
									if (snapshot.val().UserId === userLocal) {
										postsArrLocal[index1] = snapshot.key;
										index1++;
									}
									if (
										snapshot.key ===
										this.state.lastestPostKey
									) {
										this.setState(
											{ postsArr: postsArrLocal },
											() => {
												for (
													var i = 0;
													i < postsArrLocal.length;
													i++
												) {
													// console.log(
													// 	postsArrLocal[i]
													// );
													firebase
														.database()
														.ref(
															"app/" +
																screenProps.user
																	.CommunityName +
																"/Event details/" +
																this.state
																	.postsArr[i]
														)
														.remove();
												}
											}
										);
										return;
									}
								}.bind(this)
							);
					});
				}.bind(this)
			);
		console.log("deletePosts_Ended");
	}

	deleteUser() {
		console.log("deleteUser_Started");
		var { screenProps } = this.props;
		let mobilelocal = this.state.mobileNo;
		let nameLocal = this.state.Name;
		firebase
			.database()
			.ref("app/" + screenProps.user.CommunityName + "/User/")
			.orderByKey()
			.equalTo(this.state.UserId)
			.on(
				"child_added",
				function(snapshot) {
					// console.log(snapshot.key);
					firebase
						.database()
						.ref(
							"app/" +
								screenProps.user.CommunityName +
								"/User/" +
								this.state.UserId
						)
						.remove();
					firebase
						.database()
						.ref(
							"app/" +
								screenProps.user.CommunityName +
								"/Blocked_Users"
						)
						.push({
							Blocked_Number: mobilelocal,
							Name: nameLocal
						});
				}.bind(this)
			);
		console.log("deleteUser_Ended");
		this.props.navigation.navigate("HomeNavigator");
	}

	masterDeleter() {
		console.log("console1$");
		this.getlastestPostKey();
	}

	goback() {
		var { navigation } = this.props;
		var screen = navigation.getParam("screen", "");
		if (screen === "BroadcastedPost") {
			//alert("back")
			const { navigate } = this.props.navigation;
			navigate("BroadcastedPost");
		} else if (screen == "Search") {
			const { navigate } = this.props.navigation;
			navigate("Search");
		} else if (screen == "BloodBank") {
			const { navigate } = this.props.navigation;
			navigate("BloodBankUsers");
		} else if (!(screen == "")) {
			const { navigate } = this.props.navigation;
			navigate("CityUsers");
		} else {
			const { navigate } = this.props.navigation;
			navigate("Home");
		}
	}
	handlenavigation() {
		const { navigate } = this.props.navigation;
		navigate("Profile", {
			returnData: this.returnData.bind(this),
			returnData1: this.returnData1.bind(this)
		});
	}
	goback1() {
		// const { navigate } = this.props.navigation;
		// navigate("Info");
		this.setState({ businessStatus: false });
	}

	getData(userId) {
		var { screenProps } = this.props;
		console.log("hellloopxxxx" + userId);
		firebase
			.database()
			.ref("app/" + screenProps.user.CommunityName + "/User/" + userId)
			.once("value", data => {
				var value = data.toJSON();
				console.log("----" + value.Profession);
				console.log("heheheh----" + JSON.stringify(value));
				this.setState({ Name: value.Name });
				this.setState({ txtvalue: value.Email });
				this.setState({ imageurl: value.Profile_photo });
				this.setState({ profession: value.Profession });
				this.setState({ mobileNo: value.Contact_Number }, () => {
					this.checkProfileAdmin();
				});
				console.log("----" + value.Profession);
				console.log("-----gegeggeg" + this.state.Gender);
				this.setState({ Gender: value.Gender });
				this.setState({ BloodGroup: value.Blood_Group });
				this.setState({ country: value.Country });
				this.setState({ states: value.State });
				this.setState({ city: value.City });
				this.setState({ addr_line1: value.Address_line1 });
			});
		firebase
			.database()
			.ref(
				"app/" +
					screenProps.user.CommunityName +
					"/User/" +
					userId +
					"/Business_details"
			)
			.once("value", data => {
				var bval = data.toJSON();
				this.setState({ BusinessCategory: bval.Category });
				this.setState({ BusinessName: bval.Name });
				this.setState({ BusinessMobileNo: bval.Contact_Number });
				this.setState({ Type: bval.Type });
				this.setState({ businessAddr_line1: bval.Address_line1 });
				this.setState({ businessAddr_line2: bval.Address_line2 });
			});
	}

	render() {
		if (this.state.businessStatus) {
			console.log("Businessstatus" + this.state.businessStatus);
			return (
				<View>
					<View style={styles.header}>
						<View>
							<TouchableOpacity
								title=""
								onPress={this.goback1.bind(this)}
							>
								<Icon
									name="arrow-back"
									color="white"
									size={30}
								/>
							</TouchableOpacity>
						</View>
						<Text style={styles.home}>Business Details</Text>
						<View
							style={{
								flexDirection: "row",
								justifyContent: "space-between"
							}}
						/>
					</View>
					<ScrollView style={{ padding: 10 }}>
						<View>
							<View>
								<TextInput
									label="Business Name"
									editable={false}
									disabled={true}
									placeholder="Business Name"
									placeholderTextColor="#676261"
									onChangeText={BusinessName =>
										this.setState({ BusinessName })
									}
									value={this.state.BusinessName}
									style={{ backgroundColor: "transparent" }}
								/>
							</View>
							<View>
								<TextInput
									label="Business mobile number"
									editable={false}
									disabled={true}
									ref="mobileNo"
									keyboardType="phone-pad"
									style={{
										backgroundColor: "transparent",
										width: "100%"
									}}
									placeholder="Business mobile number"
									onChangeText={BusinessMobileNo =>
										this.setState({ BusinessMobileNo })
									}
									//value={this.state.BusinessMobileNo.toString()}
								/>
							</View>

							<View>
								<TextInput
									label="Business type"
									editable={false}
									disabled={true}
									placeholder="Business type "
									onChangeText={Type =>
										this.setState({ Type })
									}
									value={this.state.Type}
									style={{ backgroundColor: "transparent" }}
								/>
							</View>
							<View style={{ padding: 10, paddingBottom: 10 }}>
								<Dropdown
									disabled={true}
									label="Business Category"
									labelColor="#676261"
									onChangeText={BusinessCategory =>
										this.setState({ BusinessCategory })
									}
									value={this.state.BusinessCategory}
								/>
							</View>
							<View style={{ padding: 5 }}>
								<TextInput
									label="Business address line 1"
									editable={false}
									disabled={true}
									placeholder="Business Address"
									onChangeText={businessAddr_line1 =>
										this.setState({ businessAddr_line1 })
									}
									value={this.state.businessAddr_line1}
									style={{ backgroundColor: "transparent" }}
								/>
							</View>
							<View style={{ padding: 5 }}>
								<TextInput
									label="Business address line 2"
									editable={false}
									disabled={true}
									placeholder="Business Address"
									onChangeText={businessAddr_line2 =>
										this.setState({ businessAddr_line2 })
									}
									value={this.state.businessAddr_line2}
									style={{ backgroundColor: "transparent" }}
								/>
							</View>
						</View>
					</ScrollView>
				</View>
			);
		}

		return (
			<View>
				<View style={styles.header}>
					<View>
						<TouchableOpacity
							title=""
							onPress={() => {
								this.props.navigation.goBack(null);
							}}
						>
							<Icon name="arrow-back" color="white" size={30} />
						</TouchableOpacity>
					</View>
					<Text style={styles.home}>Info</Text>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-between"
						}}
					>
						<TouchableOpacity
							title=""
							onPress={this.shareToWhatsAppWithContact.bind(this)}
							style={{
								backgroundColor: "#25d366",
								// padding: 3,
								paddingHorizontal: 6,
								borderRadius: 30
							}}
						>
							<Icon
								name="whatsapp"
								color="white"
								type="font-awesome"
								size={25}
							/>
						</TouchableOpacity>
					</View>
				</View>

				<ScrollView style={{ padding: 10 }}>
					<View>
						<View style={{ alignSelf: "center", paddingTop: 20 }}>
							<View style={{ justifyContent: "center" }}>
								<Image
									//resizeMode="contain"
									borderRadius={50}
									style={styles.ImageContainer1}
									source={{
										uri: this.state.imageurl
									}}
									indicator={Progress.Circle}
								/>
							</View>
						</View>
						<View
							style={{
								paddingTop: 10,
								flexDirection: "row",
								alignItems: "stretch"
							}}
						>
							<View style={{ flex: 1 }}>
								<Button
									color="#C60C31"
									title="Info"
									onPress={() =>
										this.props.navigation.navigate(
											"UserInfo"
										)
									}
								/>
							</View>
							<View style={{ flex: 1 }}>
								<Button
									color="#f2264f"
									title="Posts"
									onPress={() =>
										this.props.navigation.navigate(
											"UserPosts",
											{
												UserId: this.state.UserId,
												imageurl: this.state.imageurl
											}
										)
									}
								/>
							</View>
						</View>
						<View>
							<View>
								<TextInput
									label="Name"
									disabled={true}
									editable={false}
									placeholder="Name"
									placeholderTextColor="#676261"
									onChangeText={Name =>
										this.setState({ Name })
									}
									value={this.state.Name}
									style={{ backgroundColor: "transparent" }}
								/>
							</View>
							<View>
								<TextInput
									label="Email ID"
									editable={false}
									disabled={true}
									placeholder="Email ID"
									onChangeText={txtvalue =>
										this.setState({ txtvalue })
									}
									value={this.state.txtvalue}
									style={{ backgroundColor: "transparent" }}
								/>
							</View>
							<View>
								<TextInput
									label="Profession"
									editable={false}
									disabled={true}
									placeholder="Profession"
									placeholderTextColor="#676261"
									onChangeText={profession =>
										this.setState({ profession })
									}
									value={this.state.profession}
									style={{ backgroundColor: "transparent" }}
								/>
							</View>
							<View>
								<TextInput
									label="Mobile number"
									editable={false}
									disabled={true}
									ref="mobileNo"
									keyboardType="numeric"
									style={{
										backgroundColor: "transparent",
										width: "100%"
									}}
									placeholder="Mobile number"
									onChangeText={mobileNo =>
										this.setState({ mobileNo })
									}
									value={this.state.mobileNo}
								/>
							</View>
							<View style={{ padding: 10 }}>
								<Dropdown
									disabled={true}
									label="Gender"
									labelColor="#676261"
									onChangeText={Gender =>
										this.setState({ Gender })
									}
									value={this.state.Gender}
								/>
							</View>
							<View style={{ padding: 10 }}>
								<Dropdown
									disabled={true}
									label="Bloodgroup"
									labelColor="#676261"
									onChangeText={Blood_Group =>
										this.setState({ Blood_Group })
									}
									value={this.state.BloodGroup}
								/>
							</View>
							<View>
								<TextInput
									label="address line 1"
									editable={false}
									disabled={true}
									style={{
										backgroundColor: "transparent",
										width: "100%"
									}}
									placeholder="Address line 1"
									onChangeText={addr_line1 =>
										this.setState({ addr_line1 })
									}
									value={this.state.addr_line1}
								/>
							</View>
							<View style={{ padding: 10 }}>
								<Dropdown
									disabled={true}
									label="country"
									labelColor="#676261"
									value={this.state.country}
								/>
							</View>
							<View style={{ padding: 10 }}>
								<Dropdown
									disabled={true}
									label="state"
									labelColor="#676261"
									value={this.state.states}
								/>
							</View>
							<View style={{ padding: 10, paddingBottom: 90 }}>
								<Dropdown
									disabled={true}
									label="city"
									labelColor="#676261"
									value={this.state.city}
								/>
							</View>
							{/* {renderIf(this.state.isAdmin)(
								<View
									style={{ padding: 10, paddingBottom: 100 }}
								>
									<Button
										onPress={this.businessDetails.bind(
											this
										)}
										title="Business Details"
										color="#C60C31"
									/>
								</View>
							)} */}
							{/* {renderIf(
								this.state.isAdmin && this.state.isProfileAdmin
							)(
								<View>
									<View style={{ padding: 10 }}>
										<Button
											onPress={this.businessDetails.bind(
												this
											)}
											title="Business Details"
											color="#C60C31"
										/>
									</View>
									<View
										style={{
											padding: 10,
											paddingBottom: 100
										}}
									>
										<Button
											onPress={this.deleteComments.bind(
												this
											)}
											title="Delete User"
											color="#C60C31"
										/>
									</View>
								</View>
							)} */}
							{/* {renderIf(
								this.state.isAdmin && !this.state.isProfileAdmin
							)( */}
							<View>
								<View style={{ padding: 10 }}>
									<Button
										onPress={this.businessDetails.bind(
											this
										)}
										title="Business Details"
										color="#C60C31"
									/>
								</View>
								<View
									style={{
										padding: 10,
										paddingBottom: 100
									}}
								>
									<Button
										onPress={this.masterDeleter.bind(this)}
										title="Delete User"
										color="#C60C31"
									/>
								</View>
							</View>
							{/* )} */}
						</View>
					</View>
				</ScrollView>
			</View>
		);
	}
}
