import React, {Component} from 'react';
import {StyleSheet, Image, View, Text, Platform, Alert} from 'react-native';

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
  Textarea,
} from 'native-base';
import * as firebase from 'firebase';

export default class SignUp extends Component {
  state = {
    assignmentName: '',
    assignmentDescription: '',
    time: Date.now(),
    errorLabel: null,
  };

  // this methosd will upload assignment to firebase
  handleAssignment(assignmentName, assignmentDescription, time) {
    firebase
      .database()
      .ref('assignment')
      .push({
        assignmentName,
        assignmentDescription,
        time,
      })
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.log(error);
      });
    this.setState({
      assignmentName: '',
      assignmentDescription: '',
    });
    Alert.alert(
      'Assignment',
      'Assignment Uploaded Successfully',
      [{text: 'OK', onPress: () => console.log('OK Pressed')}],
      {cancelable: false},
    );
  }

  render() {
    return (
      <Container>
        <Content style={{marginLeft: 40, marginRight: 40, marginTop: 80}}>
          <View style={styles.name}>
            <Text style={styles.nameSell}>Add Assignment </Text>
          </View>
          <View style={styles.errorLabel}>
            {this.state.errorLabel && (
              <Text style={styles.errorContainer}>
                {' '}
                {this.state.errorLabel}{' '}
              </Text>
            )}
          </View>
          <Form style={{marginTop: 30}}>
            <Item stackedLabel>
              <Input
                clearButtonMode="always"
                placeholder="Assignment Name"
                onChangeText={assignmentName => this.setState({assignmentName})}
              />
            </Item>
            <Textarea
              style={{flex: 1, marginTop: 20}}
              rowSpan={5}
              placeholder="Please Enter Description"
              bordered
              onChangeText={assignmentDescription =>
                this.setState({assignmentDescription})
              }
            />
          </Form>
          <View style={styles.button}>
            <Button
              block
              success
              onPress={() =>
                this.handleAssignment(
                  this.state.assignmentName,
                  this.state.assignmentDescription,
                  this.state.time,
                )
              }>
              <Text style={{color: 'white'}}>ADD</Text>
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
    marginTop: 20,
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
