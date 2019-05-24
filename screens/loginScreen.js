import React, { Component } from "react";
import {
  Container,
  Content,
  Text,
  Form,
  Item,
  Input,
  Label,
  Button,
  Spinner
} from "native-base";

import firebase from "react-native-firebase";

export default class LoginScreen extends Component {
  state = {
    email: "",
    password: "",
    loading: false,
    message: ""
  };

  login() {
    const { email, password } = this.state;
    //we start the spinner and clear any old error message
    this.setState({ loading: true, message: "" });

    //call the singIn method from firebase and pass email and password
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        //once logged in, we want to move to the home screen
        //and pass the user credential
        this.props.navigation.navigate("Home", { user });
      })
      .catch(err => {
        //if failure, stop the spinner and show the error message
        this.setState({ loading: false, message: err.message });
      });
  }

  moveToSignUp() {
    //move to the signUpScreen
    this.props.navigation.navigate("SignUp");
  }

  render() {
    const { loading, message } = this.state;

    return (
      <Container>
        <Content
          contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 50 }}
        >
          {/*this will be the place to this the spinner and the error message*/}
          {loading ? <Spinner color="blue" /> : <Text>{message}</Text>}

          <Form>
            <Item floatingLabel>
              <Label>Email</Label>
              <Input onChangeText={email => this.setState({ email })} />
            </Item>
            <Item floatingLabel last>
              <Label>Password</Label>
              <Input
                onChangeText={password => this.setState({ password })}
                secureTextEntry
              />
            </Item>
          </Form>

          <Button
            block
            style={{ marginVertical: 20 }}
            onPress={() => this.login()}
          >
            <Text>Login</Text>
          </Button>

          <Text style={{ alignSelf: "center" }}>Or</Text>

          <Button
            block
            light
            style={{ marginVertical: 10 }}
            onPress={() => this.moveToSignUp()}
          >
            <Text>Create an account</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
