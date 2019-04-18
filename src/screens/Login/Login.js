import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  PermissionsAndroid,
  Image,
  Dimensions,
  AsyncStorage,
  BackHandler,
  ScrollView
} from "react-native";
import { Icon } from "react-native-elements";
import keys from "../../../keys";
import firebase from "../../../Firebase";
import styles from "./LoginStyle";
// import { ScrollView } from "react-native-gesture-handler";
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

  // handleBackPress = () => {
  //   console.log("removed");
  //   BackHandler.exitApp(); // works best when the goBack is async
  //   return true;
  // };
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
    // BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);

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
    AsyncStorage.setItem("token", "91"+this.state.phone);
    //alert("Value Stored Successfully.")
  };

  mobilevalidate(text) {
    const reg = /^[0]?[123456789]\d{11}$/;
    if (reg.test(text) === false) {
      console.log("false----")
      return false;
    } else {
      console.log("true-----")
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
      ref
        .orderByChild("Contact_Number")
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
                "app/" + screenProps.user.CommunityName + "/Joining_Requests"
              );
            ref2
              .orderByChild("Contact_Number")
              .equalTo(mobnumber)
              .once("value", snapshot2 => {
                if (snapshot2.exists()) {
                  console.log("exists in requests database.");
                  alert(
                    "Your Request is pending. Please wait for Admin to approve your request. Thank you!!"
                  );
                } else {
                  this.setState({ phone: mobnumber }, () => {
                    console.log("mobnum-----"+mobnumber +"----"+this.state.phone)
                    this.props.navigation.navigate("Request", {
                      phone1: this.state.phone
                    });
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
    // BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);

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
              LoggedInNumber: "91"+this.state.phone
            
            });
            this.setState({ isToken: false });

            this.setState({ isLogin: true });
          } else {
            ToastAndroid.show(responseJson.error_text, ToastAndroid.SHORT);
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
    this.setState({ isToken: true, isLogin: false });
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    body = {
      api_key: keys.REACT_APP_OTP_API_KEY,
      api_secret: keys.REACT_APP_OTP_SECRET_KEY,
      number:"91"+this.state.phone,
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
          this.setState(
            {
              requestId: responseJson.request_id,
              isToken: true,
              isLogin: false
            },
            console.log("is otp send")
          );
        } else {
          ToastAndroid.show(responseJson.error_text, ToastAndroid.SHORT);
        }
      })
      .catch(error => {
        ToastAndroid.show("Login Gagal", ToastAndroid.SHORT);
      });
  }
  render() {
    return (
      <View style={{ backgroundColor: "#E3E7E6", flex: 1 }}>
        <View style={[!this.state.isLogin && { display: "none" }]}>
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
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <View style={styles.boxTwo}>
              <View style={{ justifyContent: "center", flexDirection: "row" }}>
                <Icon
                  name="cellphone"
                  type="material-community"
                  size={35}
                  underlayColor="#FFFFFF"
                  style={{ alignSelf: "center", justifyContent: "ceter" }}
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
                placeholder="Enter 10 digit mobile number:"
                onChangeText={phone => this.setState({ phone })}
                dataDetectorTypes="phoneNumber"
                keyboardType="numeric"
              />
            </View>
          </View>
        </View>
        <View style={[!this.state.isToken && { display: "none" }]}>
          <View style={styles.header}>
            <Text style={styles.home}>Verify OTP</Text>
            <View>
              <TouchableOpacity
                title="NEXT"
                onPress={this.verifyToken.bind(this)}
              >
                <View style={{ flexDirection: "row" }}>
                  <View>
                    <Text style={styles.verifyButton}>VERIFY</Text>
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
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <View style={styles.boxTwo}>
              <View style={{ justifyContent: "center" }}>
                <Icon
                  name="cellphone"
                  type="material-community"
                  size={35}
                  underlayColor="#FFFFFF"
                  style={{ alignSelf: "center", justifyContent: "ceter" }}
                />
              </View>
              <TextInput
                style={styles.mobileInput}
                placeholder="Enter OTP"
                onChangeText={token => this.setState({ token })}
                dataDetectorTypes="phoneNumber"
                keyboardType="numeric"
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
}

// import React, { Component } from "react";
// import {
//   View,
//   WebView,
//   StyleSheet,
//   Image,
//   KeyboardAvoidingView,
//   AsyncStorage
// } from "react-native";
// import Spinner from "react-native-loading-spinner-overlay";

// var WEBVIEW_REF = "webview";

// export default class Login extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       islogo: true,
//       isSpinner: false,
//       loading: true,
//       mynumber:"",
//     };

//     this.getLoginContent = this.getLoginContent.bind(this);
//     this.onWebViewMessage = this.onWebViewMessage.bind(this);
//   }

//   getLoginContent() {
//     var finalForm = htmlContent;
//     return finalForm;
//   }
//   setValueLocally = number => {
//     AsyncStorage.setItem("token", number);
//     console.log("saved" +number)
//     //alert("Value Stored Successfully.")
//   };
//   onWebViewMessage(event) {
//     reponseReceived = JSON.parse(event.nativeEvent.data);
//     var number = "";
//     if (reponseReceived.length == 12) {
//       number = reponseReceived;
//       this.setState({mynumber:number})

//      // console.log("number is"+number)
//     }
//     console.log(reponseReceived+"-------")
//     if (reponseReceived == "signInClicked") {
//       this.setState({ islogo: false });
//     } else if (reponseReceived == "spinner") {
//       this.setState({ islogo: true });
//       this.setState({ isSpinner: true });
//     } else if (reponseReceived == "signIn") {
//       this.setState({ isSpinner: false });
//       this.setState({ islogo: true });
//       this.setValueLocally(this.state.mynumber);
//       this.props.navigation.navigate("HomeNavigator");
//     } else if (reponseReceived == "sendToLogin") {
//       alert("Your Request is pending. Thank you!!");
//       this.setState({ islogo: true });
//       this.setState({ isSpinner: false });
//       this.props.navigation.navigate("Login");
//     } else if (reponseReceived == "innerError") {
//       alert("Error during Sign In. Try again!!");
//       this.setState({ islogo: true });
//       this.setState({ isSpinner: false });
//       this.props.navigation.navigate("Login");
//     } else if (reponseReceived == "outerError") {
//       alert("eeeeeeeeeError during Sign In. Try again!!");
//       this.setState({ islogo: true });
//       this.setState({ isSpinner: false });
//       this.props.navigation.navigate("Login");
//     } else if (reponseReceived=="sendToRequest") {
//       alert("Number not found in Database. Please, send a request to Admin.");
//       this.setState({ isSpinner: false });
//       this.setState({ islogo: true });
//       this.props.navigation.navigate("Request", { phone1:number });
//     } else {
//      // alert("Wrong info given!!");
//       this.setState({ islogo: true });
//       this.setState({ isSpinner: false });
//       //this.props.navigation.navigate("Login");
//     }
//   }

//   render() {
//     return (
//       <View style={{ flex: 1 }}>
//         <View style={{ flex: 1 }}>
//           <View style={[this.state.islogo && { flex: 1 }]}>
//             <Image
//               style={{
//                 flex: 4,
//                 width: 160,
//                 height: 10,
//                 alignSelf: "center",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 alignContent: "center"
//               }}
//               resizeMode="center"
//               source={require("../../assets/App_logo.png")}
//               onLoadEnd={() => {
//                 setTimeout(() => {
//                   this.setState({ loading: false });
//                 }, 2000);
//               }}
//             />
//           </View>

//           <WebView
//             allowFileAccess={true}
//             style={{ flex: 1 }}
//             renderLoading={this.renderLoading}
//             startInLoadingState
//             ref={WEBVIEW_REF}
//             onMessage={this.onWebViewMessage}
//             mixedContentMode={"always"}
//             source={{
//               html: this.getLoginContent(),
//               baseUrl: "http://localhost:8000"
//             }}
//           />

//           <Spinner
//             visible={this.state.isSpinner || this.state.loading}
//             textContent={"Loading..."}
//             textStyle={styles.spinnerTextStyle}
//           />
//         </View>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   spinnerTextStyle: {
//     color: "#FFF"
//   }
// });

// const htmlContent = `<!DOCTYPE html>
// <html>
//   <head>
//   <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
//   <style>
//     html, body {
//       font-family: "Roboto", "Helvetica", sans-serif;
//       background-color: #FFFFFF;
//     }
//     .grecaptcha-badge {
//       display: none;
//     }
//     .input-field {
//       padding-top: 10px;
//       padding-bottom: 10px;
//       padding-left: 5px;
//       width:63%;
//       position: absolute;
//       top: 10%;
//       left: 14%;
//     }
//     .material-icons{
//       width:10%;
//       position: absolute;
//       color: white;
//       background: #C60C30;
//       padding: 4px;
//       top: 10%;
//       left: 2%;
//       text-align: center;
//     }
//     form{
//       position: relative;
//     }
//     .btn {
//       padding-top: 10px;
//       padding-bottom: 10px;
//       position: absolute;
//       top: 10%;
//       background-color: #C60C30;
//       border: none;
//       color: white;
//       left: 79%;
//       width:19%;
//       font-size: 17px;
//       text-align: center;
//     }
//   </style>

// 		<title>Phone Authentication with invisible ReCaptcha</title>
// 		  <script src="https://www.gstatic.com/firebasejs/5.8.6/firebase-app.js"></script>
//       <script src="https://www.gstatic.com/firebasejs/5.8.6/firebase-auth.js"></script>
//       <script src="https://www.gstatic.com/firebasejs/5.8.6/firebase-database.js"></script>
// 	    <script type="text/javascript">
//         var config = {
//           apiKey: "AIzaSyAbAQuVD0dj3a8QCjCUymxeFqyXx1kvpJg",
//           authDomain: "practice-82dce.firebaseapp.com",
//           databaseURL: "https://practice-82dce.firebaseio.com",
//           projectId: "practice-82dce",
//           storageBucket: "practice-82dce.appspot.com",
//           messagingSenderId: "997763906167"
//         };
//       	firebase.initializeApp(config);
// 		</script>
//   </head>

//   <body>
//     <div  class="input-bar-item width100">
//       <form id="sign-in-form" action="#">
//         <div  class="input-container">
//           <i class="material-icons" style="font-size:32px">stay_primary_portrait</i>
//           <input class="input-field" type="text"  id="phone-number" data-minlength="10" maxlength="10" placeholder="Enter your 10 digit phone number:">
//           <span class="input-group-btn">
//             <button onclick="signInClicked()" class="btn btn-info" id="sign-in-button">NEXT</button>
//           </span>
//         </div>
//       </form>
//     </div>
//   </body>

//   <script>

// 	    	window.onload = function() {
//           window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
//             'size': 'invisible',
//             'callback': function(response) {
//               isPhoneNumberInDatabase();
//             }
//           });

//           recaptchaVerifier.render();

//         }

//         function signInClicked() {
//           setTimeout(function(){
//             window.postMessage( JSON.stringify("signInClicked") ,'*');
//           }, 200);
//         }

//         function getPhoneNumberFromUserInput() {
//           return document.getElementById("phone-number").value;
//         }

//         function isPhoneNumberInDatabase() {
//           var phoneNumber = "91"+getPhoneNumberFromUserInput();
//           setTimeout(function(){
//             window.postMessage( JSON.stringify(phoneNumber) ,'*');
//           }, 500);
//           var ref = firebase.database().ref("app/User");
//           ref.orderByChild("Contact_Number")
//           .equalTo(phoneNumber)
//           .once("value", snapshot => {
//             if (snapshot.exists()) {
//               var phonenumber = "+91"+getPhoneNumberFromUserInput();
//               var appVerifier = window.recaptchaVerifier;
//               console.log(phonenumber);
//               console.log(appVerifier);
//               firebase.auth().signInWithPhoneNumber(phonenumber, appVerifier)
//               .then(function (confirmationResult) {
//                       setTimeout(function(){
//                         window.postMessage( JSON.stringify("spinner") ,'*');
//                       }, 500);
//                       window.confirmationResult = confirmationResult;
//                       var otpCode = prompt("Enter the code:");
//                       if (otpCode.length == 6){
//                         window.confirmationResult.confirm(otpCode).then(function (result) {
//                           setTimeout(function(){
//                             window.postMessage( JSON.stringify("signIn") ,'*');
//                           }, 500);
//                         }).catch(function (error) {
//                           setTimeout(function(){
//                             window.postMessage( JSON.stringify("innerError") ,'*')
//                           }, 500);
//                         });
//                       }
//                   }).catch(function (error) {
//                     setTimeout(function(){
//                       window.postMessage( JSON.stringify("outerError") ,'*')
//                     }, 500);
//                   });

//             } else {
//               var phoneNumber = "91"+getPhoneNumberFromUserInput();
//               var ref2 = firebase.database().ref("app/Joining_Requests");
//               ref2.orderByChild("Contact_Number")
//                 .equalTo(phoneNumber)
//                 .once("value", snapshot2 => {
//                   if (snapshot2.exists()) {
//                     setTimeout(function(){
//                       window.postMessage( JSON.stringify("sendToLogin") ,'*');
//                     }, 500);
//                   } else {
//                     var phoneNumber = "91"+getPhoneNumberFromUserInput();
//                     setTimeout(function(){
//                       window.postMessage( JSON.stringify("sendToRequest") ,'*');
//                     }, 500);
//                   }
//               });
//             }
//           });
//         }

//     </script>
//     <script src="https://www.google.com/recaptcha/api.js"></script>

// </html>`;
