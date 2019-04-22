import React, { Component } from "react";
import { Icon } from "react-native-elements";
import {
	Animated,
	Platform,
	ToastAndroid,
	PermissionsAndroid,
	AsyncStorage,
	BackHandler,
	Text,
	Image,
	TouchableOpacity,
	View,
	Dimensions,
	Keyboard,
	StyleSheet,
	TextInput,
	UIManager
} from "react-native";

import keys from "../../../keys";
import firebase from "../../../Firebase";

const wid = Dimensions.get("window");

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			phone: null,
			token: null,
			requestId: null,
			brand: "Your Verification",
			from: "OTP ME TEST",
			to: null,
			isToken: false,
			isLogin: true
		};
		this.loginProcess = this.loginProcess.bind(this);
		this.verifyToken = this.verifyToken.bind(this);
		this.searchPhoneNumber = this.searchPhoneNumber.bind(this);
	}

	handleBackPress = () => {
		console.log("removed");
		BackHandler.exitApp(); // works best when the goBack is async
		return true;
	};
	handleBackButton() {
		this.setState({ isLogin: true });
		this.setState({ isToken: false });
		return true;
	}
	// componentWillUnmount() {
	//   BackHandler.removeEventListener("hardwareBackPress");
	// }

	componentDidMount() {
		const { navigation } = this.props;
		// this.getDataFromFirebase();
		var communityName = navigation.getParam("CommunityName", "No text");
		var { screenProps } = this.props;
		screenProps.user.CommunityName = communityName;
		console.log("community is---" + screenProps.user.CommunityName);
	}

	componentWillMount() {
		BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);

		try {
			const granted = PermissionsAndroid.request(
				PermissionsAndroid.PERMISSIONS.RECEIVE_SMS,
				{
					title: "Izinkan Aplikasi Mengirim Pesan",
					message: "Izinkan Aplikasi Mengirim Pesan"
				}
			);
			if (granted === PermissionsAndroid.RESULTS.GRANTED) {
				console.warn("You can use the message");
			} else {
				console.warn("Message permission denied");
			}
		} catch (err) {
			console.warn(err);
		}
	}
	setValueLocally = () => {
		AsyncStorage.setItem("token", "91" + this.state.phone);
		//alert("Value Stored Successfully.")
	};

	mobilevalidate(text) {
		const reg = /^[0]?[123456789]\d{11}$/;
		if (reg.test(text) === false) {
			return false;
		} else {
			return true;
		}
	}

	searchPhoneNumber() {
		var mobnumber = "91" + this.state.phone;
		var { screenProps } = this.props;
		console.log("-----" + mobnumber);
		if (!this.mobilevalidate(mobnumber)) {
			alert("invalid number");
		} else {
			console.log("eeee" + this.state.phone.length);
			//var mobnumber="91"+this.state.phone;
			var ref = firebase
				.database()
				.ref("app/" + screenProps.user.CommunityName + "/User");
			ref.orderByChild("Contact_Number")
				.equalTo(mobnumber)
				.once("value", snapshot => {
					if (snapshot.exists()) {
						console.log("111111---" + this.state.phone);
						this.loginProcess();
						console.log("exists!");
					} else {
						var ref2 = firebase
							.database()
							.ref(
								"app/" +
									screenProps.user.CommunityName +
									"/Joining_Requests"
							);
						ref2.orderByChild("Contact_Number")
							.equalTo(mobnumber)
							.once("value", snapshot2 => {
								if (snapshot2.exists()) {
									console.log("exists in requests database.");
									alert(
										"Your Request is pending. Please wait for Admin to approve your request. Thank you!!"
									);
								} else {
									this.setState({ phone: mobnumber }, () => {
										console.log(
											"mobnum-----" +
												mobnumber +
												"----" +
												this.state.phone
										);
										this.props.navigation.navigate(
											"Request",
											{
												phone1: this.state.phone
											}
										);
									}),
										console.log("doesn't exists!!");
								}
							});
					}
				});
		}
	}

	hasNumber(num) {
		var regex = /\d/g;
		console.log("ddddddd" + regex.test(num));
		return regex.test(num);
	}

	verifyToken() {
		BackHandler.removeEventListener(
			"hardwareBackPress",
			this.handleBackPress
		);

		if (!(this.state.token.length == 4)) {
			alert("4 digit otp only");
		} else {
			this.setValueLocally();
			var myHeaders = new Headers();
			myHeaders.append("Content-Type", "application/json");
			body = {
				api_key: keys.REACT_APP_OTP_API_KEY,
				api_secret: keys.REACT_APP_OTP_SECRET_KEY,
				request_id: this.state.requestId,
				code: this.state.token
			};
			fetch("https://api.nexmo.com/verify/check/json", {
				method: "POST",
				headers: myHeaders,
				mode: "cors",
				cache: "default",
				body: JSON.stringify(body)
			})
				.then(response => response.json())
				.then(responseJson => {
					if (responseJson.status == 0) {
						this.props.navigation.navigate("HomeNavigator", {
							LoggedInNumber: this.state.phone
						});
						this.setState({ isToken: false });
						this.setState({ isLogin: true });
					} else {
						ToastAndroid.show(
							responseJson.error_text,
							ToastAndroid.SHORT
						);
					}
				})
				.catch(error => {
					ToastAndroid.show("Gagal", ToastAndroid.SHORT);
				});
		}
	}

	if(booleanValue) {
		return "something";
	}

	loginProcess() {
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");
		body = {
			api_key: keys.REACT_APP_OTP_API_KEY,
			api_secret: keys.REACT_APP_OTP_SECRET_KEY,
			number: "91" + this.state.phone,
			brand: this.state.brand
		};
		fetch("https://api.nexmo.com/verify/json", {
			method: "POST",
			headers: myHeaders,
			mode: "cors",
			cache: "default",
			body: JSON.stringify(body)
		})
			.then(response => response.json())
			.then(responseJson => {
				if (responseJson.status == 0) {
					this.setState({
						requestId: responseJson.request_id,
						isToken: true,
						isLogin: false
					});
					this.props.navigation.navigate("Verify", {
						LoggedInNumber: this.state.phone,
						request_id: responseJson.request_id
					});
				} else {
					ToastAndroid.show(
						responseJson.error_text,
						ToastAndroid.SHORT
					);
				}
			})
			.catch(error => {
				ToastAndroid.show("Login Gagal", ToastAndroid.SHORT);
			});
	}

	render() {
		return (
			<View
				style={{
					flex: 1,
					backgroundColor: "#E3E7E6"
				}}
			>
				<View style={styles.header}>
					<Text style={styles.home}>Parkar Samaaj</Text>
					<View>
						<TouchableOpacity
							title="NEXT"
							onPress={this.searchPhoneNumber.bind(this)}
						>
							<View style={{ flexDirection: "row" }}>
								<View>
									<Text style={styles.next}>NEXT</Text>
								</View>
							</View>
						</TouchableOpacity>
					</View>
				</View>

				<View style={styles.boxOne}>
					<Image
						source={require("../../assets/App_logo.png")}
						style={styles.logoStyle}
					/>
				</View>

				<View style={styles.boxTwo}>
					<View
						style={{
							alignItems: "center",
							backgroundColor: "white",
							height: 50,
							flexDirection: "row"
						}}
					>
						<Icon
							name="cellphone"
							type="material-community"
							size={35}
							underlayColor="#FFFFFF"
							style={{
								alignSelf: "center",
								justifyContent: "center"
							}}
						/>
						<Text
							style={{
								justifyContent: "center",
								fontSize: 18,
								alignSelf: "center"
							}}
						>
							+91
						</Text>
					</View>
					<TextInput
						style={styles.mobileInput}
						placeholder="Enter 10 digit phone number :"
						onChangeText={phone => this.setState({ phone })}
						dataDetectorTypes="phoneNumber"
						keyboardType="numeric"
					/>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#E3E7E6",
		flex: 1,
		height: "100%",
		justifyContent: "space-around",
		left: 0,
		position: "absolute",
		top: 0,
		width: "100%"
	},
	screen: {
		flex: 1
		// display: 'none'
	},
	next: {
		color: "white",
		paddingRight: 10,
		padding: 4,
		paddingLeft: 15,
		fontSize: 18,
		borderLeftWidth: 2,
		borderLeftColor: "white"
	},
	home: {
		fontFamily: "lucida grande",
		justifyContent: "center",
		fontWeight: "bold",
		fontSize: 22,
		color: "white"
	},
	header: {
		flex: 1,
		backgroundColor: "#C60C31",
		alignItems: "center",
		padding: 10,
		flexDirection: "row",
		justifyContent: "space-between"
	},
	boxOne: {
		justifyContent: "center",
		// padding: 10,
		flex: 8
	},
	boxTwo: {
		flex: 8,
		position: "relative",
		flexDirection: "row",
		justifyContent: "flex-start",
		paddingLeft: 10,
		paddingRight: 10
		// width: wid.width * 0.95
	},
	logoStyle: {
		height: 150,
		width: 150,
		alignSelf: "center"
	},
	textInput: {
		backgroundColor: "white",
		height: 40
	},
	mobileInput: {
		flex: 1,
		paddingLeft: 10,
		fontSize: 16,
		height: 50,
		width: wid.width * 0.95,
		backgroundColor: "#FFFFFF"
	}
});

