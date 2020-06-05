import React, {Component} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
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
  List,
  ListItem,
  Card,
  CardItem,
} from 'native-base';
import * as firebase from 'firebase';
import {TouchableOpacity} from 'react-native-gesture-handler';

class DashboardStudent extends Component {
  state = {
    assignments: [],
    assignmentName: '',
    assignmentDescription: '',
  };
  componentDidMount() {
    //Here we are getting assignmnets from database to show the students
    const myItems = firebase.database().ref('assignment');
    myItems.on('value', datasnap => {
      this.setState({
        assignments: Object.values(datasnap.val()),
      });
      console.log(Object.values(datasnap.val()));
    });
  }

  render() {
    console.log(this.state);
    const myItems = this.state.assignments.map(item => {
      return (
        <ListItem style={{}} key={item.time}>
          <Card style={{flex: 1}}>
            <CardItem>
              <Text style={{fontSize: 17, fontWeight: 'bold'}}>
                {item.assignmentName}
              </Text>
              <Right>
                <Text>{new Date(item.time).toDateString()}</Text>
              </Right>
            </CardItem>
            <CardItem>
              <Left>
                <Text>{item.assignmentDescription}</Text>
              </Left>
            </CardItem>
          </Card>
        </ListItem>
      );
    });
    return <List>{myItems}</List>;
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});

export default DashboardStudent;
