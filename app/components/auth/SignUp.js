import React, {Component} from 'react';
import {StyleSheet, Image, View, Text, Platform} from 'react-native';

import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Label,
  Left,
  Button,
  Body,
  Right,
  Title,
} from 'native-base';
import * as firebase from 'firebase';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';

var typeProps = [{label: 'Student', value: 0}, {label: 'Teacher', value: 1}];
export default class SignUp extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    type: 0,
    errorLabel: null,
  };

  handleRegister = () => {
    // by using createUserWithEmailAndPassword we are registering the user
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(res => {
        // here we are inserting extra info of user
        firebase
          .database()
          .ref('users/' + res.user.uid)
          .set({
            name: this.state.name,
            email: this.state.email,
            type: this.state.type,
          });
      });
  };

  render() {
    return (
      <Container>
        <Content style={{marginLeft: 40, marginRight: 40, marginTop: 80}}>
          <View style={styles.name}>
            <Text style={styles.nameSell}>Octek </Text>
            <Text style={styles.nameIt}>App</Text>
          </View>
          <View style={styles.errorLabel}>
            {this.state.errorLabel && (
              <Text style={styles.errorContainer}>
                {' '}
                {this.state.errorLabel}{' '}
              </Text>
            )}
          </View>
          <Form style={{marginTop: 40}}>
            <Item stackedLabel>
              <Label>Full Name</Label>
              <Input
                value={this.state.name}
                onChangeText={name => this.setState({name})}
              />
            </Item>
            <Item stackedLabel>
              <Label>Email</Label>
              <Input
                value={this.state.email}
                autoCapitalize={'none'}
                keyboardType={'email-address'}
                onChangeText={email => this.setState({email})}
              />
            </Item>
            <Item stackedLabel>
              <Label>Password</Label>
              <Input
                value={this.state.password}
                onChangeText={password => this.setState({password})}
                secureTextEntry
              />
            </Item>
            <View style={{margin: 20}}>
              <RadioForm
                radio_props={typeProps}
                initial={0}
                buttonSize={12}
                formHorizontal={true}
                animation={true}
                labelHorizontal={true}
                buttonColor={'#2196f3'}
                onPress={value => {
                  this.setState({type: value});
                }}
              />
            </View>
          </Form>
          <View style={styles.button}>
            <Button block success onPress={this.handleRegister}>
              <Text style={{color: 'white'}}>Register Now</Text>
            </Button>
          </View>
          <View style={styles.button}>
            <Button
              block
              light
              onPress={() => this.props.navigation.navigate('Login')}>
              <Text style={{color: '#707672'}}>Login</Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  button: {
    ...Platform.select({
      ios: {
        marginBottom: 0,
      },
      android: {
        marginBottom: 10,
        marginTop: 10,
      },
    }),
  },
  name: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  nameSell: {
    fontSize: 30,
    color: '#8B948E',
  },
  nameIt: {
    fontSize: 30,
    color: '#50BE72',
  },
  errorContainer: {
    color: '#E9446A',
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },
  errorLabel: {
    marginTop: 20,
    height: 32,
    color: '#fff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});