// import React, { Component } from "react";
// import {
//   Platform,
//   StyleSheet,
//   Text,
//   View,
//   TextInput,
//   TouchableOpacity,
//   ToastAndroid,
//   PermissionsAndroid,
//   Image,
//   Dimensions,
//   AsyncStorage,
//   BackHandler
// } from "react-native";
// import { Icon } from "react-native-elements";
// import keys from "../../../keys";
// import firebase from "../../../Firebase";
// import styles from "./LoginStyle";
// const wid = Dimensions.get("window");

// export default class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       phone: null,
//       token: null,
//       requestId: null,
//       brand: "Your Verification",
//       from: "OTP ME TEST",
//       to: null,
//       isToken: false,
//       isLogin: true
//     };
//     this.loginProcess = this.loginProcess.bind(this);
//     this.verifyToken = this.verifyToken.bind(this);
//     this.searchPhoneNumber = this.searchPhoneNumber.bind(this);
//   }

//   handleBackPress = () => {
//     console.log("removed");
//     BackHandler.exitApp(); // works best when the goBack is async
//     return true;
//   };
//   handleBackButton() {
//     this.setState({ isLogin: true });
//     this.setState({ isToken: false });
//     return true;
//   }
//   // componentWillUnmount() {
//   //   BackHandler.removeEventListener("hardwareBackPress");
//   // }
//   componentWillMount() {
//     BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);

