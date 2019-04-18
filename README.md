# kommunity
Community Social Network is a easy to use mobile App for both android and IOS users.
This app will be a handy solution to connect with people of your community (samaj).
This app works as an online community (samaj) diary that helps you know all the details of members and connect with them.

# File structure 

    - android
    - ios
    - src
        - assets
        - components
        - navigator
        - screens
    - Firebase.js
    - keys.js

# Config files

Make keys.js file in the same place as shown in file structure.
It should look like
```
module.exports = {
    REACT_APP_OTP_API_KEY: "xxxxxxxx",
    REACT_APP_OTP_SECRET_KEY: "xxxxxxxxxxxxxxxx"
   };
   
   ```
   For OTP we have used nexmo sms sevice.
   
   Register on it, select sms service  and copy paste secret key and key in place of xxxxxxxx
   Nexmo guide: https://dashboard.nexmo.com/sign-in?redirect=#/sms
   
   Make Firebase.js config file .
   ```
import firebase from "@firebase/app";
import "@firebase/storage";
import "@firebase/auth";
import "@firebase/database";

var config = {
  apiKey: "xxxxxxxxxxxxx",
  authDomain: "xxxxxxxxxxxxxxxxx",
  databaseURL: "xxxxxxxxxxxxxxxxxxxxxxxx",
  projectId: "xxxxxxxxxxxxxxxxxxxxx",
  storageBucket: "xxxxxxxxxxxxxxxx",
  messagingSenderId: "xxxxxxxxx"
};  
firebase.initializeApp(config);
export default firebase;

```

Firebase guide :https://console.firebase.google.com


# Setup

Step 1: Clone the repository using https://github.com/dataoneio/kommunity.git

Step 2: run the command 
```
npm install
react-native link
react-native start
```
Step 3: 
for android device 
```
react-native run-android
```
for IOS device
```
react-native run-ios
```









