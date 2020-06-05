import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {StyleSheet, Image, Button, Text, Platform} from 'react-native';

import Login from './app/components/auth/Login';
import SignUp from './app/components/auth/SignUp';
import Loading from './app/components/auth/Loading';
import DashboardStudent from './app/components/auth/DashboardStudent';
import DashboardTeacher from './app/components/auth/DashboardTeacher';

import * as firebase from 'firebase';

// signOutUser = () => {
//   firebase.auth().signOut();
// };

var firebaseConfig = {
  apiKey: 'AIzaSyCDrKzruv11vLOvmskzUnMU6HTWCXQ-hzs',
  authDomain: 'octek-93fcc.firebaseapp.com',
  databaseURL: 'https://octek-93fcc.firebaseio.com',
  projectId: 'octek-93fcc',
  storageBucket: 'octek-93fcc.appspot.com',
  messagingSenderId: '209412211474',
  appId: '1:209412211474:web:20097366d3db004c40a9cb',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const headerConf = {
  headerLayoutPreset: 'center',
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#50BE72',
    },
    headerRight: (
      <Button
        onPress={() => firebase.auth().signOut()}
        title="Logout"
        color="#4FBC70"
      />
    ),
    headerTintColor: 'white',
    headerTitle: 'Octek',
  },
};
const StudentStack = createStackNavigator(
  {
    DashboardStudent: DashboardStudent,
  },
  headerConf,
);
const TeacherStack = createStackNavigator(
  {
    DashboardTeacher: DashboardTeacher,
  },
  headerConf,
);
const DashboardStack = createStackNavigator(
  {
    DashboardStudent: DashboardStudent,
    DashboardTeacher: DashboardTeacher,
  },
  headerConf,
);

const AuthStack = createStackNavigator(
  {
    Login: Login,
    SignUp: SignUp,
  },
  {
    headerMode: 'none',
  },
);

export default createAppContainer(
  createSwitchNavigator(
    {
      Student: StudentStack,
      Teacher: TeacherStack,
      DashBoard: DashboardStack,
      Loading: Loading,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'Loading',
    },
  ),
);