//     try {
//       const granted = PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.RECEIVE_SMS,
//         {
//           title: "Izinkan Aplikasi Mengirim Pesan",
//           message: "Izinkan Aplikasi Mengirim Pesan"
//         }
//       );
//       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//         console.warn("You can use the message");
//       } else {
//         console.warn("Message permission denied");
//       }
//     } catch (err) {
//       console.warn(err);
//     }
//   }
//   setValueLocally = () => {
//     AsyncStorage.setItem("token", this.state.phone);
//     //alert("Value Stored Successfully.")
//   };

//   mobilevalidate(text) {
//     const reg = /^[0]?[123456789]\d{11}$/;
//     if (reg.test(text) === false) {
//       return false;
//     } else {
//       return true;
//     }
//   }

//   searchPhoneNumber() {
//     if (!this.mobilevalidate(this.state.phone)) {
//       alert("invalid number");
//     } else {
//       console.log("eeee" + this.state.phone.length);
//       var ref = firebase.database().ref("app/User");
//       ref
//         .orderByChild("Contact_Number")
//         .equalTo(this.state.phone)
//         .once("value", snapshot => {
//           if (snapshot.exists()) {
//             this.loginProcess();
//             console.log("exists!");
//           } else {
//             var ref2 = firebase.database().ref("app/Joining_Requests");
//             ref2
//               .orderByChild("Contact_Number")
//               .equalTo(this.state.phone)
//               .once("value", snapshot2 => {
//                 if (snapshot2.exists()) {
//                   console.log("exists in requests database.");
//                   alert(
//                     "Your Request is pending. Please wait for Admin to approve your request. Thank you!!"
//                   );
//                 } else {
//                   this.props.navigation.navigate("Request", {
//                     phone1: this.state.phone
//                   });
//                   console.log("doesn't exists!!");
//                 }
//               });
//           }
//         });
//     }
//   }

//   hasNumber(num) {
//     var regex = /\d/g;
//     console.log("ddddddd" + regex.test(num));
//     return regex.test(num);
//   }
//   verifyToken() {
//     BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);

//     if (!(this.state.token.length == 4)) {
//       alert("4 digit otp only");
//     } else {
//       this.setValueLocally();
//       var myHeaders = new Headers();
//       myHeaders.append("Content-Type", "application/json");
//       body = {
//         api_key: keys.REACT_APP_OTP_API_KEY,
//         api_secret: keys.REACT_APP_OTP_SECRET_KEY,
//         request_id: this.state.requestId,
//         code: this.state.token
//       };
//       fetch("https://api.nexmo.com/verify/check/json", {
//         method: "POST",
//         headers: myHeaders,
//         mode: "cors",
//         cache: "default",
//         body: JSON.stringify(body)
//       })
//         .then(response => response.json())
//         .then(responseJson => {
//           if (responseJson.status == 0) {
//             this.props.navigation.navigate("HomeNavigator", {
//               LoggedInNumber: this.state.phone
//             });
//             this.setState({ isToken: false });

