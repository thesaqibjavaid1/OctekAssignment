import React, {Component} from 'react';
import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import * as firebase from 'firebase';

class Loading extends Component {
  state = {
    data: [],
    type: '',
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      console.log('User Data', user);
      if (user) {
        //Here we wil feth user details to redirect the user by usinf their uid
        firebase
          .database()
          .ref('users/' + firebase.auth().currentUser.uid)
          .once('value')
          .then(snapshot => {
            this.setState({
              data: Object.values(snapshot.val()),
            });
            //console.log('userinfo', snapshot.val().type);
            //console.log('user', data.name);
            var getType = snapshot.val().type;
            //if type = 0 then it will go to student dashboard
            if (getType == 0) {
              this.props.navigation.navigate('Student');
              console.log('student');
            } else {
              this.props.navigation.navigate('Teacher');
              console.log('Teacher');
            }
          });

        // });
      } else {
        this.props.navigation.navigate('Auth');
        console.log('Login');
      }
    });
  }
  render() {
    return (
      <View style={styles.home}>
        <Text>Loading...</Text>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  home: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Loading;
