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

export default class Login extends Component {
  state = {
    email: '',
    password: '',
    errorLabel: null,
  };

  // here by using signInWithEmailAndPassword we logining to app
  handleLogin = () => {
    const {email, password} = this.state;

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(error => this.setState({errorLabel: error.message}));
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
          <Form style={{marginTop: 20}}>
            <Item stackedLabel>
              <Label>Email</Label>
              <Input
                value={this.state.email}
                autoCapitalize={'none'}
                keyboardType={'email-address'}
                onChangeText={email => this.setState({email})}
              />
            </Item>
            <Item stackedLabel last>
              <Label>Password</Label>
              <Input
                value={this.state.password}
                onChangeText={password => this.setState({password})}
                secureTextEntry
              />
            </Item>
          </Form>
          <View style={styles.button}>
            <Button block success onPress={this.handleLogin}>
              <Text style={{color: 'white'}}>Sign In</Text>
            </Button>
          </View>
          <View style={styles.button}>
            <Button
              block
              light
              onPress={() => this.props.navigation.navigate('SignUp')}>
              <Text style={{color: '#707672'}}>Register Now</Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  button: {
    marginBottom: 10,
    marginTop: 10,
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
