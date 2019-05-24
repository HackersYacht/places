import React, { Component } from "react";
import { Container, Spinner } from "native-base";

import LoginScreen from "./screens/loginScreen";
import SignUpScreen from "./screens/signUpScreen";
import HomeScreen from "./screens/homeScreen";

import {
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator
} from "react-navigation";

//import firebase
import firebase from "react-native-firebase";

class IndexScreen extends Component {
  // will check whether someone is logged in or not
  constructor() {
    super();
    this.unsubscriber = null;
  }

  componentDidMount() {
    //we pass a callback to onAuthStateChanged
    //user is returned if logged in
    this.unsubscriber = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        //logged in, so we need to move to the homeScreen
        this.props.navigation.navigate("Home", {
          user
        });
        //we can pass the user object as param so that we can use on
        //the home screen
      } else {
        //not logged in
        this.props.navigation.navigate("Auth");
      }
    });
  }

  componentWillUnmount() {
    if (this.unsubscriber) {
      this.unsubscriber();
    }
  }

  render() {
    return (
      <Container>
        <Spinner color="blue" />
      </Container>
    );
  }
}

const AuthStack = createStackNavigator(
  {
    Login: LoginScreen,
    SignUp: SignUpScreen
  },
  {
    defaultNavigationOptions: {
      header: null
    }
  }
);

export default createAppContainer(
  createSwitchNavigator(
    {
      Index: IndexScreen,
      Home: HomeScreen,
      Auth: AuthStack
    },
    {
      defaultNavigationOptions: {
        header: null
      }
    }
  )
);
