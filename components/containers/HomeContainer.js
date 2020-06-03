import React from "react";
import { ActivityIndicator } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import CalendarContainer from "../containers/CalendarContainer";
import TaskScreen from "../screens/TaskScreen";
import firebase from "../firebaseDb";

const Tab = createBottomTabNavigator();

export default class HomeContainer extends React.Component {
  state = {
    uid: "",
    username: "",
    isLoaded: false,
  };
  componentDidMount() {
    const user = firebase.auth().currentUser;
    firebase
      .firestore()
      .collection("users")
      .doc(user.uid)
      .get()
      .then((doc) =>
        this.setState({
          uid: user.uid,
          username: doc.data().username,
          isLoaded: true,
        })
      );
  }
  render() {
    return this.state.isLoaded ? (
      <Tab.Navigator initialRouteName="Calendar">
        <Tab.Screen
          name="Calendar"
          component={CalendarContainer}
          initialParams={{ uid: this.state.uid, username: this.state.username }}
        />
        <Tab.Screen
          name="Tasks"
          component={TaskScreen}
          initialParams={{ uid: this.state.uid, username: this.state.username }}
        />
      </Tab.Navigator>
    ) : (
      <ActivityIndicator />
    );
  }
}