import React, { Component } from 'react'
import { View, Text,  Alert, Button, TextInput, TouchableOpacity } from 'react-native';
import ChatView from './ChatView';
export default class App extends Component{
  state = {
    username: '',
    password: '',
    auth_token: ''
  }
Signup = async () => {
    fetch('https://auth.absurdness87.hasura-app.io/v1/signup', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "provider": "username",
        "data": {
        "username": this.state.username,
        "password": this.state.password
        }
        })
    }).then((response) => response.json())
    .then((res) => {
      if(typeof(res.message) != "undefined"){
      Alert.alert("Error signing up", "Error: "+ res.message);
}
      else{
      this.setState({ auth_token: res.auth_token });
      Alert.alert("Success", "You have succesfully signed up");
      }
    }).catch((error) => {
    console.error(error);
    });
  }
  Login = async () => {
    fetch('https://auth.absurdness87.hasura-app.io/v1/login', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "provider": "username",
            "data": {
                "username": this.state.username,
                "password": this.state.password
            }
          })
        }).then((response) => response.json())
        .then((res) => {
      if(typeof(res.message) != "undefined"){
       Alert.alert("Error", "Error: "+ res.message);
      }
      else{
        this.setState({ auth_token: res.auth_token });
       
        }
     }).catch((error) => {
         console.error(error);
        });
  }
  render(){
  //If auth token is not present
   if(this.state.auth_token==''){
     return(
     <View>
     <TextInput
           placeholder="Enter User name"
           onChangeText={ TextInputValue =>
           this.setState({username : TextInputValue }) }
           underlineColorAndroid='transparent'
           style={
           {
               textAlign: 'center',
               width: '90%',
               marginBottom: 7,
               height: 40,
               borderRadius: 5 ,
               fontSize: 20,
           }
         }
         />
     <TextInput
           placeholder="Enter password"
           onChangeText={ TextInputValue =>
           this.setState({password: TextInputValue }) }
           underlineColorAndroid='transparent'
           secureTextEntry={true}
           style={
           {
               textAlign: 'center',
               width: '90%',
               marginBottom: 7,
               height: 40,
               borderRadius: 5 ,
               fontSize: 20,
           }
         }
         />
        <TouchableOpacity onPress={this.Signup.bind(this)}>
        <View style={{height: 50, backgroundColor:
        'purple',justifyContent: 'center',
        alignItems: 'center',}}>
          <Text style={{
          fontSize: 20,
          color: '#FFFFFF',
          }}> 
          Signup</Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.Login.bind(this)}>
        <View style={{height: 50, backgroundColor:
        'purple',justifyContent: 'center',
        alignItems: 'center',}}>
          <Text style={{
          fontSize: 20,
          color: '#FFFFFF',
          }}> 
          Login </Text>
        </View>
        </TouchableOpacity>
     </View>
        );
      }
/* Checking if the auth token is not empty directly sending the user to Home screen */
      else{
        return(
          <ChatView name={ this.state.username } />
        );
    }
}
}