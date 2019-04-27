import React, { Component } from "react";
// import { AutoGrowingTextInput } from "react-native-autogrow-textinput";
import { Icon } from "react-native-elements";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Button,
  Dimensions
} from "react-native";
import { TextInput } from "react-native-paper";
import firebase from "../../../Firebase";
import { ScrollView } from "react-native-gesture-handler";
const win = Dimensions.get("window");
import renderIf from "../../components/ViewFeed/renderIf";

export default class ReportProblem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidCatch() {}

  render() {
    var { navigation } = this.props;
    // var name=navigation.getParam("uid","no user found")
    var data = navigation.getParam("data", "noo data");
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
            <View>
              <Text style={styles.home}>{data.Name.toUpperCase()}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between"
              }}
            />
          </View>
          <ScrollView>

          <View>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                paddingBottom: 10
              }}
            >
              <Image
                style={styles.ImageContainer1}
                source={{
                  uri: data.Profile_photo
                }}
              />
            </View>
            <View
              style={{
                margin: 5,
                padding: 10,
                borderWidth: 1,
                borderColor: "#dddce2",
                borderRadius: 5,paddingBottom:50,
              }}
            >
              {renderIf(data.Fathers_Name != "")(
                <Text style={styles.Texts}>
                  Father's Name: {data.Fathers_Name}
                </Text>
              )}
              {renderIf(data.Mothers_Name != "")(
                <Text style={styles.Texts}>
                  Mother's Name: {data.Mothers_Name}
                </Text>
              )}
              {renderIf(data.DOB != "")(
                <Text style={styles.Texts}>Birth Date: {data.DOB}</Text>
              )}
              {renderIf(data.Birth_Time != "")(
                <Text style={styles.Texts}>Birth Time: {data.Birth_Time}</Text>
              )}
              {renderIf(data.Birth_Place != "")(
                <Text style={styles.Texts}>Birth Place:{data.Birth_Place}</Text>
              )}
              {renderIf(data.age != "")(
                <Text style={styles.Texts}>Age: {data.age}</Text>
              )}
            {renderIf(data.Contact_Number != "")(<Text style={styles.Texts}>Mobile Number: {data.Contact_Number}</Text>)}
            {renderIf(data.Gender != "")(<Text style={styles.Texts}>Gender: {data.Gender}</Text>)}

              {renderIf(data.Height != "")(
                <Text style={styles.Texts}>Height: {data.Height}</Text>
              )}
              {renderIf(data.Weight != "")(
                <Text style={styles.Texts}>Weight: {data.Weight}</Text>
              )}
              {renderIf(data.Highest_Qualification != "")(
                <Text style={styles.Texts}>
                  Qualification: {data.Highest_Qualification}
                </Text>
              )}
              {renderIf(data.Profession != "")(
                <Text style={styles.Texts}>Profession: {data.Profession}</Text>
              )}
              {renderIf(data.State != "")(
                <Text style={styles.Texts}>State: {data.State}</Text>
              )}
              {renderIf(data.City != "")(
                <Text style={styles.Texts}>City: {data.City}</Text>
              )}
              {renderIf(data.Salary != "")(
                <Text style={styles.Texts}>Salary: {data.Salary}</Text>
              )}
              {renderIf(data.Blood_Group != "")(
                <Text style={styles.Texts}>
                  Blood Group: {data.Blood_Group}
                </Text>
              )}
              {renderIf(data.Hobbies != "")(
                <Text style={styles.Texts}>Hobbies: {data.Hobbies}</Text>
              )}
            </View>
          </View>
          </ScrollView>
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
  Texts: {
    fontFamily: "lucida grande",
    fontSize: 16,
    color: "black",
    justifyContent: "center",
    padding: 5,
    alignSelf: "center",
    textAlign: "center"
  },
  ImageContainer1: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
    alignItems: "center",
    justifyContent: "center",
    width: win.width - 10,
    height: win.width / 1.5,
    backgroundColor: "#fff"
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
  },
  sendButton: {
    color: "white",
    paddingRight: 10,
    padding: 4,
    paddingLeft: 15,
    fontSize: 20,
    borderLeftWidth: 2,
    borderLeftColor: "white"
  }
});