//             this.setState({ isLogin: true });
//           } else {
//             ToastAndroid.show(responseJson.error_text, ToastAndroid.SHORT);
//           }
//         })
//         .catch(error => {
//           ToastAndroid.show("Gagal", ToastAndroid.SHORT);
//         });
//     }
//   }
//   if(booleanValue) {
//     return "something";
//   }
//   loginProcess() {
//     var myHeaders = new Headers();
//     myHeaders.append("Content-Type", "application/json");
//     body = {
//       api_key: keys.REACT_APP_OTP_API_KEY,
//       api_secret: keys.REACT_APP_OTP_SECRET_KEY,
//       number: this.state.phone,
//       brand: this.state.brand
//     };
//     fetch("https://api.nexmo.com/verify/json", {
//       method: "POST",
//       headers: myHeaders,
//       mode: "cors",
//       cache: "default",
//       body: JSON.stringify(body)
//     })
//       .then(response => response.json())
//       .then(responseJson => {
//         if (responseJson.status == 0) {
//           this.setState({
//             requestId: responseJson.request_id,
//             isToken: true,
//             isLogin: false
//           });
//         } else {
//           ToastAndroid.show(responseJson.error_text, ToastAndroid.SHORT);
//         }
//       })
//       .catch(error => {
//         ToastAndroid.show("Login Gagal", ToastAndroid.SHORT);
//       });
//   }
//   render() {
//     return (
//       <View style={{ backgroundColor: "#E3E7E6", flex: 1 }}>
//         <View style={[!this.state.isLogin && { display: "none" }]}>
//           <View style={styles.header}>
//             <Text style={styles.home}>Parkar Samaaj</Text>
//             <View>
//               <TouchableOpacity
//                 title="NEXT"
//                 onPress={this.searchPhoneNumber.bind(this)}
//               >
//                 <View style={{ flexDirection: "row" }}>
//                   <View>
//                     <Text style={styles.next}>NEXT</Text>
//                   </View>
//                 </View>
//               </TouchableOpacity>
//             </View>
//           </View>
//           <View style={styles.boxOne}>
//             <Image
//               source={require("../../assets/App_logo.png")}
//               style={styles.logoStyle}
//             />
//           </View>
//           <View style={{ justifyContent: "center", alignItems: "center" }}>
//             <View style={styles.boxTwo}>
//               <View style={{ justifyContent: "center" }}>
//                 <Icon
//                   name="cellphone"
//                   type="material-community"
//                   size={35}
//                   underlayColor="#FFFFFF"
//                   style={{ alignSelf: "center", justifyContent: "ceter" }}
//                 />
//               </View>
//               <TextInput
//                 style={styles.mobileInput}
//                 placeholder="Enter phone number with 91 as prefix :"
//                 onChangeText={phone => this.setState({ phone })}
//                 dataDetectorTypes="phoneNumber"
//                 keyboardType="numeric"
//               />
//             </View>
//           </View>
//         </View>
//         <View style={[!this.state.isToken && { display: "none" }]}>
//           <View style={styles.header}>
//             <Text style={styles.home}>Verify OTP</Text>
//             <View>
//               <TouchableOpacity
//                 title="NEXT"
//                 onPress={this.verifyToken.bind(this)}
//               >
//                 <View style={{ flexDirection: "row" }}>
//                   <View>
//                     <Text style={styles.verifyButton}>VERIFY</Text>
//                   </View>
//                 </View>
//               </TouchableOpacity>
//             </View>
//           </View>
//           <View style={styles.boxOne}>
//             <Image
//               source={require("../../assets/App_logo.png")}
//               style={styles.logoStyle}
//             />
//           </View>
//           <View style={{ justifyContent: "center", alignItems: "center" }}>
//             <View style={styles.boxTwo}>
//               <View style={{ justifyContent: "center" }}>
//                 <Icon
//                   name="cellphone"
//                   type="material-community"
//                   size={35}
//                   underlayColor="#FFFFFF"
//                   style={{ alignSelf: "center", justifyContent: "ceter" }}
//                 />
//               </View>
//               <TextInput
//                 style={styles.mobileInput}
//                 placeholder="Enter OTP"
//                 onChangeText={token => this.setState({ token })}
//                 dataDetectorTypes="phoneNumber"
//                 keyboardType="numeric"
//               />
//             </View>
//           </View>
//         </View>
//       </View>
//     );
//   }
// }
